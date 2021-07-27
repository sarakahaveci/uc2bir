import React, { useEffect } from 'react';
import styled, { css } from 'styled-components/macro';
import profileImg from '../../assets/banner/slider-item-1.png';
import avatar1 from '../../assets/slider/04.jpg';
import avatar3 from '../../assets/slider/05.jpg';
import avatar4 from '../../assets/slider/p1.jpg';
import avatar5 from '../../assets/slider/p2.jpg';
import ReactHtmlParser from 'react-html-parser';
import { decode } from 'html-entities';
import { Button, Svg, PaymentCard, CreditCard } from 'components';
import { Main } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { getPacketDetail, setPacketReservation } from 'actions';
import { getWallet } from 'actions/userProfileActions/walletActions';
import { USER } from '../../constants/userTypes'
import { device } from 'utils';
import { useHistory } from 'react-router-dom';
const BuyPacket = ({ match }) => {
  const dispatch = useDispatch();
  const packet = useSelector((state) => state.buyPacket);
  const userTypeId = useSelector((state) => state.auth?.user?.type_id);

  const wallet = useSelector((state) => state.userProfile.wallet);
  let history = useHistory();

  useEffect(() => {
    dispatch(getWallet());
    dispatch(getPacketDetail(match?.params?.type, match?.params?.id));
  }, []);
  useEffect(() => {
    dispatch(
      setPacketReservation({
        level:'C',
        totals_amount: packet?.data?.price_c ||packet?.data?.price ,
        id: match?.params?.id
      })
    );
  }, [packet?.data]);
  function onChangeLevel(level) {
    dispatch(setPacketReservation({ level: level }));
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
              <Image src={packet?.data?.photo}></Image>
              <InfoContainer>
                <HeaderText>{packet?.data?.name}</HeaderText>
                <TitleText>12 Günde 8 Kilo Verin!</TitleText>
                <BigSeperator />
                <SubInfo>
                  <Svg.FitnessMediumIcon></Svg.FitnessMediumIcon>
                  <text style={{ margin: '0 5px' }}>
                    {packet?.data?.branch}
                  </text>
                  <Svg.ClockMediumIcon></Svg.ClockMediumIcon>
                  <text style={{ margin: '0 5px' }}>
                    {packet?.data?.lesson_amount} Ders
                  </text>
                </SubInfo>
                <LabelText>İçerik</LabelText>
                <Seperator />

                <DescText>
                  {ReactHtmlParser(decode(packet?.data?.detail))}
                </DescText>
              </InfoContainer>
            </SideContainer>
          </>
        );
    }
  }

  return (
    <Main>
      <img src={profileImg} alt="" className="banner-image" />

      <div style={{ padding: '20px 17%' }}>
        <BackLink
          onClick={() => {
            packet?.reservation?.payment_type
              ? dispatch(setPacketReservation({ payment_type: undefined }))
              : history.push('/packets');
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
              {match?.params?.type == 'pt' && (
                <div>
                  <LabelText>Seviye Seçiniz </LabelText>
                  <Seperator></Seperator>
                  <LevelContainer>
                    <LevelCircle
                      onClick={() => {
                        onChangeLevel('A');
                        dispatch(setPacketReservation({
                          totals_amount: packet?.data?.price_a,
                        }))
                      }}
                      enable={packet?.reservation?.level == 'A'}
                    >
                      A
                  </LevelCircle>
                    <Line />
                    <LevelCircle
                      onClick={() => {
                        onChangeLevel('B');
                        dispatch(setPacketReservation({
                          totals_amount: packet?.data?.price_b,
                        }))
                      }}
                      enable={packet?.reservation?.level == 'B' || packet?.reservation?.level == 'A'}
                    >
                      B
                  </LevelCircle>
                    <Line />

                    <LevelCircle
                      onClick={() => {
                        onChangeLevel('C');
                        dispatch(setPacketReservation({
                          totals_amount: packet?.data?.price_c,
                        }))
                      }}
                      enable={packet?.reservation?.level == 'C' || packet?.reservation?.level == 'A' || packet?.reservation?.level == 'B'}
                    >
                      C
                  </LevelCircle>
                  </LevelContainer>
                </div>
              )}
              <BottomContainer>
                <PtIconsContainer>
                  <PtIcon src={avatar1} />
                  <PtIcon src={avatar3} />
                  <PtIcon src={avatar4} />
                  <PtIcon src={avatar5} />
                  <MoreIcon >●●●</MoreIcon>
                </PtIconsContainer>
                <Button
                  blueborder
                  text={match?.params?.type == 'pt' ? "Eğitmenleri Gör" : "Diyetisyenleri Gör"}
                  fontSize="11pt"
                  color="blue"
                  onClick={() => {
                    history.push('/find?type=' + match?.params?.type);
                  }}
                />
              </BottomContainer>
            </TrainerGroupWrapper>
          </TrainerGroupContainer>
          {userTypeId === USER && <PaymentCard subType={match?.params?.type} type="buy_packet"></PaymentCard>
          }
        </SideContainer>
      </Container>
    </Main>
  );
};
const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 1200px;
  padding: 0 15%;
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
const TitleText = styled.text`
  font-size: 18px;
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
  padding-top:0px;
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
export default BuyPacket;
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
