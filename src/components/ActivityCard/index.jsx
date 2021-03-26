/* eslint-disable no-console */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Tooltip, MenuItem, Input, Select } from '@material-ui/core';
import styled from 'styled-components/macro';
import { withStyles } from '@material-ui/core/styles';

import { Material, Button, Title, Svg } from 'components';
import { sportTypeIconGenerator } from 'utils';
import { updateWorkPlaceActivity, updatePTBranch } from 'actions';

export default function ActivityCard({
  isAccepted,
  name,
  isWorkPlace,
  capacity,
  price,
  id,
  branch,
  classification,
  branch_id,
  statusId,
  waitingPrice,
  status,
  maxPrice,
  minPrice,
}) {
  const dispatch = useDispatch();
  const { data: registerData } = useSelector((state) => state.registerData);
  const { subBranches } = useSelector(
    (state) => state?.profileSettings?.activityList
  );

  const tooltipLabel = isAccepted ? (
    maxPrice || minPrice ? (
      <ToolTipLabel>
        {classification} sınıfı {name} branşı için{' '}
        <div style={{ color: '#00b2a9' }}>
          minimum {minPrice} TL ,maksimum {maxPrice} TL{' '}
        </div>
        aralığında fiyat girebilirisiniz.`
      </ToolTipLabel>
    ) : (
      <ToolTipLabel>
        {name} branşı için Fiyatlandırma yapılmamıştır.
      </ToolTipLabel>
    )
  ) : (
    <ToolTipLabel>
      Seçtiğin branş için sınıfın taramızca belirlendikten sonra sana bilgi
      vereceğiz.
    </ToolTipLabel>
  );

  const cardClass = isAccepted
    ? 'facility-card-wrapper'
    : 'facility-card-wrapper not-accepted-card';

  const statusTextClass = isAccepted ? 'accepted-text' : 'waiting-accept-text';

  let statusText;

  switch (status) {
    case 'pending':
      statusText = 'Onay Bekliyor';
      break;
    case 'active':
      statusText = 'Onaylandı';
      break;
    case 'passive':
      statusText = 'Reddedildi';
      break;

    default:
      break;
  }

  const PTstatusText = registerData?.['global-status']?.find(
    (globalStatus) => globalStatus.id === statusId
  );

  const [formData, setFormData] = useState({
    id: id,
    capacity: capacity,
    price: price,
  });

  const [branchData, setBranchData] = useState({
    price: price,
    branch_id: branch_id,
  });

  const [selectedBranch, setSelectedBranch] = useState(branch ?? []);

  const handleFormOnChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleBranchFormOnChange = (event) => {
    setBranchData({ ...branchData, [event.target.name]: +event.target.value });
  };

  const handleBranchSet = (event) => {
    setSelectedBranch(event.target.value);
  };

  const submitChange = () => {
    if (isWorkPlace) {
      dispatch(
        updateWorkPlaceActivity(
          {
            capacity: formData.capacity,
            price: formData.price,
            id: formData.id,
            branch: selectedBranch,
          },
          () => {
            toast.success(
              'Talebiniz gönderildi incelendikten sonra tarafınıza bildirim gönderilecektir.',
              {
                position: 'bottom-right',
                autoClose: 7000,
              }
            );
          },
          (error) => {
            toast.error(error, {
              position: 'bottom-right',
              autoClose: 7000,
            });
          }
        )
      );
    } else {
      dispatch(
        updatePTBranch(
          branchData,
          () => {
            toast.success(
              'Talebiniz gönderildi incelendikten sonra tarafınıza bildirim gönderilecektir.',
              {
                position: 'bottom-right',
                autoClose: 7000,
              }
            );
          },
          (error) => {
            toast.error(error, {
              position: 'bottom-right',
              autoClose: 7000,
            });
          }
        )
      );
    }
  };

  return (
    <div className={`d-flex mb-3 mr-2 p-4 flex-column  ${cardClass}`}>
      <div className="mb-2">
        <div className="d-flex justify-content-between">
          {isWorkPlace
            ? sportTypeIconGenerator(id)
            : sportTypeIconGenerator(name)}
          <span className={`ml-auto ${statusTextClass}`}>
            {isWorkPlace ? statusText : PTstatusText?.name}
          </span>
        </div>
        <Title
          fontWeight="600"
          textAlign="left"
          letterSpacing="0.2em"
          fontSize="13px"
          color="#404041"
        >
          {name}
        </Title>
      </div>
      <div>
        {isWorkPlace ? (
          <>
            <Select
              placeholder="Aktivite Branşları"
              multiple
              value={selectedBranch}
              input={<Input />}
              onChange={handleBranchSet}
              style={{ maxWidth: '100%', width: '100%' }}
              required
              readOnly={!isAccepted}
            >
              {subBranches.map((branch) => (
                <MenuItem key={branch.id} value={branch.id}>
                  {branch.name}
                </MenuItem>
              ))}
            </Select>
            <Material.TextField
              label="Kontenjan"
              type="number"
              name="capacity"
              onChange={handleFormOnChange}
              changeValue={capacity}
              inputProps={{
                readOnly: !isAccepted,
              }}
            />
            <Material.TextField
              label="Alan Kiralama Bedeli (TL)"
              type="number"
              name="price"
              onChange={handleFormOnChange}
              changeValue={price}
              inputProps={{
                readOnly: !isAccepted,
              }}
            />
          </>
        ) : (
          <>
            <Material.TextField
              label="KLASİFİKASYON"
              type="text"
              name="class"
              changeValue={classification}
              inputProps={{
                readOnly: true,
              }}
            />
            <HtmlTooltip title={tooltipLabel}>
              <PriceLabel>
                ÜCRET <Svg.InfoIcon className="ml-1" />
              </PriceLabel>
            </HtmlTooltip>
            <Material.TextField
              type="number"
              name="price"
              changeValue={price}
              onChange={handleBranchFormOnChange}
              inputProps={{
                readOnly: !isAccepted || waitingPrice,
              }}
            />

            <div style={{ height: 30 }}>
              {waitingPrice && (
                <Title
                  fontWeight="400"
                  textAlign="left"
                  fontSize="11px"
                  color="#404041"
                >
                  Onay Bekleyen {waitingPrice} Tl&apos;lik talebiniz
                  bulunmaktadır
                </Title>
              )}
            </div>
          </>
        )}
      </div>
      <Button
        className="blue mt-3"
        text="Kaydet"
        fontWeight="500"
        onClick={submitChange}
        disabled={!isAccepted || waitingPrice}
      />
    </div>
  );
}

const PriceLabel = styled.div`
  display: inline-flex;
  font-weight: 400 !important;
  font-size: 11px !important;
  color: #4040419e;

  svg  {
    margin-bottom: 2px;
    fill: green;
  }
`;

const ToolTipLabel = styled.div`
  color: '#181818';
  padding: '10px';
  font-weight: 400;
`;

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#fff',
    color: '#181818',
    fontSize: theme.typography.pxToRem(13),
    border: '1px solid #dadde9',
  },
}))(Tooltip);
