import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components/macro';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  Text,
  PlusButton,
  MinusButton,
  Span,
  Svg,
  Material,
  Box,
  Button,
  Modal,
  DatePicker,
} from 'components';
import ReservationAccordion from '../ReservationAccordion';
import {
  createGroupSlot,
  setGroupSelectionData,
  dtCreateSeance, getProfessionalCalendar,
} from 'actions';
import { format } from 'date-fns';
import tr from 'date-fns/locale/tr';
import { DIETITIAN } from 'constants/index';
import moment from 'moment';
import { toast } from 'react-toastify';

export default function GroupRightSelections({ setTab = () => {}, setTabPage = () => {} }) {
  const {
    classSelection,
    selectedHour,
    branchSelection,
    sessionSelection,
    locationSelection,
    courseDetails,
    group_slot_image_id
  } = useSelector((state) => state.profileSettings2.reservationGroupSlot);

  const dispatch = useDispatch();
  const { type_id: userTypeId } = useSelector((state) => state.auth.user);

  const [minCapacityCount, setMinCapacityCount] = useState(0);
  const [maxCapacityCount, setMaxCapacityCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const reservationSuccessModalRef = useRef();

  const selectDataHandler = (name, value) =>
    dispatch(setGroupSelectionData(name, value));

  // useEffect(() => {
  //   setMaxCapacityCount(classSelection.capacity || 0);
  // }, [classSelection]);

  useEffect(() => {
    locationSelection?.id && dispatch(getProfessionalCalendar(locationSelection.id, 3, selectedDate));
  }, [locationSelection, selectedDate]);

  useEffect(() => {
    selectDataHandler('selectedDate', selectedDate)
  }, [selectedDate]);

  const closeSuccessReservationModal = useCallback(() => {
    reservationSuccessModalRef.current.closeModal()
    setTabPage('')
    setTab('Calendar')
  }, []);

  const { working_days: working_days } = useSelector(
    (state) => state.userProfile.calendar
  );

  const startOfWeeksArr = working_days?.map(
    (date) => new Date(moment(date, 'DD.MM.YYYY').toDate())
  );

  const addGroupSlotFail = (error) => {
    toast.error(
      error,
      {
        position: 'bottom-right',
        autoClose: 3000,
      }
    );
  };

  const createGroupSlotHandler = () => {
    switch (userTypeId) {
      case DIETITIAN:
        dispatch(
          dtCreateSeance(
            // {
            //   price,
            //   date: selectedDate,
            //   min_capacity: minCapacityCount,
            //   max_capacity: maxCapacityCount,
            // },
            () => reservationSuccessModalRef.current.openModal()
          )
        );
        break;

      default:
        if(!group_slot_image_id){
          toast.error('Lütfen fotoğraf seçiniz! ', {
            position: 'bottom-right',
            autoClose: 1500,
          });
  
          return;
        }
        if (
          +price > branchSelection.price ||
          [
            branchSelection,
            sessionSelection,
            locationSelection,
            courseDetails,
          ].some((item) => !item)
        ) {
          toast.error('Lütfen eksik veya yanlış şeçimlerinizi kontrol ediniz! ', {
            position: 'bottom-right',
            autoClose: 1500,
          });
  
          return;
        }

        dispatch(
          createGroupSlot(
            {
              price,
              date: selectedDate,
              min_capacity: minCapacityCount,
              max_capacity: maxCapacityCount,
            },
            () => reservationSuccessModalRef.current.openModal(),
            (error) => addGroupSlotFail(error)
          )
        );
        break;
    }
  };

  return (
    <RightWrapper>
      <RightBody>
        {userTypeId !== DIETITIAN && (
          <DatePicker
            minDate={new Date()}
            inline
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            highlightDates={[
              {
                'react-datepicker__day--highlighted': startOfWeeksArr,
              },
            ]}
          />
        )}
        {userTypeId !== DIETITIAN && (
          <ReservationAccordion title="Rezervasyon Tarihi & Saati" mt="10px">
            <CollapseItem>
              <Span pr="10px" mr="10px" fontWeight="500" color="dark">
                Ders
              </Span>

              <Box row alignItems="center">
                <Svg.CalendarIcon />

                <Span ml="10px" fontWeight="500" color="gray10">
                  {format(selectedDate, 'd MMMM iiii', { locale: tr })}
                </Span>

                <Span color="blue" ml="5px" fontWeight="500">
                  Saat: {selectedHour}
                </Span>
              </Box>
            </CollapseItem>
          </ReservationAccordion>
        )}

        {userTypeId !== DIETITIAN && (
          <ReservationAccordion title="Seçili Spor Alanı Grup Ders Kontenjanları">
            {classSelection ? (
              <>
                <CollapseItem>
                  <WorkPlaceInfoRow>
                    <Svg.GuestIcon className="guest-icon" />

                    <Span fontWeight="500" color="gray10">
                      {classSelection.name}
                    </Span>

                    <Span color="blue" fontWeight="500" ml="8px">
                      {classSelection.capacity} Kişilik
                    </Span>
                  </WorkPlaceInfoRow>
                  <Span ml="auto" color="blue" fontWeight="500">
                    {classSelection.price} TL
                  </Span>
                </CollapseItem>

                <Box row justifyContent="flex-end" color="red" fontWeight="500">
                  *Salon kiralama bedeli
                </Box>
              </>
            ) : (
              <div></div>
            )}
          </ReservationAccordion>
        )}
        {userTypeId !== DIETITIAN && (
          <>
            <DarkTitle className="mt-4">Kontenjan Belirleyiniz</DarkTitle>

            <Row>
              <Col lg={6}>
                <Text fontWeight="300" color="black3" my="5px">
                  Minumum
                </Text>

                <ButtonWrapper>
                  <MinusButton
                    width="35px"
                    height="35px"
                    mr="20px"
                    style={{ cursor: 'not-allowed' }}
                    onClick={() => {
                      if (minCapacityCount === 0) {
                        return;
                      }

                      setMinCapacityCount(minCapacityCount - 1);
                    }}
                  />

                  <Span minWidth="15px" color="red">
                    {minCapacityCount}
                  </Span>

                  <PlusButton
                    width="35px"
                    height="35px"
                    ml="20px"
                    onClick={() => {
                      if (minCapacityCount === classSelection.capacity) {
                        return;
                      }

                      setMinCapacityCount(minCapacityCount + 1);
                    }}
                  />
                </ButtonWrapper>
              </Col>
              <Col lg={6}>
                <Text fontWeight="300" color="black3" my="5px">
                  Maksimum
                </Text>

                <ButtonWrapper>
                  <MinusButton
                    width="35px"
                    height="35px"
                    mr="20px"
                    onClick={() => {
                      if (maxCapacityCount === 0) {
                        return;
                      } else setMaxCapacityCount(maxCapacityCount - 1);
                    }}
                  />

                  <Span minWidth="15px" color="blue">
                    {maxCapacityCount}
                  </Span>

                  <PlusButton
                    width="35px"
                    height="35px"
                    ml="20px"
                    onClick={() => {
                      if (maxCapacityCount === classSelection.capacity) {
                        return;
                      }

                      setMaxCapacityCount(maxCapacityCount + 1);
                    }}
                  />
                </ButtonWrapper>
              </Col>
            </Row>
          </>
        )}
      </RightBody>

      <RightFooter>
        {userTypeId === DIETITIAN && (
          <>
            <DarkTitle>Seans Sayısını Belirletiniz</DarkTitle>

            <Material.TextField
              onChange={(e) => selectDataHandler('seanceCount', e.target.value)}
              label="Giriniz"
              type="number"
            />
          </>
        )}


        {/*<Text color="red" fontSize="0.9rem">*/}
        {/*  *Max 50 TL fiyat giriniz*/}
        {/*</Text>*/}
        <DarkTitle>Fiyat Belirleyiniz</DarkTitle>
        {userTypeId == DIETITIAN && (
          <>
            <Material.TextField
              onChange={(e) => selectDataHandler('seancePrice', e.target.value)}
              error={price > 50}
              label="Giriniz"
              type="number"
            />

            <Text color="red" fontSize="0.9rem">
              *Max 50 TL fiyat giriniz
            </Text>
          </>
        )}
        {userTypeId !== DIETITIAN && (
          <>
            <Material.TextField
              changeValue={price}
              onChange={(e) => setPrice(e.target.value)}
              error={price > branchSelection.price}
              label="Giriniz"
              type="number"
            />

            <Text color="red" fontSize="0.9rem">
              *Max {branchSelection.price} TL fiyat giriniz
            </Text>
          </>
        )}
        <Button
          onClick={createGroupSlotHandler}
          text="Tamamla"
          className="blue"
          width="100%"
          height="65px"
          mt="15px"
        />
      </RightFooter>

      <SuccessModal activateFooter ref={reservationSuccessModalRef}>
        <Box center my="30px">
          <Svg.SuccessIcon />
        </Box>

        <Text fontWeight="600" fontSize="1.1rem" textAlign="center">
          Tebrikler
        </Text>

        <Text textAlign="center" mb="30px">
          Grup Dersi etkinliğiniz oluşturuldu.
        </Text>

        <Modal.Footer>
          <Text textAlign="center" color="blue" p="0" cursor="pointer" onClick={closeSuccessReservationModal}>
            REZERVASYON TAKVİMİMİ GÖR
          </Text>

          <Link to="/" className="group-right-selections__homepage">
            ANASAYFA
          </Link>
        </Modal.Footer>
      </SuccessModal>
    </RightWrapper>
  );
}

const WorkPlaceInfoRow = styled.div`
  display: flex;
  align-items: center;

  .guest-icon {
    margin: 0px 8px 2px 0px;
  }
`;

const SuccessModal = styled(Modal)`
  .modal-content {
    width: 500px;
  }

  .group-right-selections {
    &__homepage {
      border-top: 1px solid rgba(144, 144, 144, 0.2);
      text-align: center;
      padding-top: 20px;
      cursor: pointer;
      color: ${(p) => p.theme.colors.dark};
      display: block;
      margin-top: 20px;
    }
  }
`;

const CollapseItem = styled.div`
  border-top: 1px solid rgba(144, 144, 144, 0.2);
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding-top: 10px;
`;

const RightBody = styled.div`
  padding: 20px 30px 30px;
`;

const RightWrapper = styled.div`
  border-radius: 20px;
  background: #f8f8f8;
  box-shadow: 0px 2px 18px rgba(0, 0, 0, 0.14);
  overflow: hidden;
`;

const RightFooter = styled.div`
  background-color: white;
  padding: 30px;
`;

const DarkTitle = styled.h4`
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.dark};
`;

const ButtonWrapper = styled.div`
  height: 50px;
  border-radius: 5px;
  background: #fff;
  border: 1px solid #c6c6c6;
  display: flex;
  align-items: center;
  justify-content: center;
`;
