import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const subTabData = [
  {
    label: 'Tümü',
    value: 1,
  },
  {
    label: 'ONAYDAKİLER',
    value: 2,
  },
  {
    label: 'ONAYLANANLAR',
    value: 3,
  },
];

export default function DietitianProficiency() {
  const dispatch = useDispatch();

  const {
    allProficiencyList,
    userProficiencyList,
    subProficiencyList,
  } = useSelector(
    (state) => state?.profileSettings2?.dietitianProficiency?.proficiency
  );

  const [showAddProficiency, setShowAddProficiency] = useState(false);
  const [showSubProficiency, setShowSubProficiency] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProficiency, setSelectedProficiency] = useState();
  const [selectedSubProficiency, setSelectedSubPro] = useState([]);
  const [
    modifiedUserProficiencyList,
    setModifiedUserProficiencyList,
  ] = useState(null);

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
      setSelectedSubPro(selectedSubProficiency.filter((item) => item !== key));
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
            'Yeni uzmanlık eklenirken bir hata ile karşılaşıldı daha sonra tekrar deneyiniz.',
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
        newList = userProficiencyList.filter((proficiency) =>
          proficiency.speciality.some(
            (speciality) => speciality.status === 'pending'
          )
        );
        setModifiedUserProficiencyList(newList);
        break;
      case 3:
        newList = userProficiencyList.filter((proficiency) =>
          proficiency.speciality.every(
            (speciality) => speciality.status === 'success'
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
        Uzmanlıklarım
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
            Uzmanlıklarınızı ve uzmanlık konularınızı belirtiniz.{' '}
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
                Yeni Uzmanlık Ekle{' '}
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
                    Aramaya uygun bir uzmanlık bulunamadı.
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
                <div> Bu uzmanlık için alt dal bulunmamaktadır</div>
              )}
            </div>
          )}
        </div>
        {(showSubProficiency || showAddProficiency) && (
          <div className="d-flex w-100">
            <Button
              className="blue ml-auto"
              text={showSubProficiency ? 'Kaydet' : 'İlerle'}
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
            Merhaba Sevgili Üyemiz{' '}
          </Text>

          <Text textAlign="center" fontSize="1rem" color="dark">
            Seçmiş Olduğun uzmanlıklar tarafımızca incelendikten sonra bilgi
            vereceğiz.
            <span> Bildirimleri açmayı unutma :)</span>
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
