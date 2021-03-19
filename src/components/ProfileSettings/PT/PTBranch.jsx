/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  const dispatch = useDispatch();

  const { data, allList, isLoading } = useSelector(
    (state) => state?.profileSettings?.ptBranchList
  );

  const [showAddBranch, setShowAddBranch] = useState(false);
  const [open, setOpen] = useState(false);
  const [branchSuggest, setBranchSuggest] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState([]);

  useEffect(() => {
    dispatch(getAllPTBranchList());
    dispatch(getUserPTBranchList());
  }, []);

  const selectActivityHandler = (key) => {
    if (selectedBranch.includes(key)) {
      setSelectedBranch(selectedBranch.filter((item) => item !== key));
    } else {
      setSelectedBranch((selecteds) => [...selecteds, key]);
    }
  };

  // Removed seleted branch from branch list for show user only able to add branch list
  const filteredBranchList = allList?.filter(
    (branch) =>
      !Object.entries(data?.branches).find(([key, obj]) => obj.id === branch.id)
  );

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

  return isLoading ? (
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
        Branşlarım & Ücretlerim
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
            Hizmet verdiğiniz faaliyet alanlarını ve ücretlerini belirleyin.{' '}
          </Title>
          {!showAddBranch && (
            <Title
              className="mb-2"
              fontSize="16px"
              letterSpacing="0.03em"
              fontWeight="400"
              textAlign="left"
            >
              Yeni Branş Ekle{' '}
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
                    label="Diğer Branş Talepleriniz"
                    type="text"
                    onChange={(event) => setBranchSuggest(event.target.value)}
                  />
                </div>
                <div className="d-flex w-100">
                  <Button
                    className="blue ml-auto"
                    text="Kaydet"
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
                Diğer Branşlar
              </Title>
              <Title
                fontWeight="600"
                textAlign="left"
                fontSize="11px"
                color="#404041"
              >
                Talepte bulunduğun diğer branşlar aktif olduğunda tarafına bilgi
                vereceğiz
              </Title>
              <div className="w-25">
                <Material.TextField
                  id="branch"
                  name="branch"
                  label="Diğer Branş Talepleriniz"
                  type="text"
                  changeValue={data?.suggested}
                  inputProps={{
                    readOnly: true,
                  }}
                />
              </div>
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
            Merhaba Sevgili Üyemiz{' '}
          </Text>

          <Text textAlign="center" fontSize="1rem" color="dark">
            Seçmiş Olduğun faaliyet alanı tarafımızca incelendikten sonra bilgi
            vereceğiz.
            <span> Bildirimleri açmayı unutma :)</span>
          </Text>
        </Container>

        <div className="modal-footer" closeIcon={false}>
          <StyledLink
            onClick={() => {
              setOpen(false);
              setShowAddBranch(false);
              setSelectedBranch([]);
            }}
          >
            Devam Et
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
