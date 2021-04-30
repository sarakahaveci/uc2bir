import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { device } from 'utils';
import { Button, Accordion, Material } from 'components';
import Svg from 'components/statics/svg';
import { space } from 'styled-system';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setReservation, deleteSlot, addSlot, sendReservation } from 'actions';
export default function PaymentCard({ type, dateOption }) {
  const dispatch = useDispatch();
  const reservation = useSelector((state) => state.reservation);
  const reservationCalendar = useSelector((state) => state.reservationCalendar);
  const { userInfo } = useSelector((state) => state.userProfile.userInfo);
  const [toggleState, setToggleState] = useState(false);
  const wallet = useSelector((state) => state.userProfile.wallet);

  useEffect(() => {
    if (reservation?.data?.slot?.length > 0) {
      dispatch(
        setReservation({
          [`${type}_price`]: reservation?.data?.slot?.length * userInfo.price,
        })
      );
    } else {
      dispatch(
        setReservation({
          [[`${type}_price`]]: 0,
        })
      );
    }
  }, [reservation?.data?.slot]);

  useEffect(() => {
    switch (type) {
      case 'pt':
        setTotalAmountPT();
        break;
      case 'dt':
        setTotalAmountDT();
        break;
      default:
        break;
    }
  }, [reservation?.data?.[`${type}_price`], reservation?.data?.gym_price]);
  function setTotalAmountPT() {
    var ptPrice = reservation?.data?.pt_price || 0;
    var gymPrice = reservation?.data?.gym_price || 0;
    dispatch(
      setReservation({
        totals_amount: ptPrice + gymPrice,
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
  function selectPaymentType(type) {
    if (reservation?.data?.totals_amount > 0) {
      dispatch(setReservation({ payment_type: type }));
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
      guest: false,
      holder_name: reservation?.data?.holder_name,
      card_number: reservation?.data?.card_number,
      expiration_month: reservation?.data?.expiration_month,
      expiration_year: reservation?.data?.expiration_year,
      cvc: reservation?.data?.cvc,
      deposit_amount: reservation?.data?.deposit_amount,
      slot: reservation?.data?.slot,
    };

    dispatch(sendReservation('pt', removeEmpty(json), () => {}));
  }
  function sendPaymentDT() {
    var json = {
      dt_id: reservation?.data?.dt_id,
      payment_type: reservation?.data?.payment_type,
      is_contracts_accepted: true,
      session: reservation?.data?.session,
      location_id: reservation?.data?.location_id,
      guest: false,
      holder_name: reservation?.data?.holder_name,
      card_number: reservation?.data?.card_number,
      expiration_month: reservation?.data?.expiration_month,
      expiration_year: reservation?.data?.expiration_year,
      cvc: reservation?.data?.cvc,
      deposit_amount: reservation?.data?.deposit_amount,
      slot: reservation?.data?.slot,
    };

    dispatch(sendReservation('dt', removeEmpty(json), () => {}));
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
          <Material.MaterialDateField
            type="text"
            name="date"
            onChange={(e) => {
              dispatch(setReservation({ date: e.target.value }));
            }}
            defaultValue={reservation?.data?.date}
            settings
          />
          {reservation?.data?.date && (
            <>
              <AddHeader>Saat Seçiniz</AddHeader>
              <Hours>
                {(reservationCalendar?.data?.slice?.length > 0 &&
                  reservationCalendar?.data?.slice?.map((item, indx) => (
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
        {type === 'pt' && !reservation?.data?.payment_type && (
          <>
            <AddHeader>Misafir Ekle</AddHeader>
            <AddDesc>
              Dilersen istediğin bir arkadaşınla beraber derse gelebilirsin.
            </AddDesc>
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
      {type === 'dt' && (
        <InfoContainer>
          <DataContainer>
            <Info>
              <Text style={{ fontWeight: 800 }}>Dietisyen Ücreti</Text>
              <Text style={{ fontWeight: 800 }}>
                {reservation?.data?.dt_price}
              </Text>
            </Info>
          </DataContainer>
        </InfoContainer>
      )}

      <InfoContainer>
        <DataContainer>
          <Info borderDisable>
            <Accordion>
              <AccordionItemWrapper>
                <Accordion.Item defaultOpen={false}>
                  <Accordion.Toggle
                    onToggle={(state) => setToggleState(state)}
                    className="accordion-toggler"
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {/*miniIcon*/}
                      <DarkTitle>{'Rezervasyonlarınız'}</DarkTitle>
                    </div>
                    {toggleState ? <Svg.ArrowDownIcon /> : <Svg.ArrowUpIcon />}
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
                        {!reservation?.data?.payment_type && (
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
        {(type === 'pt' && (
          <AddTextContainer>
            <AddHeader>Ders Ekle</AddHeader>
            <AddDesc>Aynı eğitmen ve salondan daha fazla ders alın</AddDesc>
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
      <ConfirmContainer>
        <BottomContainer>
          <Text style={{ fontWeight: 800 }}>Toplam Ücret</Text>
          <Text color="#00B2A9" style={{ fontWeight: 800, fontSize: 30 }}>
            {reservation?.data?.totals_amount}
          </Text>
        </BottomContainer>
        {reservation?.data?.payment_type ? (
          <BottomContainer>
            <Button
              style={{ width: '100%', padding: '20px' }}
              className="blue"
              text="Ödeme Yap"
              onClick={() => {
                switch (type) {
                  case 'pt':
                    sendPaymentPT();
                    break;
                  case 'dt':
                    sendPaymentDT();
                    break;
                  default:
                    break;
                }
              }}
            />
          </BottomContainer>
        ) : (
          <>
            <BottomContainer>
              <Button
                style={{ width: '100%', padding: '20px' }}
                className="blue"
                text="Cüzdanımdan Öde"
                onClick={() => {
                  var wallet_balance = wallet?.data?.balance || 0;
                  var amount = reservation?.data?.totals_amount || 0;
                  var diff = wallet_balance - amount;
                  if (diff < 0) {
                    selectPaymentType('both');
                  } else {
                    selectPaymentType('wallet');
                  }
                }}
              />
            </BottomContainer>
            <BottomContainer style={{ margin: '5px' }}>
              <Button
                style={{ width: '100%', padding: '20px' }}
                className="blue"
                text="Kredi Kartından Öde"
                onClick={() => {
                  selectPaymentType('credit_card');
                }}
              />
            </BottomContainer>
          </>
        )}
      </ConfirmContainer>
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
