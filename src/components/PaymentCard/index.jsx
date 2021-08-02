import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { device } from 'utils';
import { Button, Accordion, Switch, DatePicker } from 'components';
import Svg from 'components/statics/svg';
import { space } from 'styled-system';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { animateScroll as scroll } from 'react-scroll';
import { useHistory } from 'react-router-dom'
import {
  setReservation,
  deleteSlot,
  addSlot,
  sendReservation,
  sendPackageReservation,
  clearReservationCalendar,
  setPacketReservation,
  setGroupLessonReservation,
  sendGroupReservation,
} from 'actions';
import { getWallet } from 'actions/userProfileActions/walletActions';
import moment from 'moment';
export default function PaymentCard({ type, subType, dateOption, disabledPayment = false }) {
  const formRef = useRef(null);
  const groupFormRef = useRef(null);
  const packetFormRef = useRef(null);
  const upgradeForm = useRef(null);

  const history = useHistory();
  const dispatch = useDispatch();
  const reservation = useSelector((state) => state.reservation);
  const buyPacket = useSelector((state) => state.buyPacket);
  const buyGroupLesson = useSelector((state) => state.buyGroupLesson);
  const { userInfo } = useSelector((state) => state.userProfile.userInfo);

  const { branches: branchList } = useSelector(
    (state) => state.userProfile.branch
  );
  const reservationCalendar = useSelector((state) => state.reservationCalendar);

  const payment = useSelector((state) => state.payment);
  const paymentPacket = useSelector((state) => state.paymentPacket);

  const [toggleState, setToggleState] = useState(false);
  const wallet = useSelector((state) => state.userProfile.wallet);
  const [selectedDate, setSelectedDate] = useState(new Date());
  useEffect(() => {
    dispatch(clearReservationCalendar());
    dispatch(getWallet());
  }, []);
  useEffect(() => {
    if (reservation?.data?.isSelected && reservation?.data?.isSelectedDate) {
      setSelectedDate(
        new Date(
          moment(reservation?.data?.isSelectedDate, 'DD.MM.YYYY').toDate()
        )
      );
    }
  }, [reservation?.data?.isSelectedDate]);
  useEffect(() => {
    if (payment?.request?.data?.merchant_id) {
      if (type == 'upgrade_packet') {
        upgradeForm.current.submit();

      } else {
        formRef.current.submit();
      }
    }
  }, [payment?.request]);

  useEffect(() => {
    if (paymentPacket?.request?.data?.merchant_id) {
      if (type == 'buy_group_lesson') {

        groupFormRef.current.submit();

      } else {
        packetFormRef.current.submit();
      }


    }
  }, [paymentPacket?.request]);
  useEffect(() => {
    if (reservation?.data?.slot?.length > 0) {
      if (type !== 'dt') {
        dispatch(
          setReservation({
            [`${type}_price`]:
              reservation?.data?.slot?.length *
              (branchList?.branches?.filter(item => item?.id == reservation.data?.branch_id)?.[0]?.price || reservationCalendar?.resData?.branches.filter(item => item?.id == reservation.data?.branch_id)?.[0]?.price),
          })
        );
      } else {
        dispatch(
          setReservation({
            [`${type}_price`]:
              reservation?.data?.slot?.length *
              (userInfo?.price || reservationCalendar?.data?.bs?.price),
          })
        );
      }
    } else {
      dispatch(
        setReservation({
          [[`${type}_price`]]: 0,
        })
      );
    }
  }, [reservation?.data?.slot]);
  useEffect(() => {
    if (type === 'buy_packet') {
      dispatch(
        setPacketReservation({
          date: moment(selectedDate).format('DD.MM.YYYY'),
        })
      );
    } else {
      dispatch(
        setReservation({ date: moment(selectedDate).format('DD.MM.YYYY') })
      );
    }
  }, [selectedDate]);

  useEffect(() => {
    switch (type) {
      case 'pt':
        setTotalAmountPT();
        break;
      case 'gym':
        setTotalAmountPT();
        break;
      case 'dt':
        setTotalAmountDT();
        break;
      case 'packet':
        setTotalAmountPacketReservation();
        break;
      default:
        break;
    }
  }, [
    reservation?.data?.[`${type}_price`],
    reservation?.data?.pt_price,
    reservation?.data?.gym_price,
    reservation?.data?.guest,
  ]);
  const startOfWeeksArr = () => {
    if (
      reservationCalendar?.data &&
      reservationCalendar?.data?.working_days?.length > 0
    ) {
      let arr = reservationCalendar?.data?.working_days.map(
        (date) => new Date(moment(date, 'DD.MM.YYYY').toDate())
      );
      return arr;
    } else {
      return [];
    }
  };

  function setTotalAmountPT() {
    var ptPrice = reservation?.data?.pt_price || 0;
    var gymPrice = reservation?.data?.gym_price || 0;
    var guestPrice = reservation?.data?.guest ? gymPrice + ptPrice : 0; // Buraya Çarpan gelecektir

    dispatch(
      setReservation({
        totals_amount: ptPrice + gymPrice + guestPrice,
      })
    );
  }
  function setTotalAmountDT() {
    var dtPrice = reservation?.data?.dt_price || 0;
    dispatch(
      setReservation({
        totals_amount: dtPrice,
      })
    );
  }
  function setTotalAmountPacketReservation() {
    var packetPrice = 0;
    var gymPrice = reservation?.data?.gym_price || 0;

    dispatch(
      setReservation({
        totals_amount: packetPrice + gymPrice,
      })
    );
  }
  function selectPaymentType(payment_type) {
    if (type !== 'buy_packet' && type !== 'upgrade_packet') {
      if (type == 'packet') {
        if (reservation?.data?.slot.length > 0) {
          dispatch(setReservation({ payment_type: payment_type }));
        } else {
          toast.error('Sepetiniz Boş', {
            position: 'bottom-right',
            autoClose: 4000,
          });
        }
      } else {
        if (!disabledPayment) {
          if (reservation?.data?.totals_amount > 0) {
            dispatch(setReservation({ payment_type: payment_type }));
          } else {
            toast.error('Sepetiniz Boş', {
              position: 'bottom-right',
              autoClose: 4000,
            });
          }
        } else {
          toast.error('Lütfen seçimlerinizi eksiksiz yapınız!', {
            position: 'bottom-right',
            autoClose: 4000,
          });
        }
      }
    } else {
      if (buyPacket?.reservation?.totals_amount > 0) {
        dispatch(setPacketReservation({ payment_type: payment_type }));
      } else {
        toast.error('Sepetiniz Boş', {
          position: 'bottom-right',
          autoClose: 4000,
        });
      }
    }
  }
  function selectPaymentTypePacket(payment_type) {
    if (type !== 'buy_packet' && type !== 'upgrade_packet') {
      if (reservation?.data?.totals_amount > 0) {
        dispatch(setPacketReservation({ payment_type: payment_type }));
      } else {
        toast.error('Sepetiniz Boş', {
          position: 'bottom-right',
          autoClose: 4000,
        });
      }
    } else {
      if (buyPacket?.reservation?.totals_amount > 0) {

        dispatch(setPacketReservation({ payment_type: payment_type }));
      } else {
        toast.error('Sepetiniz Boş', {
          position: 'bottom-right',
          autoClose: 4000,
        });
      }
    }
  }
  function selectPaymentTypeGroupLesson(payment_type) {
    if (buyGroupLesson?.reservation?.totals_amount > 0) {
      dispatch(setGroupLessonReservation({ payment_type: payment_type }));
    } else {
      toast.error('Sepetiniz Boş', {
        position: 'bottom-right',
        autoClose: 4000,
      });
    }
  }

  const removeEmpty = (obj) =>
    Object.entries(obj)
      // eslint-disable-next-line no-unused-vars
      .filter(([_, value]) => !!value)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  function selectedSlotControl(item) {
    return (
      reservation?.data?.slot?.filter(
        (e) => e.hour === item.time && e.date === item.date
      ).length > 0
    );
  }

  function sendPaymentPT() {
    var json = {
      pt_id: reservation?.data?.pt_id,
      payment_type: reservation?.data?.payment_type,
      is_contracts_accepted: true,
      session: reservation?.data?.session,
      location_id: reservation?.data?.location_id,
      branch_id: reservation?.data?.branch_id,
      holder_name: reservation?.data?.holder_name,
      card_number: reservation?.data?.card_number,
      expiration_month: reservation?.data?.expiration_month,
      expiration_year: reservation?.data?.expiration_year,
      cvc: reservation?.data?.cvc,
      slot: reservation?.data?.slot,
      guest: reservation?.data?.guest,
    };

    if (
      reservation?.data?.holder_name &&
      reservation?.data?.card_number &&
      reservation?.data?.expiration_month &&
      reservation?.data?.expiration_year &&
      reservation?.data?.cvc
    ) {
      dispatch(sendReservation('pt', removeEmpty(json), () => {
        if (json.payment_type == 'wallet') {
          history.push('/buy/success')
        }
      }));
    } else {
      if (reservation?.data?.session == 'gym' || reservation?.data?.session == 'home_park') {
        if (!reservation?.data?.location_id) {
          toast.error('Lokasyon seçimi yapmadınız!', {
            position: 'bottom-right',
            autoClose: 4000,
          });
          return;
        }
      }

      if (reservation?.data?.payment_type == 'wallet') {
        dispatch(sendReservation('pt', removeEmpty(json), () => {
          history.push('/buy/success')
        }));
      } else {
        toast.error('Eksik Kart Bilgilerini Doldurunuz !', {
          position: 'bottom-right',
          autoClose: 4000,
        });
      }
    }
  }
  function scrollToTop() {
    scroll.scrollToTop({
      duration: 1000,
      smooth: true,
    });
  }
  function sendPaymentGYM() {
    var json = {
      bs_id: reservation?.data?.bs_id,
      pt_id: reservation?.data?.pt_id,
      payment_type: reservation?.data?.payment_type,
      is_contracts_accepted: true,
      session: reservation?.data?.session,
      location_id: reservation?.data?.location_id,
      branch_id: reservation?.data?.branch_id,
      holder_name: reservation?.data?.holder_name,
      card_number: reservation?.data?.card_number,
      expiration_month: reservation?.data?.expiration_month,
      expiration_year: reservation?.data?.expiration_year,
      cvc: reservation?.data?.cvc,
      slot: reservation?.data?.slot,
      guest: reservation?.data?.guest,
    };

    if (
      reservation?.data?.holder_name &&
      reservation?.data?.card_number &&
      reservation?.data?.expiration_month &&
      reservation?.data?.expiration_year &&
      reservation?.data?.cvc
    ) {
      dispatch(sendReservation('bs', removeEmpty(json), () => {
        if (json.payment_type == 'wallet') {
          history.push('/buy/success')
        }
      }));
    } else {

      if (reservation?.data?.payment_type == 'wallet') {
        dispatch(sendReservation('bs', removeEmpty(json), () => {
          history.push('/buy/success')
        }));
      } else {
        toast.error('Eksik Kart Bilgilerini Doldurunuz !', {
          position: 'bottom-right',
          autoClose: 4000,
        });
      }
    }
  }
  function sendPaymentPtPacketUpgrade() {
    var json = {
      package_id: buyPacket?.data?.package?.id,
      classification: buyPacket?.reservation?.level,
      holder_name: buyPacket?.reservation?.holder_name,
      is_contracts_accepted:
        buyPacket?.reservation?.is_contracts_accepted || true,
      payment_type: buyPacket?.reservation?.payment_type,
      cvc: buyPacket?.reservation?.cvc,
      slot: buyPacket?.reservation?.slot,
      guest: buyPacket?.reservation?.guest,
      card_number: buyPacket?.reservation?.card_number,
      expiration_month: buyPacket?.reservation?.expiration_month,
      expiration_year: buyPacket?.reservation?.expiration_year,
    };

    if (
      buyPacket?.reservation?.holder_name &&
      buyPacket?.reservation?.card_number &&
      buyPacket?.reservation?.expiration_month &&
      buyPacket?.reservation?.expiration_year &&
      buyPacket?.reservation?.cvc
    ) {
      dispatch(sendReservation('upgrade_packet', removeEmpty(json), () => {
        if (json.payment_type == 'wallet') {
          history.push('/buy/success')
        }
      }));
    } else {
      if (buyPacket?.reservation?.payment_type == 'wallet') {
        dispatch(
          sendReservation('upgrade_packet', removeEmpty(json), () => {
            history.push('/buy/success')
          })
        );
      } else {
        toast.error('Eksik Kart Bilgilerini Doldurunuz !', {
          position: 'bottom-right',
          autoClose: 4000,
        });
      }
    }
  }
  function sendPaymentPtPacket() {
    var json = {
      package_id: buyPacket?.reservation?.id,
      classification: buyPacket?.reservation?.level,
      is_contracts_accepted: true,
      payment_type: buyPacket.reservation?.payment_type,
    };
    dispatch(sendPackageReservation(subType, removeEmpty(json), () => {
      if (json.payment_type == 'wallet') {
        history.push('/buy/success')
      }
    })); //Burasını değiş
  }
  function sendPaymentPtGroup() {
    var json = {
      slot_id: buyGroupLesson?.reservation?.id,
      is_contracts_accepted: true,
      payment_type: buyGroupLesson.reservation?.payment_type,
    };
    dispatch(sendGroupReservation(removeEmpty(json), () => {

      if (json.payment_type == 'wallet') {
        history.push('/buy/success')
      }
    })); //Burasını değiş
  }
  function sendPaymentDT() {
    var json = {
      dt_id: reservation?.data?.dt_id,
      payment_type: reservation?.data?.payment_type,
      is_contracts_accepted: true,
      session: reservation?.data?.session,
      location_id: reservation?.data?.location_id,
      cvc: reservation?.data?.cvc,

      guest: false,
      holder_name: reservation?.data?.holder_name,
      card_number: reservation?.data?.card_number,
      expiration_month: reservation?.data?.expiration_month,
      expiration_year: reservation?.data?.expiration_year,
      slot: reservation?.data?.slot,
    };

    if (
      reservation?.data?.holder_name &&
      reservation?.data?.card_number &&
      reservation?.data?.expiration_month &&
      reservation?.data?.expiration_year &&
      reservation?.data?.cvc
    ) {

      dispatch(sendReservation('dt', removeEmpty(json), () => {
        if (json.payment_type == 'wallet') {
          history.push('/buy/success')
        }
      }));
    } else {

      if (reservation?.data?.payment_type == 'wallet') {

        dispatch(sendReservation('dt', removeEmpty(json), () => {

          history.push('/buy/success')

        }));
      } else {
        toast.error('Eksik Kart Bilgilerini Doldurunuz !', {
          position: 'bottom-right',
          autoClose: 4000,
        });
      }
    }
  }

  function isOkForRes() {
    //gym ok
    //pt ok
    //dt ok
    var tempType = type;
    if (type == 'packet') tempType = subType;
    switch (tempType) {
      case 'pt':
        if (!reservation?.data?.session) {
          // setIsNotOkReason('Oturum türü seçilmedi.')

          return { reason: 'Oturum türü seçilmedi.' }
        };
        if ((reservation?.data.session == 'gym' || reservation?.data.session == 'home_park') && !reservation?.data?.location_id) {
          // setIsNotOkReason('Seçilen oturum türü lokasyon seçimi gerektirmektedir')
          return { reason: 'Seçilen oturum türü lokasyon seçimi gerektirmektedir' }
        };
        //setIsNotOkReason('')
        if (!(reservationCalendar?.data?.slice &&
          reservationCalendar?.data?.slice?.length > 0)) {
          return { reason: 'Seçimlerinize uygun rezervasyon takvimi bulunamadı.' }
        }
        return true

      case 'dt':
        if (!reservation?.data?.session) {
          // setIsNotOkReason('Oturum türü seçilmedi.')

          return { reason: 'Oturum türü seçilmedi.' }
        };
        if ((reservation?.data.session == 'clinic') && !reservation?.data?.location_id) {
          // setIsNotOkReason('Seçilen oturum türü lokasyon seçimi gerektirmektedir')
          return { reason: 'Seçilen oturum türü lokasyon seçimi gerektirmektedir' }
        };
        //setIsNotOkReason('')
        if (!(reservationCalendar?.data?.slice &&
          reservationCalendar?.data?.slice?.length > 0)) {
          return { reason: 'Seçimlerinize uygun rezervasyon takvimi bulunamadı.' }
        }
        return true
      case 'gym':

        if (disabledPayment == true) return { reason: 'Eğitmen seçimi yapmadınız' }
        if ((reservation?.data.session == 'gym' || reservation?.data.session == 'home_park') && !reservation?.data?.location_id) {
          // setIsNotOkReason('Seçilen oturum türü lokasyon seçimi gerektirmektedir')
          return { reason: 'Seçilen oturum türü lokasyon seçimi gerektirmektedir' }
        };
        //setIsNotOkReason('')
        if (!(reservationCalendar?.data?.slice &&
          reservationCalendar?.data?.slice?.length > 0)) {
          return { reason: 'Seçimlerinize uygun rezervasyon takvimi bulunamadı.' }
        }
        return true

      default:
        break;
    }



  }
  function _renderReservationState() {
    var reason = isOkForRes()?.reason
    return (
      (!(reason) && (
        <div
          style={{
            width: '100%',
            display: 'flex',
            padding: '40px',
          }}
        >
          <Svg.TickLesson></Svg.TickLesson>
          <text style={{ marginLeft: '5px' }}>
            Seçiminiz Rezervasyon İçin Uygundur
          </text>
        </div>
      )) || (
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Svg.InfoIcon></Svg.InfoIcon>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
            <text style={{ marginLeft: '5px', textAlign: 'center', marginTop: '6px', fontWeight: 'bold' }}>
              Rezervasyon için uygun değildir.
            </text>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Svg.CencelIcon ></Svg.CencelIcon>
              <text style={{ marginLeft: '5px' }}>{reason}</text>
            </div>
          </div>
        </div>
      )
    )
  }
  function sendPaymentPtPacketReservation() {
    var json = {
      package_uuid: reservation?.data?.package_uuid,
      pt_id: reservation?.data?.selectedPt?.id,
      dt_id: reservationCalendar?.data?.dt?.id,

      payment_type: reservation?.data?.payment_type == 'credit_card' ? 'credit_card' : 'package',
      is_contracts_accepted: true,
      session: reservation?.data?.session,
      location_id: reservation?.data?.location_id,
      cvc: reservation?.data?.cvc,

      guest: false,
      holder_name: reservation?.data?.holder_name,
      card_number: reservation?.data?.card_number,
      expiration_month: reservation?.data?.expiration_month,
      expiration_year: reservation?.data?.expiration_year,
      slot: reservation?.data?.slot,
    };

    if (
      reservation?.data?.holder_name &&
      reservation?.data?.card_number &&
      reservation?.data?.expiration_month &&
      reservation?.data?.expiration_year &&
      reservation?.data?.cvc
    ) {
      dispatch(

        sendReservation(
          reservation?.data?.packetInfo?.type,
          removeEmpty(json),
          () => {
            if (json.payment_type == 'wallet') {
              history.push('/buy/success')
            }
          }
        )
      );
    } else {
      if (reservation?.data?.payment_type == 'wallet' || reservation?.data?.payment_type == 'no_money') {

        dispatch(
          sendReservation(
            reservation?.data?.packetInfo?.type,
            removeEmpty(json),
            () => {
              history.push('/buy/success')


            }
          )
        );
      } else {
        toast.error('Eksik Kart Bilgilerini Doldurunuz !', {
          position: 'bottom-right',
          autoClose: 4000,
        });
      }
    }
  }
  function handleHourClick(item) {
    var slot = reservation?.data?.slot;
    var newItem = { date: item.date, hour: item.time };

    if (slot) {
      if (selectedSlotControl(item)) {
        dispatch(deleteSlot(newItem));
      } else {
        dispatch(addSlot(newItem));
      }
    } else {
      dispatch(addSlot(newItem));
    }
  }
  return (
    <Container>
      {dateOption && (
        <ReservationContainer disable={reservation?.data?.payment_type}>
          <AddHeader>Tarih Seçiniz</AddHeader>
          <DateContainer>
            <DatePicker
              selected={selectedDate || new Date()}
              onSelect={(date) => {
                setSelectedDate(date);
              }}
              selectsRange
              inline
              highlightDates={[
                {
                  'react-datepicker__day--highlighted': startOfWeeksArr(),
                },
              ]}
            />{' '}
          </DateContainer>
          {reservation?.data?.date && (
            <>
              <AddHeader>Saat Seçiniz</AddHeader>
              <Hours>
                {(reservation?.data?.date &&
                  reservationCalendar?.data?.slice?.length > 0 &&
                  reservationCalendar?.data?.slice?.filter(item => item.date == reservation?.data?.date)?.map((item, indx) => (
                    <Hour
                      onClick={() => {
                        handleHourClick(item);
                      }}
                      key={indx}
                      selected={selectedSlotControl(item)}
                    >
                      {item.time}
                    </Hour>
                  ))) || (
                    <text>Seçtiğiniz koşullara uygun boş zaman bulunamadı..</text>
                  )}
              </Hours>
            </>
          )}
        </ReservationContainer>
      )}
      <AddTextContainer>
        {(type === 'pt') &&
          reservation?.data?.session !== 'online' &&
          !reservation?.data?.payment_type && (
            <>
              <AddHeader>Misafir Ekle</AddHeader>
              <AddDesc>
                Dilersen istediğin bir arkadaşınla beraber derse gelebilirsin.
              </AddDesc>
              <Switch
                checked={reservation?.data?.guest}
                onChange={() => {
                  dispatch(
                    setReservation({
                      guest: !reservation?.data?.guest,
                    })
                  );
                }}
              />
            </>
          )}
      </AddTextContainer>

      {type === 'pt' && (
        <InfoContainer>
          <DataContainer>
            <>
              <Info>
                <Text style={{ fontWeight: 800 }}>Eğitmen Ücreti</Text>
                <Text style={{ fontWeight: 800 }}>
                  {reservation?.data?.pt_price}
                </Text>
              </Info>
              <Info borderDisable>
                <Text style={{ fontWeight: 800 }}>Salon Ücreti</Text>
                <Text style={{ fontWeight: 800 }}>
                  {reservation?.data?.gym_price}
                </Text>
              </Info>
              {reservation?.data?.guest && (
                <Info borderDisable>
                  <Text style={{ fontWeight: 800 }}>Misafir Ücreti</Text>
                  <Text style={{ fontWeight: 800 }}>
                    {(reservation?.data?.gym_price || 0) +
                      reservation?.data?.pt_price || 0}
                  </Text>
                </Info>
              )}
            </>
          </DataContainer>
        </InfoContainer>
      )}
      {type === 'packet' && (
        <InfoContainer>
          <DataContainer>
            <>
              <Info borderDisable>
                <Text style={{ fontWeight: 800 }}>Salon Ücreti</Text>
                <Text style={{ fontWeight: 800 }}>
                  {reservation?.data?.gym_price}
                </Text>
              </Info>
            </>
          </DataContainer>
        </InfoContainer>
      )}
      {type === 'dt' && reservation?.data?.dt_price > -1 && (
        <InfoContainer>
          <DataContainer>
            <Info>
              <Text style={{ fontWeight: 800 }}>Diyetisyen Ücreti</Text>
              <Text style={{ fontWeight: 800 }}>
                {reservation?.data?.dt_price}
              </Text>
            </Info>
          </DataContainer>
        </InfoContainer>
      )}
      {type !== 'buy_packet' &&
        type !== 'upgrade_packet' &&
        type !== 'buy_group_lesson' && (
          <InfoContainer>
            <DataContainer>
              <Info borderDisable>
                <Accordion>
                  <AccordionItemWrapper>
                    <Accordion.Item defaultOpen={true}>
                      <Accordion.Toggle
                        onToggle={(state) => setToggleState(state)}
                        className="accordion-toggler"
                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {/*miniIcon*/}
                          <DarkTitle>{'Rezervasyonlarınız'}</DarkTitle>
                        </div>
                        {toggleState ? (
                          <Svg.ArrowDownIcon />
                        ) : (
                          <Svg.ArrowUpIcon />
                        )}
                      </Accordion.Toggle>
                      <Accordion.Collapse>
                        {reservation?.data?.slot?.map((elm, key) => (
                          <Info key={key}>
                            <div style={{ display: 'flex' }}>
                              <Text
                                style={{
                                  fontWeight: 800,
                                  padding: '0 7px',
                                  borderRightStyle: 'solid',
                                  borderWidth: '1px',
                                  borderColor: 'gray',
                                }}
                              >
                                {key + 1}.
                                {(type === 'pt' && 'Ders') ||
                                  (type === 'dt' && 'Seans')}
                              </Text>
                              <Svg.Date style={{ marginLeft: '5px' }} />
                              <Text
                                color="#00B2A9"
                                style={{
                                  fontWeight: 800,
                                  padding: '0 7px',
                                }}
                              >
                                Tarih:
                              </Text>
                              <Text
                                color="gray"
                                style={{
                                  fontWeight: 800,
                                  padding: '0 7px',
                                }}
                              >
                                {elm.date}
                              </Text>
                              <Text
                                color="#00B2A9"
                                style={{
                                  fontWeight: 800,
                                  padding: '0 7px',
                                }}
                              >
                                Saat:
                              </Text>
                              <Text
                                color="gray"
                                style={{
                                  fontWeight: 800,
                                  padding: '0 7px',
                                }}
                              >
                                {elm.hour}
                              </Text>
                            </div>
                            {dateOption && !reservation?.data?.payment_type && (
                              <Svg.TrashIcon
                                onClick={() => {
                                  dispatch(deleteSlot(elm));
                                }}
                              />
                            )}
                          </Info>
                        ))}
                      </Accordion.Collapse>
                    </Accordion.Item>
                  </AccordionItemWrapper>
                </Accordion>
              </Info>
            </DataContainer>
            {(dateOption && type === 'pt' && (
              <AddTextContainer>
                <AddHeader onClick={scrollToTop}>Ders Ekle</AddHeader>
                <AddDesc>Aynı eğitmen ve salondan daha fazla ders alın</AddDesc>
              </AddTextContainer>
            )) ||
              (dateOption && type === 'dt' && (
                <AddTextContainer onClick={scrollToTop}>
                  <AddHeader>Seans Ekle</AddHeader>
                  <AddDesc>
                    Aynı diyetisyen ve klinikten daha fazla randevu alın
                  </AddDesc>
                </AddTextContainer>
              )) ||
              (type === 'dt' && (
                <AddTextContainer>
                  <AddHeader>Seans Ekle</AddHeader>
                  <AddDesc>
                    Aynı diyetisyen ve klinikten daha fazla randevu alın
                  </AddDesc>
                </AddTextContainer>
              ))}
          </InfoContainer>
        )}
      <ConfirmContainer>
        <BottomContainer>
          <Text style={{ fontWeight: 800 }}>Toplam Ücret</Text>
          <Text color="#00B2A9" style={{ fontWeight: 800, fontSize: 30 }}>
            {(type == 'buy_packet' || type == 'upgrade_packet') &&
              (buyPacket?.reservation?.totals_amount
                ? buyPacket?.reservation?.totals_amount + '₺'
                : 0 + ' ₺')}
            {(type == 'pt' ||
              type == 'dt' ||
              type == 'gym' ||
              type == 'packet') &&
              (reservation?.data?.totals_amount
                ? reservation?.data?.totals_amount + '₺'
                : 0 + ' ₺')}
            {type == 'buy_group_lesson' &&
              (buyGroupLesson?.reservation?.totals_amount
                ? buyGroupLesson?.reservation?.totals_amount + '₺'
                : 0 + ' ₺')}
          </Text>
        </BottomContainer>
        {(type == 'pt' || type == 'dt' || type == 'gym' || type == 'packet') &&
          (reservation?.data?.payment_type ? (
            <BottomContainer>
              <Button
                style={{ width: '100%', padding: '20px' }}
                className="blue"
                text="Rezervasyonu Onayla"
                onClick={() => {
                  switch (type) {
                    case 'pt':
                      sendPaymentPT();
                      break;
                    case 'dt':
                      sendPaymentDT();
                      break;
                    case 'gym':
                      sendPaymentGYM();
                      break;
                    case 'packet':
                      sendPaymentPtPacketReservation();
                      break;

                    default:
                      break;
                  }
                }}
              />
            </BottomContainer>
          ) : (
            <>
              {
                _renderReservationState()
              }
              {false && (wallet?.data?.balance >= reservation?.data?.totals_amount) ? ( //Şimdilik cüzdanım kapatıldı
                <BottomContainer>
                  <Button
                    style={{ width: '100%', padding: '20px' }}
                    className="blue"
                    text="Cüzdanımdan Öde"
                    onClick={() => {
                      if (reservation?.data?.session) {
                        if (
                          reservationCalendar?.data?.slice &&
                          reservationCalendar?.data?.slice?.length > 0
                        ) {
                          var wallet_balance = wallet?.data?.balance || 0;
                          var amount = reservation?.data?.totals_amount || 0;
                          var diff = wallet_balance - amount;
                          if (diff < 0) {
                            selectPaymentType('both');
                          } else {
                            selectPaymentType('wallet');
                          }
                        } else {
                          toast.error('Lütfen Seçiminizi Gözden Geçiriniz!', {
                            position: 'bottom-right',
                            autoClose: 4000,
                          });
                        }
                      } else if (type == 'gym') {
                        var wallet_balance = wallet?.data?.balance || 0;
                        var amount = reservation?.data?.totals_amount || 0;
                        var diff = wallet_balance - amount;
                        if (diff < 0) {
                          selectPaymentType('both');
                        } else {
                          selectPaymentType('wallet');
                        }
                      } else if (type == 'upgrade_packet') {
                        var wallet_balance = wallet?.data?.balance || 0;
                        var amount = reservation?.data?.totals_amount || 0;
                        var diff = wallet_balance - amount;
                        if (diff < 0) {
                          selectPaymentType('both');
                        } else {
                          selectPaymentType('wallet');
                        }
                      } else {
                        toast.error('Lütfen Oturum Türü Seçiniz!', {
                          position: 'bottom-right',
                          autoClose: 4000,
                        });
                      }
                    }}
                  />
                </BottomContainer>
              ) : (
                ''
              )}
              {type == 'packet' && reservation?.data?.totals_amount == 0 && (
                <BottomContainer style={{ margin: '5px' }}>
                  <Button
                    style={{ width: '100%', padding: '20px' }}
                    className="blue"
                    text={"Rezervasyon Oluştur"}
                    onClick={() => {
                      if (reservation?.data?.session) {
                        if (
                          reservationCalendar?.data?.slice &&
                          reservationCalendar?.data?.slice?.length > 0
                        ) {
                          selectPaymentType('no_money');
                        } else {
                          toast.error('Lütfen Seçiminizi Gözden Geçiriniz!', {
                            position: 'bottom-right',
                            autoClose: 4000,
                          });
                        }
                      } else {
                        toast.error('Lütfen Oturum Türü Seçiniz!', {
                          position: 'bottom-right',
                          autoClose: 4000,
                        });
                      }
                    }}
                  />
                </BottomContainer>
              )}
              {!(type == 'packet' && reservation?.data?.totals_amount == 0) && <BottomContainer style={{ margin: '5px' }}>
                <Button
                  style={{ width: '100%', padding: '20px' }}
                  className="blue"
                  text={"Kredi Kartından Öde"}
                  onClick={() => {
                    if (reservation?.data?.session) {
                      if (
                        reservationCalendar?.data?.slice &&
                        reservationCalendar?.data?.slice?.length > 0
                      ) {
                        scrollToTop();
                        selectPaymentType('credit_card');
                      } else {
                        toast.error('Lütfen Seçiminizi Gözden Geçiriniz!', {
                          position: 'bottom-right',
                          autoClose: 4000,
                        });
                      }
                    } else if (type == 'gym') {
                      selectPaymentType('credit_card');
                    } else if (type == 'upgrade_packet') {
                      selectPaymentType('credit_card');
                    } else {
                      toast.error('Lütfen Oturum Türü Seçiniz!', {
                        position: 'bottom-right',
                        autoClose: 4000,
                      });
                    }
                  }}
                />
              </BottomContainer>}
            </>
          ))}
        {type == 'buy_group_lesson' &&
          (buyGroupLesson?.reservation?.payment_type ? (
            <BottomContainer>
              <Button
                style={{ width: '100%', padding: '20px' }}
                className="blue"
                text="Ödeme Yap"
                onClick={() => {
                  sendPaymentPtGroup();
                }}
              />
            </BottomContainer>
          ) : (
            <>
              {false && (wallet?.data?.balance >= //Cüzdanım şimdilik kapatıldı
                buyGroupLesson?.reservation?.totals_amount) ? (
                <BottomContainer>
                  <Button
                    style={{ width: '100%', padding: '20px' }}
                    className="blue"
                    text="Cüzdanımdan Öde"
                    onClick={() => {
                      var wallet_balance = wallet?.data?.balance || 0;
                      var amount =
                        buyGroupLesson?.reservation?.totals_amount || 0;
                      var diff = wallet_balance - amount;
                      if (diff < 0) {
                        selectPaymentTypeGroupLesson('both');
                      } else {
                        selectPaymentTypeGroupLesson('wallet');
                      }
                    }}
                  />
                </BottomContainer>
              ) : (
                ''
              )}

              <BottomContainer style={{ margin: '5px' }}>
                <Button
                  style={{ width: '100%', padding: '20px' }}
                  className="blue"
                  text="Kredi Kartından Öde"
                  onClick={() => {
                    scrollToTop();
                    selectPaymentTypeGroupLesson('credit_card');
                  }}
                />
              </BottomContainer>
            </>
          ))}
        {(type == 'buy_packet' || type == 'upgrade_packet') &&
          (buyPacket?.reservation?.payment_type ? (
            <BottomContainer>
              <Button
                style={{ width: '100%', padding: '20px' }}
                className="blue"
                text="Ödeme Yap"
                onClick={() => {
                  switch (type) {
                    case 'upgrade_packet':
                      sendPaymentPtPacketUpgrade();

                      break;
                    case 'buy_packet':
                      sendPaymentPtPacket();

                      break;

                    default:
                      break;
                  }
                }}
              />
            </BottomContainer>
          ) : (
            <>
              {false && (wallet?.data?.balance >= buyPacket?.reservation?.totals_amount) ? ( //Cüzdanım Şimdilik kapatıldı
                <BottomContainer>
                  <Button
                    style={{ width: '100%', padding: '20px' }}
                    className="blue"
                    text="Cüzdanımdan Öde"
                    onClick={() => {
                      var wallet_balance = wallet?.data?.balance || 0;
                      var amount = buyPacket?.reservation?.totals_amount || 0;
                      var diff = wallet_balance - amount;
                      if (diff < 0) {
                        selectPaymentTypePacket('both');
                      } else {
                        selectPaymentTypePacket('wallet');
                      }
                    }}
                  />
                </BottomContainer>
              ) : (
                ''
              )}

              <BottomContainer style={{ margin: '5px' }}>
                <Button
                  style={{ width: '100%', padding: '20px' }}
                  className="blue"
                  text="Kredi Kartından Öde"
                  onClick={() => {
                    scrollToTop();
                    selectPaymentTypePacket('credit_card');
                  }}
                />
              </BottomContainer>
            </>
          ))}
      </ConfirmContainer>
      <form ref={formRef} action="https://www.paytr.com/odeme" method="POST">
        {/*<input type="text" name="cc_owner" value="PAYTR TEST" />
        <input type="hidden" name="card_number" value="9792030394440796" />
        <input type="hidden" name="expiry_month" value="12" />
        <input type="hidden" name="expiry_year" value="24" />
                <input type="hidden" name="cvv" value="000" />*/}
        <input
          type="hidden"

          name="cc_owner"
          value={reservation?.data?.holder_name}
        />
        <input
          type="hidden"

          name="card_number"
          value={reservation?.data?.card_number?.replace(/\s/g, '')}
        />
        <input
          type="hidden"

          name="expiry_month"
          value={reservation?.data?.expiration_month}
        />
        <input
          type="hidden"

          name="expiry_year"
          value={reservation?.data?.expiration_year}
        />
        <input type="hidden"
          name="cvv" value={reservation?.data?.cvc} />

        <input
          type="hidden"

          name="card_type"
          value={payment?.request?.data?.card_type}
        />
        <input
          type="hidden"

          name="currency"
          value={payment?.request?.data?.currency}
        />
        <input
          type="hidden"

          name="debug_on"
          value={payment?.request?.data?.debug_on}
        />
        <input
          type="hidden"

          name="email"
          value={payment?.request?.data?.email}
        />
        <input
          type="hidden"

          name="installment_count"
          value={payment?.request?.data?.installment_count}
        />
        <input type="hidden"
          name="lang" value={payment?.request?.data?.lang} />
        <input
          type="hidden"

          name="max_installment"
          value={payment?.request?.data?.max_installment}
        />
        <input
          type="hidden"

          name="merchant_fail_url"
          value={payment?.request?.data?.merchant_fail_url}
        />
        <input
          type="hidden"

          name="merchant_id"
          value={payment?.request?.data?.merchant_id}
        />
        <input
          type="hidden"

          name="merchant_oid"
          value={payment?.request?.data?.merchant_oid}
        />
        <input
          type="hidden"

          name="merchant_ok_url"
          value={payment?.request?.data?.merchant_ok_url}
        />
        <input
          type="hidden"

          name="no_installment"
          value={payment?.request?.data?.no_installment}
        />
        <input
          type="hidden"

          name="non3d_test_failed"
          value={payment?.request?.data?.non3d_test_failed}
        />
        <input
          type="hidden"

          name="non_3d"
          value={payment?.request?.data?.non_3d}
        />
        <input
          type="hidden"

          name="payment_amount"
          value={payment?.request?.data?.payment_amount}
        />
        <input
          type="hidden"

          name="payment_type"
          value={payment?.request?.data?.payment_type}
        />
        <input
          type="hidden"

          name="paytr_token"
          value={payment?.request?.data?.paytr_token}
        />

        <input
          type="hidden"

          name="test_mode"
          value={payment?.request?.data?.test_mode}
        />
        <input

          type="hidden"
          name="user_address"
          value={payment?.request?.data?.user_address}
        />
        <input
          type="hidden"

          name="user_basket"
          value={payment?.request?.data?.user_basket}
        />
        <input
          type="hidden"

          name="user_ip"
          value={payment?.request?.data?.user_ip}
        />
        <input
          type="hidden"

          name="user_name"
          value={payment?.request?.data?.user_name}
        />
        <input
          type="hidden"

          name="user_phone"
          value={payment?.request?.data?.user_phone}
        />
      </form>
      <form ref={upgradeForm} action="https://www.paytr.com/odeme" method="POST">
        {/*<input type="text" name="cc_owner" value="PAYTR TEST" />
        <input type="hidden" name="card_number" value="9792030394440796" />
        <input type="hidden" name="expiry_month" value="12" />
        <input type="hidden" name="expiry_year" value="24" />
                <input type="hidden" name="cvv" value="000" />*/}
        <input
          type="hidden"
          name="cc_owner"
          value={buyPacket?.reservation?.holder_name}
        />
        <input
          type="hidden"
          name="card_number"
          value={buyPacket?.reservation?.card_number?.replace(/\s/g, '')}
        />
        <input
          type="hidden"
          name="expiry_month"
          value={buyPacket?.reservation?.expiration_month}
        />
        <input
          type="hidden"
          name="expiry_year"
          value={buyPacket?.reservation?.expiration_year}
        />
        <input type="hidden" name="cvv" value={buyPacket?.reservation?.cvc} />

        <input
          type="hidden"
          name="card_type"
          value={payment?.request?.data?.card_type}
        />
        <input
          type="hidden"
          name="currency"
          value={payment?.request?.data?.currency}
        />
        <input
          type="hidden"
          name="debug_on"
          value={payment?.request?.data?.debug_on}
        />
        <input
          type="hidden"
          name="email"
          value={payment?.request?.data?.email}
        />
        <input
          type="hidden"
          name="installment_count"
          value={payment?.request?.data?.installment_count}
        />
        <input type="hidden" name="lang" value={payment?.request?.data?.lang} />
        <input
          type="hidden"
          name="max_installment"
          value={payment?.request?.data?.max_installment}
        />
        <input
          type="hidden"
          name="merchant_fail_url"
          value={payment?.request?.data?.merchant_fail_url}
        />
        <input
          type="hidden"
          name="merchant_id"
          value={payment?.request?.data?.merchant_id}
        />
        <input
          type="hidden"
          name="merchant_oid"
          value={payment?.request?.data?.merchant_oid}
        />
        <input
          type="hidden"
          name="merchant_ok_url"
          value={payment?.request?.data?.merchant_ok_url}
        />
        <input
          type="hidden"
          name="no_installment"
          value={payment?.request?.data?.no_installment}
        />
        <input
          type="hidden"
          name="non3d_test_failed"
          value={payment?.request?.data?.non3d_test_failed}
        />
        <input
          type="hidden"
          name="non_3d"
          value={payment?.request?.data?.non_3d}
        />
        <input
          type="hidden"
          name="payment_amount"
          value={payment?.request?.data?.payment_amount}
        />
        <input
          type="hidden"
          name="payment_type"
          value={payment?.request?.data?.payment_type}
        />
        <input
          type="hidden"
          name="paytr_token"
          value={payment?.request?.data?.paytr_token}
        />

        <input
          type="hidden"
          name="test_mode"
          value={payment?.request?.data?.test_mode}
        />
        <input
          type="hidden"
          name="user_address"
          value={payment?.request?.data?.user_address}
        />
        <input
          type="hidden"
          name="user_basket"
          value={payment?.request?.data?.user_basket}
        />
        <input
          type="hidden"
          name="user_ip"
          value={payment?.request?.data?.user_ip}
        />
        <input
          type="hidden"
          name="user_name"
          value={payment?.request?.data?.user_name}
        />
        <input
          type="hidden"
          name="user_phone"
          value={payment?.request?.data?.user_phone}
        />
      </form>
      <form
        ref={packetFormRef}
        action="https://www.paytr.com/odeme"
        method="POST"
      >
        {/*<input type="text" name="cc_owner" value="PAYTR TEST" />
        <input type="hidden" name="card_number" value="9792030394440796" />
        <input type="hidden" name="expiry_month" value="12" />
        <input type="hidden" name="expiry_year" value="24" />
                <input type="hidden" name="cvv" value="000" />*/}
        <input
          type="hidden"
          name="cc_owner"
          value={buyPacket?.reservation?.holder_name}
        />
        <input
          type="hidden"
          name="card_number"
          value={buyPacket?.reservation?.card_number?.replace(/\s/g, '')}
        />
        <input
          type="hidden"
          name="expiry_month"
          value={buyPacket?.reservation?.expiration_month}
        />
        <input
          type="hidden"
          name="expiry_year"
          value={buyPacket?.reservation?.expiration_year}
        />
        <input type="hidden"
          name="cvv" value={buyPacket?.reservation?.cvc} />

        <input
          type="hidden"
          name="card_type"
          value={paymentPacket?.request?.data?.card_type}
        />
        <input
          type="hidden"
          name="currency"
          value={paymentPacket?.request?.data?.currency}
        />
        <input
          type="hidden"
          name="debug_on"
          value={paymentPacket?.request?.data?.debug_on}
        />
        <input
          type="hidden"
          name="email"
          value={paymentPacket?.request?.data?.email}
        />
        <input
          type="hidden"
          name="installment_count"
          value={paymentPacket?.request?.data?.installment_count}
        />
        <input
          type="hidden"
          name="lang"
          value={paymentPacket?.request?.data?.lang}
        />
        <input
          type="hidden"
          name="max_installment"
          value={paymentPacket?.request?.data?.max_installment}
        />
        <input
          type="hidden"
          name="merchant_fail_url"
          value={paymentPacket?.request?.data?.merchant_fail_url}
        />

        <input
          type="hidden"
          name="merchant_id"
          value={paymentPacket?.request?.data?.merchant_id}
        />
        <input
          type="hidden"
          name="merchant_oid"
          value={paymentPacket?.request?.data?.merchant_oid}
        />
        <input
          type="hidden"
          name="merchant_ok_url"
          value={paymentPacket?.request?.data?.merchant_ok_url}
        />
        <input
          type="hidden"
          name="no_installment"
          value={paymentPacket?.request?.data?.no_installment}
        />
        <input
          type="hidden"
          name="non3d_test_failed"
          value={paymentPacket?.request?.data?.non3d_test_failed}
        />
        <input
          type="hidden"
          name="non_3d"
          value={paymentPacket?.request?.data?.non_3d}
        />
        <input
          type="hidden"
          name="payment_amount"
          value={paymentPacket?.request?.data?.payment_amount}
        />
        <input
          type="hidden"
          name="payment_type"
          value={paymentPacket?.request?.data?.payment_type}
        />
        <input
          type="hidden"
          name="paytr_token"
          value={paymentPacket?.request?.data?.paytr_token}
        />

        <input
          type="hidden"
          name="test_mode"
          value={paymentPacket?.request?.data?.test_mode}
        />
        <input
          type="hidden"
          name="user_address"
          value={paymentPacket?.request?.data?.user_address}
        />
        <input
          type="hidden"
          name="user_basket"
          value={paymentPacket?.request?.data?.user_basket}
        />
        <input
          type="hidden"
          name="user_ip"
          value={paymentPacket?.request?.data?.user_ip}
        />
        <input
          type="hidden"
          name="user_name"
          value={paymentPacket?.request?.data?.user_name}
        />
        <input
          type="hidden"
          name="user_phone"
          value={paymentPacket?.request?.data?.user_phone}
        />
      </form>

      <form
        ref={groupFormRef}
        action="https://www.paytr.com/odeme"
        method="POST"
      >
        {/*<input type="text" name="cc_owner" value="PAYTR TEST" />
        <input type="hidden" name="card_number" value="9792030394440796" />
        <input type="hidden" name="expiry_month" value="12" />
        <input type="hidden" name="expiry_year" value="24" />
                <input type="hidden" name="cvv" value="000" />*/}
        <input
          type="hidden"
          name="cc_owner"
          value={buyGroupLesson?.reservation?.holder_name}
        />
        <input
          type="hidden"
          name="card_number"
          value={buyGroupLesson?.reservation?.card_number?.replace(/\s/g, '')}
        />
        <input
          type="hidden"
          name="expiry_month"
          value={buyGroupLesson?.reservation?.expiration_month}
        />
        <input
          type="hidden"
          name="expiry_year"
          value={buyGroupLesson?.reservation?.expiration_year}
        />
        <input type="hidden" name="cvv" value={buyGroupLesson?.reservation?.cvc} />

        <input
          type="hidden"
          name="card_type"
          value={paymentPacket?.request?.data?.card_type}
        />
        <input
          type="hidden"
          name="currency"
          value={paymentPacket?.request?.data?.currency}
        />
        <input
          type="hidden"
          name="debug_on"
          value={paymentPacket?.request?.data?.debug_on}
        />
        <input
          type="hidden"
          name="email"
          value={paymentPacket?.request?.data?.email}
        />
        <input
          type="hidden"
          name="installment_count"
          value={paymentPacket?.request?.data?.installment_count}
        />
        <input
          type="hidden"
          name="lang"
          value={paymentPacket?.request?.data?.lang}
        />
        <input
          type="hidden"
          name="max_installment"
          value={paymentPacket?.request?.data?.max_installment}
        />
        <input
          type="hidden"
          name="merchant_fail_url"
          value={paymentPacket?.request?.data?.merchant_fail_url}
        />
        <input
          type="hidden"
          name="merchant_id"
          value={paymentPacket?.request?.data?.merchant_id}
        />
        <input
          type="hidden"
          name="merchant_oid"
          value={paymentPacket?.request?.data?.merchant_oid}
        />
        <input
          type="hidden"
          name="merchant_ok_url"
          value={paymentPacket?.request?.data?.merchant_ok_url}
        />
        <input
          type="hidden"
          name="no_installment"
          value={paymentPacket?.request?.data?.no_installment}
        />
        <input
          type="hidden"
          name="non3d_test_failed"
          value={paymentPacket?.request?.data?.non3d_test_failed}
        />
        <input
          type="hidden"
          name="non_3d"
          value={paymentPacket?.request?.data?.non_3d}
        />
        <input
          type="hidden"
          name="payment_amount"
          value={paymentPacket?.request?.data?.payment_amount}
        />
        <input
          type="hidden"
          name="payment_type"
          value={paymentPacket?.request?.data?.payment_type}
        />
        <input
          type="hidden"
          name="paytr_token"
          value={paymentPacket?.request?.data?.paytr_token}
        />

        <input
          type="hidden"
          name="test_mode"
          value={paymentPacket?.request?.data?.test_mode}
        />
        <input
          type="hidden"
          name="user_address"
          value={paymentPacket?.request?.data?.user_address}
        />
        <input
          type="hidden"
          name="user_basket"
          value={paymentPacket?.request?.data?.user_basket}
        />
        <input
          type="hidden"
          name="user_ip"
          value={paymentPacket?.request?.data?.user_ip}
        />
        <input
          type="hidden"
          name="user_name"
          value={paymentPacket?.request?.data?.user_name}
        />
        <input
          type="hidden"
          name="user_phone"
          value={paymentPacket?.request?.data?.user_phone}
        />
      </form>
    </Container>
  );
}
const AddTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 20px;
`;
const AddHeader = styled.text`
  font-weight: 600;
`;
const AddDesc = styled.text``;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const InfoContainer = styled.div`
  width: 100%;
  background: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  @media ${device.sm} {
    width: 100%;
  }
`;
const DataContainer = styled.div`
  width: 100%;
  background: white;
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: #c6c6c6;
  padding: 5px 20px;
`;

const Text = styled.text`
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media ${device.sm} {
    font-size: 0.7rem;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  border-style: ${(p) => (p.borderDisable ? 'none' : 'solid')};
  border-color: rgba(144, 144, 144, 0.5);
  border-width: 0 0 1px 0;
  padding: 10px 5px;
`;
const ConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;
const BottomContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const AccordionItemWrapper = styled.div`
  border-radius: 20px;
  background: #fff;
  margin-bottom: 20px;
  width: 100%;
  ${space}

  .accordion-toggler {
    display: flex;
    background: ${(p) =>
    p.parent
      ? '#EFEFEF'
      : p.accordionBackground
        ? p.accordionBackground
        : '#F8F8F8'};
    justify-content: space-between;
    border-radius: ${(p) => (p.accordionRadius ? p.accordionRadius : '10px')};
    padding: 15px;
    margin-bottom: 10px;
  }
`;
const DarkTitle = styled.h4`
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.02em;
  margin-left: 5px;
  color: ${(p) => p.theme.colors.dark};
  @media ${device.sm} {
    font-size: 0.7rem;
  }
`;
const ReservationContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  pointer-events: ${(p) => (p.disable ? 'none' : 'initial')};
  opacity: ${(p) => (p.disable ? '0.7' : '1')};
`;
const Hours = styled.div`
  display: flex;
  width: 586px;
  flex-wrap: wrap;
`;
const Hour = styled.div`
  display: flex;
  flex-shrink: 0;
  width: auto;
  border-radius: 10px;
  margin: 5px;
  padding: 5px;
  border-style: solid;
  border-width: 1px;
  border-color: ${(p) => (p.selected ? 'var(--blue)' : '#c6c6c6')};
  cursor: pointer;
`;
const DateContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;
