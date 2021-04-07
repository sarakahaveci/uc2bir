import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  getWorkPlaceActivityList,
  getAllActivityList,
  addWorkPlaceActivity,
  getWorkPlaceActivityBranches,
  updateGymSpecialPrice,
} from 'actions';
import { Title, Button, ActivityCard, Svg, Text, Material } from 'components';
import SelectiveButton from 'components/buttons/SelectiveButton';
import ArrowLeftIcon from 'components/statics/svg/images/arrow-left.svg';
import ActivityImage from 'assets/activityPicture.png';
import BluePlusIcon from 'assets/blue-plus.svg';

export default function WorkPlaceActivity() {
  const dispatch = useDispatch();

  const { data, allList, isLoading } = useSelector(
    (state) => state?.profileSettings?.activityList
  );

  const [showAddActivity, setShowAddActivity] = useState(false);
  const [open, setOpen] = useState(false);
  const [specialPrice, setSpecialPrice] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState([]);

  const handleFormOnChange = (event) => {
    setSpecialPrice(event.target.value);
  };

  const getActivityList = () => {
    dispatch(getWorkPlaceActivityList());
    dispatch(getAllActivityList());
  };

  useEffect(() => {
    dispatch(getWorkPlaceActivityBranches());
    getActivityList();
  }, []);

  const selectActivityHandler = (key) => {
    if (selectedActivity.includes(key)) {
      setSelectedActivity(selectedActivity.filter((item) => item !== key));
    } else {
      setSelectedActivity((selecteds) => [...selecteds, key]);
    }
  };

  const submitSpicialPrice = () => {
    dispatch(updateGymSpecialPrice({ price: specialPrice }));
  };

  const submitNewActivity = () => {
    dispatch(
      addWorkPlaceActivity(
        { activityIds: selectedActivity },
        () => {
          setOpen(true);
          setShowAddActivity(false);
          setSelectedActivity([]);
          getActivityList();
        },
        (error) => {
          toast.error('.', {
            position: error,
            autoClose: 2000,
          });
        }
      )
    );
  };

  const newActivityAreaClass = showAddActivity ? 'col-md-8' : 'col-md-12';

  return isLoading ? (
    <></>
  ) : (
    <div className="p-3">
      <div
        className={`d-flex mb-3 mr-2 p-4 flex-column  facility-card-wrapper`}
      >
        <div className="mb-2">
          <Title
            fontWeight="600"
            textAlign="left"
            letterSpacing="0.2em"
            fontSize="13px"
            color="black3"
          >
            Özel Ders Seans Ücreti
          </Title>
        </div>
        <div>
          <Material.TextField
            label="Tüm branşlar için özel ders seans (TL)"
            type="number"
            name="price"
            onChange={handleFormOnChange}
            changeValue={data?.session_price}
          />

          {data?.waiting_approval_session_price && (
            <Title
              fontWeight="400"
              textAlign="left"
              fontSize="11px"
              color="black3"
            >
              Onay Bekleyen {data?.waiting_approval_session_price} Tl&apos;lik
              talebiniz bulunmaktadır
            </Title>
          )}
        </div>
        <Button
          className="blue mt-3"
          text="Kaydet"
          fontWeight="500"
          onClick={submitSpicialPrice}
        />
      </div>
      <Title fontSize="24px" fontWeight="600" textAlign="left">
        {showAddActivity && (
          <img
            className="cp"
            src={ArrowLeftIcon}
            alt=""
            onClick={() => setShowAddActivity(false)}
          />
        )}{' '}
        İş Yeri Faaliyet Alanları
      </Title>
      <div className="row d-flex w-100">
        {showAddActivity && (
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

          {!showAddActivity && (
            <Title
              className="mb-2"
              fontSize="16px"
              letterSpacing="0.03em"
              fontWeight="400"
              textAlign="left"
            >
              Yeni faaliyet alanı Ekle{' '}
              <img
                className="cp"
                src={BluePlusIcon}
                alt=""
                onClick={() => setShowAddActivity(true)}
              />
            </Title>
          )}
          <div className={`w-100 ${!showAddActivity ? 'card-wrapper' : ''}`}>
            {!showAddActivity ? (
              data?.class?.length > 0 &&
              data?.class?.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  id={activity.id}
                  isAccepted={activity?.status === 'active'}
                  status={activity?.status}
                  name={activity?.name}
                  isWorkPlace
                  capacity={activity?.capacity}
                  userBranchList={activity?.branches}
                  price={activity?.price}
                />
              ))
            ) : (
              <>
                {allList?.map((facility) => (
                  <SelectiveButton
                    key={facility.id}
                    id={facility.id}
                    name={facility.name}
                    selectButtonHandler={selectActivityHandler}
                    isActive={selectedActivity.includes(facility.id)}
                  />
                ))}
                <div className="d-flex w-100">
                  <Button
                    className="blue ml-auto"
                    text="Kaydet"
                    disabled={selectedActivity?.length === 0}
                    fontWeight="500"
                    onClick={submitNewActivity}
                  />
                </div>
              </>
            )}
          </div>
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
          <StyledLink onClick={() => setOpen(false)}>Devam Et</StyledLink>
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
  color: ${(p) => p.theme.colors.blue};
  text-align: center;
  display: block;
  width: 100%;

  &:hover {
    color: ${(p) => p.theme.colors.blue};
  }
`;
