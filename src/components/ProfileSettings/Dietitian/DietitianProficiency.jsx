import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Title, Button, Svg, Text } from 'components';
import {
  getDietitianProficiency,
  getAllProficiency,
  addNewDietitianProficiency,
} from 'actions';
import SelectiveButton from 'components/buttons/SelectiveButton';
import ArrowLeftIcon from 'components/statics/svg/images/arrow-left.svg';
import SubTabs from 'components/SubTabs/SubTabs';
import ProficiencyCard from 'components/ProficiencyCard/ProficiencyCard';
import ProficiencyIcon from 'assets/proficiency.png';
import BluePlusIcon from 'assets/blue-plus.svg';

export default function DietitianProficiency() {
  const { t } = useTranslation();

  const subTabData = [
    {
      label: t('all'),
      value: 1,
    },
    {
      label: t('APPROVALS'),
      value: 2,
    },
    {
      label: t('APPROVED'),
      value: 3,
    },
  ];

  const dispatch = useDispatch();

  const { allProficiencyList, userProficiencyList, subProficiencyList } =
    useSelector(
      (state) => state?.profileSettings2?.dietitianProficiency?.proficiency
    );

  const [showAddProficiency, setShowAddProficiency] = useState(false);
  const [showSubProficiency, setShowSubProficiency] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProficiency, setSelectedProficiency] = useState();
  const [selectedSubProficiency, setSelectedSubPro] = useState([]);
  const [modifiedUserProficiencyList, setModifiedUserProficiencyList] =
    useState(null);

  useEffect(() => {
    setModifiedUserProficiencyList(userProficiencyList);
  }, [userProficiencyList]);

  useEffect(() => {
    dispatch(getDietitianProficiency());
    dispatch(
      getAllProficiency(
        { parrenId: 0 },
        false,
        () => {},
        (error) => {
          toast.error(error, {
            position: 'bottom-right',
            autoClose: 4000,
          });
        }
      )
    );
  }, []);

  const selectProficiencyHandler = (key) => {
    if (key === selectedProficiency) {
      setSelectedProficiency();
    } else {
      setSelectedProficiency(key);
    }
  };

  const selectSubProHandler = (key) => {
    if (selectedSubProficiency.includes(key)) {
      setSelectedSubPro(selectedSubProficiency?.filter((item) => item !== key));
    } else {
      setSelectedSubPro((selecteds) => [...selecteds, key]);
    }
  };

  const getSubProficiency = () => {
    setShowAddProficiency(false);
    dispatch(
      getAllProficiency(
        { parrenId: selectedProficiency },
        true,
        () => setShowSubProficiency(true),
        (error) => {
          toast.error(error, {
            position: 'bottom-right',
            autoClose: 4000,
          });
        }
      )
    );
  };

  const addNewProficiency = () => {
    dispatch(
      addNewDietitianProficiency(
        {
          branch_id: selectedProficiency,
          specialities: selectedSubProficiency,
        },
        () => setOpen(true),
        () => {
          toast.error(
            t(
              'An error was encountered while adding a new specialization, please try again later'
            ),
            {
              position: 'bottom-right',
              autoClose: 4000,
            }
          );
        }
      )
    );
  };

  const filterProficiencyListHandler = (key) => {
    let newList;
    switch (key) {
      case 1:
        setModifiedUserProficiencyList(userProficiencyList);
        break;
      case 2:
        newList = userProficiencyList?.filter((proficiency) =>
          proficiency.speciality.some(
            (speciality) => speciality.status === 'pending'
          )
        );
        setModifiedUserProficiencyList(newList);
        break;
      case 3:
        newList = userProficiencyList?.filter((proficiency) =>
          proficiency.speciality.every(
            (speciality) => speciality.status === 'active'
          )
        );
        setModifiedUserProficiencyList(newList);
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-3">
      <Title fontSize="24px" fontWeight="600" textAlign="left">
        {(showSubProficiency || showAddProficiency) && (
          <img
            className="cp"
            src={ArrowLeftIcon}
            alt=""
            onClick={() => {
              if (showAddProficiency) setShowAddProficiency(false);
              else {
                setShowSubProficiency(false);
                setShowAddProficiency(true);
              }
            }}
          />
        )}
        {t('my specialties')}
      </Title>
      <div className="row d-flex w-100">
        <div className="col-lg-4 col-md-12 col-sm-12">
          <img className="w-100" src={ProficiencyIcon} alt="" />
        </div>

        <div className={`col-md-8 col-sm-12`}>
          <Title
            className="mb-3"
            fontSize="13px"
            letterSpacing="0.03em"
            fontWeight="500"
            textAlign="left"
          >
            {t('Specify your specializations and areas of expertise')}
          </Title>
          {!(showSubProficiency || showAddProficiency) && (
            <>
              <Title
                className="mb-2"
                fontSize="16px"
                letterSpacing="0.03em"
                fontWeight="400"
                textAlign="left"
              >
                {t('Add New Specialization')}
                <img
                  className="cp"
                  src={BluePlusIcon}
                  alt=""
                  width="100%"
                  onClick={() => setShowAddProficiency(true)}
                />
              </Title>
              <SubTabs
                className="mt-3"
                data={subTabData}
                lineWidth="100%"
                onChange={(item) => filterProficiencyListHandler(item.value)}
              />
              <div className="dietitianProficiency__wrapper">
                {modifiedUserProficiencyList?.length > 0 ? (
                  modifiedUserProficiencyList?.map((proficiencyValue) => (
                    <ProficiencyCard
                      key={proficiencyValue?.name}
                      title={proficiencyValue?.name}
                      data={proficiencyValue?.speciality}
                    />
                  ))
                ) : (
                  <Title
                    className="mb-2"
                    fontSize="14px"
                    letterSpacing="0.03em"
                    fontWeight="400"
                    textAlign="left"
                  >
                    {t('No specializations were found suitable for the search')}
                  </Title>
                )}
              </div>
            </>
          )}
          {showAddProficiency && (
            <div
              className={`w-100 ${!showAddProficiency ? 'card-wrapper' : ''}`}
            >
              {allProficiencyList?.map((branch) => (
                <SelectiveButton
                  key={branch.id}
                  id={branch.id}
                  name={branch.name}
                  selectButtonHandler={selectProficiencyHandler}
                  isActive={selectedProficiency === branch.id}
                />
              ))}
            </div>
          )}
          {showSubProficiency && (
            <div
              className={`w-100 ${!showSubProficiency ? 'card-wrapper' : ''}`}
            >
              {subProficiencyList.length > 0 ? (
                subProficiencyList?.map((subPro) => (
                  <SelectiveButton
                    key={subPro.id}
                    id={subPro.id}
                    name={subPro.name}
                    selectButtonHandler={selectSubProHandler}
                    isActive={selectedSubProficiency.includes(subPro.id)}
                  />
                ))
              ) : (
                <div>
                  {t(' There are no sub-branches for this specialization')}
                </div>
              )}
            </div>
          )}
        </div>
        {(showSubProficiency || showAddProficiency) && (
          <div className="d-flex w-100">
            <Button
              className="blue ml-auto"
              text={showSubProficiency ? t('save') : t('Forward')}
              disabled={
                showSubProficiency
                  ? selectedSubProficiency.length === 0
                  : !selectedProficiency
              }
              fontWeight="500"
              onClick={
                showSubProficiency ? addNewProficiency : getSubProficiency
              }
            />
          </div>
        )}
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
              'We will inform you after the session fee you have entered is reviewed by us'
            )}

            <span>{t('Dont forget to turn on notifications')} :)</span>
          </Text>
        </Container>

        <div className="modal-footer" closeIcon={false}>
          <StyledLink
            onClick={() => {
              setOpen(false);
              setShowSubProficiency(false);
              setShowAddProficiency(false);
              dispatch(getDietitianProficiency());
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
