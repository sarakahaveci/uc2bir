/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { device } from 'utils';
import { useTranslation } from 'react-i18next';

import {
  getAllPTBranchList,
  getUserPTBranchList,
  addNewPTBranch,
} from 'actions';
import { Title, Button, ActivityCard, Svg, Text, Material } from 'components';
import SelectiveButton from 'components/buttons/SelectiveButton';
import ArrowLeftIcon from 'components/statics/svg/images/arrow-left.svg';
import ActivityImage from 'assets/activityPicture.png';
import BluePlusIcon from 'assets/blue-plus.svg';

export default function WorkPlaceActivity() {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { data, allList } = useSelector(
    (state) => state?.profileSettings?.ptBranchList
  );

  const [loading, setloading] = useState(true);
  const [showAddBranch, setShowAddBranch] = useState(false);
  const [open, setOpen] = useState(false);
  const [branchSuggest, setBranchSuggest] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState([]);
  const [filteredBranchList, setFilteredBranchList] = useState([]);

  useLayoutEffect(() => {
    dispatch(getAllPTBranchList());
    dispatch(getUserPTBranchList());
  }, []);

  useEffect(() => {
    if (!isEmpty(data) && allList.length > 0) {
      const newlist = allList?.filter(
        (branch) =>
          !Object.entries(data?.branches).find(
            ([key, obj]) => obj.id === branch.id
          )
      );
      setloading(false);
      setFilteredBranchList(newlist);
    }
  }, [allList, data]);

  const selectActivityHandler = (key) => {
    if (selectedBranch.includes(key)) {
      setSelectedBranch(selectedBranch?.filter((item) => item !== key));
    } else {
      setSelectedBranch((selecteds) => [...selecteds, key]);
    }
  };

  // Removed seleted branch from branch list for show user only able to add branch list

  const submitNewActivity = () => {
    dispatch(
      addNewPTBranch(
        { branch: selectedBranch, branch_suggest: branchSuggest },
        () => {
          dispatch(getUserPTBranchList());
          setOpen(true);
        },
        (error) => {
          toast.error(error, {
            position: 'bottom-left',
            autoClose: 2000,
          });
        }
      )
    );
  };

  const newActivityAreaClass = showAddBranch ? 'col-md-8' : 'col-md-12';

  return loading ? (
    <></>
  ) : (
    <div className="p-3">
      <Title fontSize="24px" fontWeight="600" textAlign="left">
        {showAddBranch && (
          <img
            className="cp"
            src={ArrowLeftIcon}
            alt=""
            onClick={() => setShowAddBranch(false)}
          />
        )}{' '}
        {t('My Branches & Fees')}
      </Title>
      <div className="row d-flex w-100">
        {showAddBranch && (
          <div className="col-lg-4 col-md-12 col-sm-12">
            <img src={ActivityImage} alt="" />
          </div>
        )}

        <div className={`${newActivityAreaClass} col-sm-12`}>
          <Title
            className="mb-3"
            fontSize="13px"
            letterSpacing="0.03em"
            fontWeight="500"
            textAlign="left"
          >
            {t('Determine the areas of activity you serve and their fees')}
          </Title>
          {!showAddBranch && (
            <Title
              className="mb-2"
              fontSize="16px"
              letterSpacing="0.03em"
              fontWeight="400"
              textAlign="left"
            >
              {t('Add New Branch')}
              <img
                className="cp"
                src={BluePlusIcon}
                alt=""
                onClick={() => setShowAddBranch(true)}
              />
            </Title>
          )}
          <div className={`w-100 ${!showAddBranch ? 'card-wrapper' : ''}`}>
            {!showAddBranch ? (
              Object.entries(data?.branches).map(([key, branch]) => (
                <ActivityCard
                  key={branch.id}
                  branch_id={branch.id}
                  isAccepted={branch?.status_id === 2}
                  classification={branch?.classification}
                  price={branch?.price}
                  name={branch?.name}
                  statusId={branch?.status_id}
                  waitingPrice={branch?.waiting_approval_price}
                  maxPrice={branch?.max_request_price}
                  minPrice={branch?.min_request_price}
                />
              ))
            ) : (
              <>
                {filteredBranchList?.map((branch) => (
                  <SelectiveButton
                    key={branch.id}
                    id={branch.id}
                    name={branch.name}
                    selectButtonHandler={selectActivityHandler}
                    isActive={selectedBranch.includes(branch.id)}
                  />
                ))}
                <div className="w-25">
                  <Material.TextField
                    id="branch"
                    name="branch"
                    label={t('Other Branch Requests')}
                    type="text"
                    onChange={(event) => setBranchSuggest(event.target.value)}
                  />
                </div>
                <div className="d-flex w-100">
                  <Button
                    className="blue ml-auto"
                    text={t('save')}
                    disabled={
                      selectedBranch.length === 0 && branchSuggest.length < 1
                    }
                    fontWeight="500"
                    onClick={submitNewActivity}
                  />
                </div>
              </>
            )}
          </div>
          {!showAddBranch && (
            <>
              <Title
                className="mb-3"
                fontSize="13px"
                letterSpacing="0.03em"
                fontWeight="500"
                textAlign="left"
              >
                {t('Other Branches')}
              </Title>
              <Title
                fontWeight="600"
                textAlign="left"
                fontSize="11px"
                color="black3"
              >
                {t(
                  'We will inform you when the other branches you request are active'
                )}
              </Title>
              <ResponsiveDiv>
                <Material.TextField
                  id="branch"
                  name="branch"
                  label={t('Other Branch Requests')}
                  type="text"
                  changeValue={data?.suggested}
                  inputProps={{
                    readOnly: true,
                  }}
                />
              </ResponsiveDiv>
            </>
          )}
        </div>
      </div>
      <Modal show={open} onHide={() => setOpen(false)} backdrop="static">
        <Container>
          <Svg.SuccessIcon />

          <Text
            variant="h2"
            fontSize="1.2rem"
            color="dark"
            fontWeight="500"
            textAlign="center"
          >
            {t('Hello Dear Member')}
          </Text>

          <Text textAlign="center" fontSize="1rem" color="dark">
            {t(
              'After the field of activity you have chosen is reviewed by us, you can enter your quota and area rental cost'
            )}

            <span>{t('Dont forget to turn on notifications')} :)</span>
          </Text>
        </Container>

        <div className="modal-footer"  >
          <StyledLink
            onClick={() => {
              setOpen(false);
              setShowAddBranch(false);
              setSelectedBranch([]);
            }}
          >
            {t('continue')}
          </StyledLink>
        </div>
      </Modal>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 110px 30px;

  svg {
    margin-bottom: 15px;
  }
`;

const StyledLink = styled(Link)`
  font-size: 1.2rem;
  color: var(--blue);
  text-align: center;
  display: block;
  width: 100%;

  &:hover {
    color: var(--blue);
  }
`;

const ResponsiveDiv = styled.div`
  width: 25%;
  @media ${device.sm} {
    width: 100%;
  }
`;
