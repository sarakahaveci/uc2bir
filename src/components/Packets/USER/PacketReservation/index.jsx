import {
  MiniProfileCard,
  Material,
  PaymentCard,
  Svg,
  MultiContract,
  TrainerCard,
  WorkAreaCard,
  Accordion,
  ClinicAccordion,
  CreditCard,
} from 'components';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import RadioGroup from '@material-ui/core/RadioGroup';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import GoogleMap from 'components/GoogleMaps/GoogleMap';
import { space } from 'styled-system';
import { useTranslation } from 'react-i18next';
import { device } from 'utils';
import { Modal } from 'react-bootstrap';
import {
  setReservation,

  //getTemplates,
  getPacketPtReservationCalendar,
  getPacketDtReservationCalendar,
  getDietitianClinics,
  deleteAllSlot,
  clearReservation,
} from 'actions';

import PtSelection from './ptSelection';
import UpgradeClass from './upgradeClass';

const PacketReservation = ({ setPage, setBannerActive }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  //Local States
  const [clinicState, setClinicState] = useState([]);

  const [toggleState, setToggleState] = useState(false);
  const clinics = useSelector(
    (state) => state?.reservationCalendar?.data?.location?.clinic
  );

  const gymList = useSelector(
    (state) => state?.reservationCalendar?.data?.location?.gym
  );
  const homePlaces = useSelector(
    (state) => state?.reservationCalendar?.data?.location?.home_park
  );
  const [openModal, setOpenModal] = useState(false);
  const [field, setField] = useState('main');
  const [globalState, setGlobalState] = useState(null);

  //Redux States
  const { userInfo } = useSelector((state) => state.userProfile.userInfo);
  const wallet = useSelector((state) => state.userProfile.wallet);
  const staticPages = useSelector((state) => state.staticPages);
  const reservation = useSelector((state) => state.reservation);
  const [gymListState, setGymListState] = useState([]);
  const [homeParkState, setHomeParkState] = useState([]);

  const { type } = useSelector((state) => state.reservation?.data?.packetInfo);

  useEffect(() => {
    setBannerActive(false);
    return () => {
      dispatch(clearReservation());
    };
  }, []);
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
    if (!reservation?.data?.location_id && clinics !== undefined) {
      setClinicState(clinics);
    }
  }, [clinics]);

  useEffect(() => {
    if (reservation?.data.session == 'clinic') {
      dispatch(getDietitianClinics(reservation?.data?.packetInfo?.dt_id));
    }
  }, [reservation?.data.session]);
  useEffect(() => {
    // iF DATE OPTİON TRUE
    if (!reservation?.data?.isSelected) {
      dispatch(deleteAllSlot());
    } else {
      dispatch(
        getAreaForPT(
          userInfo.id,
          reservation.data?.date,
          null,
          reservation?.data?.branch_id,
          reservation.data?.session,
          1
        )
      );
    }
  }, [reservation?.data?.session]);

  useEffect(() => {
    if (type == 'pt') {
      if (
        reservation?.data?.session &&
        reservation?.data?.date &&
        reservation?.data?.selectedPt
      ) {
        dispatch(
          getPacketPtReservationCalendar(
            reservation.data.package_uuid,
            reservation?.data?.selectedPt?.id,
            reservation.data?.date,
            null,
            reservation.data?.session,
            reservation?.data?.location_id
          )
        );
      }
    } else if (type == 'dt') {
      dispatch(
        getPacketDtReservationCalendar(
          reservation.data.package_uuid,
          reservation.data?.date,
          null,
          reservation.data?.session,
          reservation?.data?.location_id
        )
      );
    }
  }, [
    reservation?.data?.branch_id,
    reservation?.data?.session,
    reservation?.data?.date,
    reservation?.data?.selectedPt,
    reservation?.data?.location_id,
  ]);

  function WorkAreaSelect() {
    switch (reservation?.data?.session) {
      case 'gym':
        return (
          <GymWrapper disable={reservation?.data?.slot?.length > 0}>
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
              ))}
              {!(gymListState?.length > 0) && (
                <text>{t('There is no suitable sports area')}</text>
              )}
            </RadioGroup>
          </GymWrapper>
        );
      case 'home_park':
        return (
          <GymWrapper disable={reservation?.data?.slot?.length > 0}>
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
                            location_id: item?.location_id,
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
      case 'clinic':
        return (
          <>
            <GymWrapper disable={reservation?.data?.slot?.length > 0}>
              <Text color="#9B9B9B">{t('Select Clinic')}:</Text>
              <RadioGroup
                row
                aria-label="workArea"
                name="workArea"
                defaultValue="0l"
              >
                {clinicState?.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      width: '100%',
                    }}
                  >
                    <ClinicAccordion
                      title={item.title}
                      lat={item?.lat}
                      lng={item?.lng}
                      address={
                        item.town + ' ' + item.district + ' ' + item.city
                      }
                    />
                    <RadioWrapper>
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
                                clinic_price: item.price,
                              })
                            );
                          }}
                          style={{ marginLeft: '5px', cursor: 'pointer' }}
                        />
                      )}
                    </RadioWrapper>
                  </div>
                )) || (
                  <text style={{ padding: '10px 0' }}>
                    {t('This user does not have available clinics')}
                  </text>
                )}
              </RadioGroup>
            </GymWrapper>
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
                  {t(
                    'The total amount that will remain in your wallet after the transaction is'
                  )}
                  {diff} TL
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
      case 'no_money':
        return (
          <div
            style={{
              display: 'flex',
              opacity: '.8',
              alignItems: 'center',
              marginTop: '63px',
              padding: '20px',
              borderStyle: 'solid',
              borderColor: 'var(--blue)',
              borderRadius: '5px',
              borderWidth: '1px',
            }}
          >
            <Svg.SmileyFaceIcon style={{ marginRight: '20px' }} />
            <text>
              {t(
                'When making a reservation from the package, you do not pay any fees other than extra services'
              )}
            </text>
          </div>
        );
      default:
        return (
          <>
            <MiniProfileCard
              photo={reservation?.data?.packetInfo?.photo}
              name={reservation?.data?.packetInfo?.name}
            />
            <SelectionContainer>
              {reservation?.data?.isSelected && (
                <InputContainer>
                  <Text color="#9B9B9B">
                    {t('Your Choice of Date and Time')}:
                  </Text>
                  <Material.TextField
                    type="text"
                    defaultValue={
                      reservation?.data?.date +
                      ' ' +
                      reservation?.data?.slot?.[0]
                    }
                    inputProps={{
                      readOnly: true,
                    }}
                  />
                </InputContainer>
              )}
              {type == 'pt' && (
                <InputContainer>
                  <Text color="#9B9B9B">{t('Select Trainer')}:</Text>
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setField('ptSelection');
                    }}
                  >
                    <div style={{ pointerEvents: 'none' }}>
                      <Material.SimpleSelect
                        name="pt"
                        label={
                          reservation?.data?.selectedPt?.name || t('choose')
                        }
                        onClick={() => {}}
                      />
                    </div>
                  </div>
                </InputContainer>
              )}
              {reservation?.data?.selectedPt && (
                <InputContainer>
                  <TrainerCard
                    image={reservation?.data?.selectedPt?.photo}
                    name={reservation?.data?.selectedPt?.name}
                    stars={reservation?.data?.rating}
                    category={reservation?.data?.selectedPt?.title}
                    address={
                      reservation?.data?.selectedPt?.addresses?.[0]?.district +
                      ' / ' +
                      reservation?.data?.selectedPt?.addresses?.[0]?.city
                    }
                    price={reservation?.data?.selectedPt?.price}
                    classification={
                      reservation?.data?.selectedPt?.classification
                    }
                  />
                </InputContainer>
              )}
              <InputContainer>
                <Text color="#9B9B9B">{t('Select Session Type')}:</Text>
                <Material.SimpleSelect
                  items={
                    type == 'pt'
                      ? [
                          { id: 'home_park', name: t('Home / Park') },
                          { id: 'gym', name: t('Gym') },
                          { id: 'online', name: 'Online' },
                        ]
                      : [
                          { id: 'clinic', name: t('clinic') },
                          { id: 'online', name: 'Online' },
                        ]
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
              </InputContainer>
              <WorkAreaSelect />
            </SelectionContainer>
          </>
        );
    }
  }

  switch (field) {
    case 'main':
      return (
        <Main>
          <BackLink onClick={() => setPage('Home')}>
            <Svg.ArrowLeftIcon />

            <span>{t('Make a Reservation')}</span>
          </BackLink>
          <Container>
            <LeftWrapper>{_renderLeftArea()}</LeftWrapper>
            <RightWrapper>
              <PaymentCard
                disabledPayment={
                  (reservation?.data?.session == 'home_park' ||
                    reservation?.data?.session == 'gym') &&
                  !reservation?.data?.location_id
                }
                type="packet"
                subType={type}
                dateOption={true}
              />
            </RightWrapper>
            <StyledModal show={openModal} onHide={() => setOpenModal(false)}>
              <MultiContract
                acceptKvkk={true}
                setAccept={() => {
                  dispatch(setReservation({ is_contracts_accepted: true }));
                }}
                setOpenModal={setOpenModal}
                confirmationData={staticPages.data}
                userTypeId={1}
              />
            </StyledModal>
          </Container>
        </Main>
      );
    case 'ptSelection':
      return (
        <PtSelection
          setGlobalState={setGlobalState}
          globalState={globalState}
          setField={setField}
        />
      );
    case 'upgradeClass':
      return (
        <>
          <UpgradeClass
            setGlobalState={setGlobalState}
            globalState={globalState}
            setField={setField}
          />
        </>
      );
    default:
      break;
  }
};
const Main = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const StyledModal = styled(Modal)`
  .modal-content {
    width: 600px;
    background-color: var(--white1);
    padding: 15px 30px;
    @media ${device.sm} {
      height: 70vh;
      width: 90vw;
      overflow: scroll;
    }
  }
`;
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

const InputContainer = styled.div`
  pointer-events: ${(p) => (p.disable ? 'none' : 'initial')};
  opacity: ${(p) => (p.disable ? '0.7' : '1')};
  margin-bottom: 20px;
`;

const BackLink = styled(Text)`
  display: flex;
  cursor: pointer;
  margin-bottom: 15px;

  svg {
    margin-top: 2px;
  }

  > span {
    margin-left: 10px;
    color: ${(p) => p.theme.colors.softDark};
    font-weight: 600;
    font-size: 1.2rem;
  }
`;
const GymWrapper = styled.div`
  pointer-events: ${(p) => (p.disable ? 'none' : 'initial')};
  opacity: ${(p) => (p.disable ? '0.7' : '1')};
`;
const MapWrapper = styled.div`
  width: 80%;
  border-radius: 30px;
  overflow: hidden;
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
const RadioWrapper = styled.div`
  margin-top: 20px;
`;
export default PacketReservation;
