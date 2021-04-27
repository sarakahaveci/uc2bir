import {
  MiniProfileCard,
  Material,
  PaymentCard,
  MultiContract,
  ClinicAccordion,
} from 'components';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { device } from 'utils';
import { Modal } from 'react-bootstrap';
import {
  setReservation,
  getDietitianClinics,
  getDtReservationCalendar,
  getStaticPage,
} from 'actions';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioGroup from '@material-ui/core/RadioGroup';

import { getWallet } from 'actions/userProfileActions/walletActions';

const dateOption = true;

const Dietitian = () => {
  const dispatch = useDispatch();
  //Local States
  const [sessionTypes, setSessionTypes] = useState(undefined);
  const [openModal, setOpenModal] = useState(false);
  //Redux States
  const { userInfo } = useSelector((state) => state.userProfile.userInfo);
  const wallet = useSelector((state) => state.userProfile.wallet);
  const staticPages = useSelector((state) => state.staticPages);
  const reservation = useSelector((state) => state.reservation);
  const clinics = useSelector(
    (state) => state?.userProfile?.dietitianClinic?.clinics?.clinic
  );

  useEffect(() => {
    var items = userInfo.session.map((item) => ({
      name: item.title,
      id: item.type,
    }));
    setSessionTypes([...items]);
    dispatch(getDietitianClinics(userInfo.id));
    dispatch(getWallet());
    dispatch(setReservation({ dt_id: userInfo.id }));
    dispatch(getStaticPage('uye-mesafeli-hizmet-sozlesmesi'));
    dispatch(getStaticPage('uye-on-bilgilendirme-formu'));
  }, [userInfo]);

  useEffect(() => {
    if (reservation?.data?.session && reservation?.data?.date) {
      dispatch(
        getDtReservationCalendar(
          userInfo.id,
          reservation.data?.date,
          null,
          reservation.data?.session
        )
      );
    }
  }, [reservation?.data?.session, reservation?.data?.date]);
  function WorkAreaSelect() {
    if (reservation?.data.session == 'clinic') {
      return (
        <GymWrapper disable={reservation?.data?.slot?.length > 0}>
          <Text color="#9B9B9B">{'Klinik Seçiniz:'}</Text>
          <RadioGroup
            row
            aria-label="workArea"
            name="workArea"
            defaultValue="0l"
          >
            {clinics?.map((item, i) => (
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
                  address={item.town + ' ' + item.district + ' ' + item.city}
                />
                <RadioWrapper>
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
                </RadioWrapper>
              </div>
            )) || null}
          </RadioGroup>
        </GymWrapper>
      );
    } else {
      return <></>;
    }
  }
  function CreditCard() {
    return (
      <>
        <InfoContainer>
          <DataContainer>
            <Info borderDisable>
              <Text style={{ fontWeight: 800 }}>Kart Bilgileri</Text>
            </Info>

            <Material.TextField
              label="Kart Üzerindeki İsim"
              type="text"
              name="holder_name"
              defaultValue={reservation?.data?.holder_name}
              onBlur={(e) => {
                dispatch(setReservation({ holder_name: e.target.value }));
              }}
            />

            <Material.TextField
              mask="9999 9999 9999 9999"
              label="Kart No Giriniz"
              type="text"
              name="card_number"
              defaultValue={reservation?.data?.card_number}
              onBlur={(e) => {
                dispatch(setReservation({ card_number: e.target.value }));
              }}
            />
            <Info borderDisable>
              <Material.TextField
                label="SKT"
                type="text"
                name="skt"
                mask="99/9999"
                defaultValue={
                  reservation?.data?.expiration_month +
                  '/' +
                  reservation?.data?.expiration_year
                }
                onBlur={(e) => {
                  var sktArr = e.target.value.split('/');
                  dispatch(
                    setReservation({
                      expiration_month: sktArr[0],
                      expiration_year: sktArr[1],
                    })
                  );
                }}
              />
              <Material.TextField
                mask="999"
                label="CVV"
                type="text"
                name="cvv"
                defaultValue={reservation?.data?.cvc}
                onBlur={(e) => {
                  dispatch(setReservation({ cvc: e.target.value }));
                }}
              />
            </Info>
            {/**<Material.TextField
              label="Yükelenecek Tutarı Giriniz"
              type="text"
              name="cvv"
            /> */}
            <Material.TextField
              label="Yüklenecek Tutarı Giriniz"
              type="number"
              name="deposit_amount"
              defaultValue={reservation?.data?.deposit_amount}
              onBlur={(e) => {
                dispatch(setReservation({ deposit_amount: e.target.value }));
              }}
            />
          </DataContainer>
          <div style={{ padding: '10px' }}>
            <text>
              Güvenliğiniz sebebi ile bu işleminiz 3D secure ile
              gerçekleştirilecektir.
            </text>
          </div>
          <div style={{ padding: '10px' }}>
            <Material.CheckBox
              checked={reservation?.data?.is_contracts_accepted}
              onChange={() => {
                if (reservation?.data.is_contracts_accepted) {
                  dispatch(setReservation({ is_contracts_accepted: false }));
                } else {
                  setOpenModal(true);
                }
              }}
              label={
                <div>
                  <span className="underline-text" onClick={() => {}}>
                    Ön Bilgilendirme Koşulları’nı ve Mesafeli Satış Sözleşmesini
                    okudum, onaylıyorum.
                  </span>
                </div>
              }
            />
          </div>
        </InfoContainer>
      </>
    );
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
                  <Text style={{ fontWeight: 800 }}>Cüzdanım</Text>
                  <Text style={{ fontWeight: 800 }}>{wallet_balance}</Text>
                </Info>
                <Info>
                  <Text style={{ fontWeight: 800 }}>İşlem Tutarı</Text>
                  <Text style={{ fontWeight: 800 }}>{amount}</Text>
                </Info>
                <Info>
                  <Text style={{ fontWeight: 800 }}>Kalan Tutar</Text>
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
                  tutar {reservation?.data?.totals_amount} TL’dir
                </text>
              </div>
            </InfoContainer>
            {diff < 0 && <CreditCard />}
          </>
        );
      case 'credit_card':
        return <CreditCard />;

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
              {!dateOption && (
                <InputContainer>
                  <Text color="#9B9B9B">{'Tarih ve Saat Seçiminiz'}</Text>
                  <Material.TextField
                    type="text"
                    defaultValue="04.08.2021 - 10:00"
                    inputProps={{
                      readOnly: true,
                    }}
                  />
                </InputContainer>
              )}

              <InputContainer>
                <Text color="#9B9B9B">{'Oturum Türü Seçiniz:'}</Text>
                <Material.SimpleSelect
                  items={sessionTypes}
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

  return (
    <Container>
      <LeftWrapper>{_renderLeftArea()}</LeftWrapper>
      <RightWrapper>
        <PaymentCard type="dt" dateOption={dateOption} />
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
  );
};
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
  margin-bottom: 20px;
`;
const GymWrapper = styled.div`
  pointer-events: ${(p) => (p.disable ? 'none' : 'initial')};
  opacity: ${(p) => (p.disable ? '0.7' : '1')};
`;
const RadioWrapper = styled.div`
  margin-top: 20px;
`;
export default Dietitian;
