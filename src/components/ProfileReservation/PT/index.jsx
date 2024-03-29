import {
  MiniProfileCard,
  Material,
  WorkAreaCard,
  PaymentCard,
  Accordion,
  Svg,
  CreditCard,
} from 'components';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import { device } from 'utils';
import {
  setReservation,
  getUserBranchList,
  getPtWorkingHomePlace,
  deleteAllSlot,
  getPtReservationCalendar,
} from 'actions';
import { space } from 'styled-system';
import GoogleMap from 'components/GoogleMaps/GoogleMap';
import RadioGroup from '@material-ui/core/RadioGroup';
import { AwesomeIcon } from 'components';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const uri = `${process.env.REACT_APP_API_URL}/regions`;

const PT = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  //Local States
  const [toggleState, setToggleState] = useState(false);
  const [formData, setFormData] = useState({});
  const [city, setCity] = useState(false);
  const [town, setTown] = useState([]);
  const [gymListState, setGymListState] = useState([]);
  const [homeParkState, setHomeParkState] = useState([]);

  const [district, setDistrict] = useState([]);
  const [sessionTypes, setSessionTypes] = useState(undefined);
  //Redux States
  const { userInfo } = useSelector((state) => state.userProfile.userInfo);
  const wallet = useSelector((state) => state.userProfile.wallet);
  const reservation = useSelector((state) => state.reservation);
  const reservationCalendar = useSelector((state) => state.reservationCalendar);

  const { branches: branchList } = useSelector(
    (state) => state.userProfile.branch
  );
  const gymList = useSelector(
    (state) => state?.reservationCalendar?.data?.location?.gym
  );
  const homePlaces = useSelector(
    (state) => state?.reservationCalendar?.data?.location?.home_park
  );
  useEffect(() => {
    var items = userInfo.session.map((item) => ({
      name: item.title,
      id: item.type,
    }));
    if (false && reservation?.data?.isSelected) {
      //burası düzeltiflecek
      //if
    } else {
      setSessionTypes(items);
    }
    dispatch(getUserBranchList(userInfo.id));
    dispatch(getPtWorkingHomePlace(userInfo.id));
    // dispatch(getWallet());
    //dispatch(getTemplates()); HATA VARSA BURAYA Bİ BAK
    dispatch(setReservation({ pt_id: userInfo.id }));
  }, [userInfo]);
  useEffect(() => {
    if (!reservation?.data?.location_id) {
      setGymListState(gymList);
    }
  }, [gymList]);
  useEffect(() => {
    if (!reservation?.data?.location_id) {
      setHomeParkState(homePlaces);
    }
  }, [homePlaces]);
  useEffect(() => {
    /* if (reservation?.data?.isSelected && !reservation?.data?.session) {
      var result = reservationCalendar?.data?.slice
        ?.filter(
          (elm) =>
            elm?.date == reservation.data?.slot[0].date &&
            elm?.time == reservation.data?.slot[0].hour
        )[0]
        ?.session_types?.map((item) => ({
          name: item == 'gym' ? 'Spor Alanı' : item == 'online' ? 'Online' : item == 'home_park' ? 'Ev / Park' : null,
          id: item,
        }));
      setSessionTypes(result);
    }*/
  }, [reservationCalendar?.data?.slice]);
  useEffect(() => {
    // iF DATE OPTİON TRUE
    if (!reservation?.data?.isSelected) {
      dispatch(deleteAllSlot());
    } else {
      /*dispatch(
        getAreaForPT(
          userInfo.id,
          reservation.data?.slot?.[0].date,
          reservation.data?.slot?.[0].hour,
          reservation?.data?.branch_id,
          reservation.data?.session
        )
      );*/
    }
  }, [reservation?.data?.session]);

  useEffect(() => {
    if (reservation?.data?.location_id) {
      dispatch(
        getPtReservationCalendar(
          userInfo.id,
          reservation.data?.slot?.[0]?.date || reservation.data?.date,
          reservation.data?.slot?.[0]?.hour,
          reservation?.data?.branch_id,
          reservation?.data?.session,
          reservation?.data?.location_id
        )
      );
    }
  }, [reservation?.data?.location_id]); //YENİ
  useEffect(() => {
    if (reservation?.data?.isSelected) {
      if (reservation?.data?.branch_id && reservation?.data?.date) {
        dispatch(
          getPtReservationCalendar(
            userInfo.id,
            reservation.data?.slot?.[0]?.date,
            reservation.data?.slot?.[0]?.hour,
            reservation?.data?.branch_id,
            reservation.data?.session,
            reservation?.data?.location_id
          )
        );
      }
    } else {
      if (
        reservation?.data?.branch_id &&
        reservation?.data?.session &&
        reservation?.data?.date
      ) {
        dispatch(
          getPtReservationCalendar(
            userInfo.id,
            reservation.data?.date,
            null,
            reservation?.data?.branch_id,
            reservation.data?.session,
            reservation?.data?.location_id
          )
        );
      }
    }
  }, [
    reservation?.data?.branch_id,
    reservation?.data?.session,
    reservation?.data?.date,
  ]);
  useEffect(() => {
    if (!city) {
      axios
        .post(uri)
        .then((res) => res.data)
        .then((data) => data.data)
        .then((data) => {
          const new_data = data.map((val) => {
            return {
              id: val.id,
              val: val.id,
              name: val.name,
            };
          });
          return setCity(new_data);
        })
        .catch((err) =>
          toast.error(err, {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        );
    }
  }, [city]);

  function WorkAreaSelect() {
    switch (reservation?.data?.session) {
      case 'gym':
        return (
          <GymWrapper
            disable={
              reservation?.data?.slot?.length > 0 &&
              !reservation?.data?.isSelected
            }
          >
            <Text color="#9B9B9B">{t('Choose Sports Field')}:</Text>
            <RadioGroup
              row
              aria-label="workArea"
              name="workArea"
              defaultValue="0l"
            >
              {gymListState?.map((item) => (
                <>
                  <CardGroup style={{ padding: 0 }}>
                    <WorkAreaCard
                      image={item.photo}
                      stars={item.rating}
                      capacity={item.capacity}
                      title={item.title}
                      area_measure={item.area_measure}
                      city={item.city}
                      district={item.district}
                      price={item.price}
                    />

                    {reservation?.data?.location_id === item.id ? (
                      <RadioButtonCheckedIcon
                        style={{ marginLeft: '5px', cursor: 'pointer' }}
                      />
                    ) : (
                      <RadioButtonUncheckedIcon
                        onClick={() => {
                          dispatch(
                            setReservation({
                              location_id: item.id,
                              gym_price: item.price,
                            })
                          );
                        }}
                        style={{ marginLeft: '5px', cursor: 'pointer' }}
                      />
                    )}
                  </CardGroup>
                </>
              )) || <text>{t('There is no suitable sports area')}</text>}
            </RadioGroup>
          </GymWrapper>
        );
      case 'home_park':
        return (
          <GymWrapper
            disable={
              reservation?.data?.slot?.length > 0 &&
              !reservation?.data?.isSelected
            }
          >
            <Text color="#9B9B9B">{t('Select Home/Park')}:</Text>
            <RadioGroup
              row
              aria-label="workArea"
              name="workArea"
              defaultValue="0l"
            >
              {homeParkState?.map((item, i) => (
                <div key={i} style={{ display: 'flex' }}>
                  <Accordion>
                    <AccordionItemWrapper>
                      <Accordion.Item defaultOpen={false}>
                        <Accordion.Toggle
                          onToggle={(state) => setToggleState(state)}
                          className="accordion-toggler"
                        >
                          <Svg.SessionType.Park />
                          <ParkInfo>
                            <ParkHeader>{item.title}</ParkHeader>
                            <ParkAdress>
                              {item.town +
                                ' ' +
                                item.district +
                                ' ' +
                                item.city}
                            </ParkAdress>
                          </ParkInfo>
                          {toggleState ? (
                            <Svg.ArrowDownIcon />
                          ) : (
                            <Svg.ArrowUpIcon />
                          )}
                        </Accordion.Toggle>
                        <Accordion.Collapse>
                          <MapWrapper>
                            <GoogleMap
                              locationFromUser={{
                                lat: item.lat,
                                lng: item.lng,
                              }}
                              disabled
                            />
                          </MapWrapper>
                        </Accordion.Collapse>
                      </Accordion.Item>
                    </AccordionItemWrapper>
                  </Accordion>
                  {reservation?.data?.location_id &&
                  reservation?.data?.location_id === item.location_id ? (
                    <RadioButtonCheckedIcon
                      style={{ marginLeft: '5px', cursor: 'pointer' }}
                    />
                  ) : (
                    <RadioButtonUncheckedIcon
                      onClick={() => {
                        dispatch(
                          setReservation({
                            location_id: item.location_id,
                            gym_price: item.price,
                          })
                        );
                      }}
                      style={{ marginLeft: '5px', cursor: 'pointer' }}
                    />
                  )}
                </div>
              )) || <text>{t('There is no suitable area')}</text>}
            </RadioGroup>
          </GymWrapper>
        );
      case 'online':
        return <></>;
      case 'b':
        return (
          <>
            <>
              <Material.SimpleSelect
                required
                label={t('Select City')}
                items={city}
                name="city"
                changeValue={formData?.city || ''}
                onChange={(e) => {
                  axios
                    .post(uri, { city_id: e.target.value })
                    .then((res) => res.data)
                    .then((data) => data.data)
                    .then((data) => {
                      const new_data = data.map((val) => {
                        return {
                          id: val.id,
                          val: val.id,
                          name: val.name,
                        };
                      });
                      return setTown(new_data);
                    });
                  return setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
              <Material.SimpleSelect
                required
                label={town ? t('Select District') : t('Select City First')}
                items={town ? town : []}
                name="district"
                changeValue={formData?.district || ''}
                onChange={(e) => {
                  axios
                    .post(uri, { district_id: e.target.value })
                    .then((res) => res.data)
                    .then((data) => data.data)
                    .then((data) => {
                      const new_data = data.map((val) => {
                        return {
                          id: val.id,
                          val: val.id,
                          name: val.name,
                        };
                      });
                      return setDistrict(new_data);
                    });
                  return setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
              <Material.SimpleSelect
                required
                label={
                  district
                    ? t('Select Neighborhood')
                    : t('Select District First')
                }
                items={district ? district : []}
                name="town"
                changeValue={formData?.town || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Material.TextField
                required
                label={t('Full address')}
                name="address_detail"
                icon={AwesomeIcon.Map}
                changeValue={formData.address_detail}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </>
          </>
        );
      default:
        return <></>;
    }
  }

  function _renderLeftArea() {
    switch (reservation?.data?.payment_type) {
      case 'wallet':
      case 'both':
        var wallet_balance = wallet?.data?.balance || 0;
        var amount = reservation?.data?.totals_amount || 0;
        var diff = wallet_balance - amount;
        return (
          <>
            <InfoContainer>
              <DataContainer>
                <Info>
                  <Text style={{ fontWeight: 800 }}>{t('my wallet')}</Text>
                  <Text style={{ fontWeight: 800 }}>{wallet_balance}</Text>
                </Info>
                <Info>
                  <Text style={{ fontWeight: 800 }}>
                    {t('Transaction amount')}
                  </Text>
                  <Text style={{ fontWeight: 800 }}>{amount}</Text>
                </Info>
                <Info>
                  <Text style={{ fontWeight: 800 }}>
                    {t('Remaining amount')}
                  </Text>
                  <Text
                    style={{
                      fontWeight: 800,
                      color: diff < 0 ? 'red' : 'black',
                    }}
                  >
                    {diff}
                  </Text>
                </Info>
              </DataContainer>
              <div style={{ padding: '10px' }}>
                <text>
                  Yapacağınız işlem sonrası cüdanınızda kalacak olan toplam
                  tutar {diff} TL’dir
                </text>
              </div>
            </InfoContainer>
            {diff < 0 && (
              <CreditCard
                defaultCardName={reservation?.data?.holder_name}
                defaultCardNo={reservation?.data?.card_number}
                defaultSKT={
                  reservation?.data?.expiration_month +
                  '/' +
                  reservation?.data?.expiration_year
                }
                defaultCVV={reservation?.data?.cvc}
                onCardName={(val) => {
                  dispatch(setReservation({ holder_name: val }));
                }}
                onCardNo={(val) => {
                  dispatch(setReservation({ card_number: val }));
                }}
                onSKT={(month, year) => {
                  dispatch(
                    setReservation({
                      expiration_month: month,
                      expiration_year: year,
                    })
                  );
                }}
                onCVV={(val) => {
                  dispatch(setReservation({ cvc: val }));
                }}
              />
            )}
          </>
        );
      case 'credit_card':
        return (
          <CreditCard
            defaultCardName={reservation?.data?.holder_name}
            defaultCardNo={reservation?.data?.card_number}
            defaultSKT={
              reservation?.data?.expiration_month +
              '/' +
              reservation?.data?.expiration_year
            }
            defaultCVV={reservation?.data?.cvc}
            onCardName={(val) => {
              dispatch(setReservation({ holder_name: val }));
            }}
            onCardNo={(val) => {
              dispatch(setReservation({ card_number: val }));
            }}
            onSKT={(month, year) => {
              dispatch(
                setReservation({
                  expiration_month: month,
                  expiration_year: year,
                })
              );
            }}
            onCVV={(val) => {
              dispatch(setReservation({ cvc: val }));
            }}
          />
        );

      default:
        return (
          <>
            <MiniProfileCard
              photo={userInfo.photo}
              name={userInfo.name}
              rating={userInfo.rating}
              type_id={userInfo.type_id}
              price={userInfo.price}
            />
            <SelectionContainer>
              {/*reservation?.data?.isSelected && (
                <InputContainer>
                  <Text color="#9B9B9B">{'Tarih ve Saat Seçiminiz'}</Text>
                  <Material.TextField
                    type="text"
                    defaultValue={
                      reservation?.data?.date +
                      ' ' +
                      reservation?.data?.slot?.[0].hour
                    }
                    inputProps={{
                      readOnly: true,
                    }}
                  />
                </InputContainer>
                  )*/}
              <InputContainer disable={reservation?.data?.isSelected}>
                <Text color="#9B9B9B">{t('Select Branch')}:</Text>
                <Material.SimpleSelect
                  items={
                    reservation?.data?.session == 'online'
                      ? branchList.branches?.filter((item) => item.id !== 35)
                      : branchList.branches
                  }
                  name="branch"
                  defaultValue={reservation?.data?.branch_id}
                  onChange={(e) =>
                    dispatch(setReservation({ branch_id: e.target.value }))
                  }
                />
              </InputContainer>
              <InputContainer>
                <Text color="#9B9B9B">{t('Select Session Types')}:</Text>
                {(sessionTypes && sessionTypes.length > 0 && (
                  <Material.SimpleSelect
                    items={
                      reservation?.data?.branch_id == 35
                        ? sessionTypes?.filter((item) => item.id !== 'online')
                        : sessionTypes
                    }
                    name="sessionType"
                    defaultValue={reservation?.data?.session}
                    onChange={(e) =>
                      dispatch(
                        setReservation({
                          session: e.target.value,
                          location_id: undefined,
                          gym_price: 0,
                        })
                      )
                    }
                  />
                )) || (
                  <text>
                    {t(
                      'The user could not find the appropriate Session Type for these conditions'
                    )}
                  </text>
                )}
              </InputContainer>

              <WorkAreaSelect />
            </SelectionContainer>
          </>
        );
    }
  }

  return (
    <Container>
      <LeftWrapper>{_renderLeftArea()}</LeftWrapper>
      <RightWrapper>
        <PaymentCard
          disabledPayment={
            (reservation?.data?.session == 'home_park' ||
              reservation?.data?.session == 'gym') &&
            !reservation?.data?.location_id
          }
          type="pt"
          dateOption={!reservation?.data?.isSelected}
        />
      </RightWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  @media ${device.sm} {
    flex-direction: column;
  }
`;
const LeftWrapper = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  @media ${device.sm} {
    width: 100%;
  }
`;
const RightWrapper = styled.div`
  width: 50%;
  @media ${device.sm} {
    width: 100%;
  }
`;
const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  border-top-style: solid;
  border-width: 1px;
  border-color: rgba(144, 144, 144, 0.1);
  padding: 30px;
  @media ${device.sm} {
    padding: 0;
  }
`;
const Text = styled.text`
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media ${device.sm} {
    font-size: 0.7rem;
  }
`;
const CardGroup = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  margin-top: 10px;
  padding-right: 95px;
  position: relative;
  justify-content: center;
  align-items: center;
`;

//

const InfoContainer = styled.div`
  margin-top: 40px;
  width: 586px;
  background: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
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

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  border-style: ${(p) => (p.borderDisable ? 'none' : 'solid')};
  border-color: rgba(144, 144, 144, 0.5);
  border-width: 0 0 1px 0;
  padding: 10px 5px;
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

const ParkInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
const ParkHeader = styled.text`
  font-weight: 600;
  font-size: 1.1rem;
`;
const ParkAdress = styled.text`
  font-weight: 300;
  font-size: 1rem;
`;

const MapWrapper = styled.div`
  width: 80%;
  border-radius: 30px;
  overflow: hidden;
`;

const InputContainer = styled.div`
  pointer-events: ${(p) => (p.disable ? 'none' : 'initial')};
  opacity: ${(p) => (p.disable ? '0.7' : '1')};
  margin-bottom: 20px;
`;
const GymWrapper = styled.div`
  pointer-events: ${(p) => (p.disable ? 'none' : 'initial')};
  opacity: ${(p) => (p.disable ? '0.7' : '1')};
`;
export default PT;
