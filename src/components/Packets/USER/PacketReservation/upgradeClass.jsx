import React, { useEffect } from 'react';
import styled, { css } from 'styled-components/macro';
import avatar1 from '../../../../assets/slider/04.jpg';
import avatar3 from '../../../../assets/slider/05.jpg';
import avatar4 from '../../../../assets/slider/p1.jpg';
import avatar5 from '../../../../assets/slider/p2.jpg';
import ReactHtmlParser from 'react-html-parser';
import { decode } from 'html-entities';
import { Button, Svg, PaymentCard, CreditCard } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { getUpdatePackage, setPacketReservation } from 'actions';
import { getWallet } from 'actions/userProfileActions/walletActions';
import { useHistory } from 'react-router-dom';

import { device } from 'utils';
const UpgradeClass = ({ setField = () => { } /* globalState */ }) => {
  const dispatch = useDispatch();
  const packet = useSelector((state) => state.buyPacket);
  const wallet = useSelector((state) => state.userProfile.wallet);
  const reservation = useSelector((state) => state.reservation);
  let history = useHistory();

  useEffect(() => {
    dispatch(getWallet());
    dispatch(getUpdatePackage(reservation?.data?.packetInfo?.package_id, packet?.reservation?.level));

  }, []);
  useEffect(() => {
    dispatch(
      setPacketReservation({
        package_uuid: reservation?.data?.packetInfo?.package_uuid,
        totals_amount:(packet?.data?.package?.price || 0) - (packet?.data?.purchased_package?.price || 0)
      })
    );
  }, [packet?.data?.package?.price]);
  useEffect(() => {
    dispatch(getUpdatePackage(reservation?.data?.packetInfo?.package_id, packet?.reservation?.level));
    
  }, [packet?.reservation?.level])
  function onChangeLevel(level) {
    dispatch(
      setPacketReservation({
        level: level,
      })
    );
  }

  function _renderLeftArea() {
    switch (packet?.reservation?.payment_type) {
      case 'wallet':
      case 'both':
        var wallet_balance = wallet?.data?.balance || 0;
        var amount = packet?.reservation?.totals_amount || 0;
        var diff = wallet_balance - amount;
        return (
          <div style={{ padding: '0 20px' }}>
            <InfoContainer_Wallet>
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
                  tutar {diff} TL’dir
                </text>
              </div>
            </InfoContainer_Wallet>
            {diff < 0 && (
              <CreditCard
                defaultCardName={packet?.reservation?.holder_name}
                defaultCardNo={packet?.reservation?.card_number}
                defaultSKT={
                  packet?.reservation?.expiration_month +
                  '/' +
                  packet?.reservation?.expiration_year
                }
                defaultCVV={packet?.reservation?.cvc}
                onCardName={(val) => {
                  dispatch(setPacketReservation({ holder_name: val }));
                }}
                onCardNo={(val) => {
                  dispatch(setPacketReservation({ card_number: val }));
                }}
                onSKT={(month, year) => {
                  dispatch(
                    setPacketReservation({
                      expiration_month: month,
                      expiration_year: year,
                    })
                  );
                }}
                onCVV={(val) => {
                  dispatch(setPacketReservation({ cvc: val }));
                }}
              />
            )}
          </div>
        );
      case 'credit_card':
        return (
          <div style={{ padding: '0 20px' }}>
            <CreditCard
              defaultCardName={packet?.reservation?.holder_name}
              defaultCardNo={packet?.reservation?.card_number}
              defaultSKT={
                packet?.reservation?.expiration_month +
                '/' +
                packet?.reservation?.expiration_year
              }
              defaultCVV={packet?.reservation?.cvc}
              onCardName={(val) => {
                dispatch(setPacketReservation({ holder_name: val }));
              }}
              onCardNo={(val) => {
                dispatch(setPacketReservation({ card_number: val }));
              }}
              onSKT={(month, year) => {
                dispatch(
                  setPacketReservation({
                    expiration_month: month,
                    expiration_year: year,
                  })
                );
              }}
              onCVV={(val) => {
                dispatch(setPacketReservation({ cvc: val }));
              }}
            />
          </div>
        );

      default:
        return (
          <>
            <SideContainer>
              <Image src={packet?.data?.package?.photo}></Image>
              <InfoContainer>
                <HeaderText>{packet?.data?.package?.name}</HeaderText>
                <BigSeperator />
                <SubInfo>
                  <Svg.FitnessMediumIcon></Svg.FitnessMediumIcon>
                  <text style={{ margin: '0 5px' }}>
                    {packet?.data?.package?.branch}
                  </text>
                  <Svg.ClockMediumIcon></Svg.ClockMediumIcon>
                  <text style={{ margin: '0 5px' }}>
                    {packet?.data?.package?.lesson_amount} Ders
                  </text>
                </SubInfo>
                <LabelText>İçerik</LabelText>
                <Seperator />

                <DescText>
                  {ReactHtmlParser(decode(packet?.data?.package?.detail))}
                </DescText>
              </InfoContainer>
            </SideContainer>
          </>
        );
    }
  }

  return (
    <>
      <Main>
        <div style={{}}>
          <BackLink
            onClick={() => {
              packet?.reservation?.payment_type
                ? dispatch(setPacketReservation({ payment_type: undefined }))
                : setField('main');
            }}
          >
            <Svg.ArrowLeftIcon />

            {packet?.reservation?.payment_type ? (
              <span>Onayla</span>
            ) : (
              <span>Paket Detayı</span>
            )}
          </BackLink>
        </div>
        <Container>
          {_renderLeftArea()}
          <SideContainer>
            <TrainerGroupContainer>
              <TrainerGroupWrapper>
                <div>
                  <LabelText>Seviyenizi Seçiniz </LabelText>
                  <Seperator></Seperator>
                  <LevelContainer>
                    <LevelCircle
                      onClick={() => {
                        onChangeLevel('A');
                      }}
                      enable={packet?.reservation?.level == 'A'}
                    >
                      A
                    </LevelCircle>
                    <Line />
                    <LevelCircle
                      onClick={() => {
                        onChangeLevel('B');
                      }}
                      enable={packet?.reservation?.level == 'B' || packet?.reservation?.level == 'A'}
                    >
                      B
                    </LevelCircle>
                    <Line />

                    <LevelCircle
                      onClick={() => {
                        onChangeLevel('C');
                      }}
                      enable={packet?.reservation?.level == 'A' || packet?.reservation?.level == 'B' || packet?.reservation?.level == 'C'}
                    >
                      C
                    </LevelCircle>
                  </LevelContainer>
                </div>
                <BottomContainer>
                  <PtIconsContainer>
                    <PtIcon src={avatar1} />
                    <PtIcon src={avatar3} />
                    <PtIcon src={avatar4} />
                    <PtIcon src={avatar5} />
                    <MoreIcon>68+</MoreIcon>
                  </PtIconsContainer>
                  <Button
                    blueborder
                    text="Eğitmenleri Gör"
                    fontSize="11pt"
                    color="blue"
                    onClick={() => {
                      history.push('/find?type=pt');
                    }}
                  />
                </BottomContainer>
              </TrainerGroupWrapper>
            </TrainerGroupContainer>
            <PaymentCard type="upgrade_packet"></PaymentCard>
          </SideContainer>
        </Container>
      </Main>
      {/* <form ref={formRef} action="https://www.paytr.com/odeme" method="POST">
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
          <input type="hidden" name="cvv" value={reservation?.data?.cvc} />
  
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
        </form> */}
    </>
  );
};
const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 1200px;
  justify-content: space-between;
`;
const SideContainer = styled.div`
  margin-top: 30px;
  width: 48%;
`;
const Image = styled.img`
  width: 100%;
  border-radius: 30px;
`;
const InfoContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 3;
  min-height: 300px;
  border-radius: 30px;
  background: white;
  margin: -50px 0;
  padding: 40px;
`;

const HeaderText = styled.text`
  font-size: 26px;
  font-weight: bold;
`;

const LabelText = styled.text`
  font-size: 18px;
  font-weight: bold;
  color: var(--blue);
`;
const DescText = styled.div`
  font-size: 18px;
`;
const Seperator = styled.div`
  width: 60px;
  border-bottom-style: solid;
  border-color: var(--blue);
  border-width: 3px;
  margin-bottom: 15px;
`;
const TrainerGroupContainer = styled.div`
  width: 100%;
  background: #f8f8f8;
  height: 350px;
  border-radius: 30px;
  padding: 20px;
`;
const TrainerGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: white;
  height: 100%;
  border-radius: 30px;
  padding: 30px;
  justify-content: space-between;
`;
const LevelContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LevelCircle = styled.div`
  cursor: pointer;
  width: 80px;
  height: 80px;
  border-radius: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  ${(p) =>
    p.enable
      ? css`
          background: var(--blue);
          color: white;
        `
      : css`
          background: white;
          border-style: solid;
          border-width: 1px;
          border-color: #d3d3d3;
          color: gray;
        `}
`;
const Line = styled.div`
  flex-grow: 1;
  background: #d3d3d3;
  height: 1px;
  margin: 7px;
`;
const BottomContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const PtIconsContainer = styled.div`
  width: 50%;
  display: flex;
`;
const PtIcon = styled.img`
  width: 45px;
  height: 45px;
  margin: 0 -8px;
  border-radius: 45px;
  object-fit: cover;
`;
const MoreIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 16px;
  font-weight: bold;
  width: 45px;
  height: 45px;
  margin: 0 -8px;
  border-radius: 45px;
  background: var(--blue);
`;

const BigSeperator = styled(Seperator)`
  width: 100%;
  border-color: #e5e5e5;
  margin: 20px 0;
`;

const SubInfo = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
`;
export default UpgradeClass;
//
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
  font-weight: bold;
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
const InfoContainer_Wallet = styled.div`
  width: 586px;
  background: #f8f8f8;
  border-radius: 10px;
  @media ${device.sm} {
    width: 100%;
  }
`;
const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5% 0;
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
