import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import profileImg from '../../assets/banner/slider-item-1.png';

import { Svg, PaymentCard, CreditCard } from 'components';
import { Main } from 'components';
import GoogleMap from 'components/GoogleMaps/GoogleMap';

import { useDispatch, useSelector } from 'react-redux';
import { getGroupLessonDetail, setGroupLessonReservation } from 'actions';
import { getWallet } from 'actions/userProfileActions/walletActions';
import { device } from 'utils';
import { useHistory } from 'react-router-dom';
import { USER } from '../../constants/userTypes';

const BuyGroupLesson = ({ match }) => {
  const dispatch = useDispatch();
  const group = useSelector((state) => state.buyGroupLesson);
  const userTypeId = useSelector((state) => state.auth?.user?.type_id);

  const wallet = useSelector((state) => state.userProfile.wallet);
  let history = useHistory();

  useEffect(() => {
    dispatch(getWallet());
    dispatch(getGroupLessonDetail(match?.params?.id));
  }, []);
  useEffect(() => {
    dispatch(
      setGroupLessonReservation({
        totals_amount: group?.data?.slot?.price,
        id: match?.params?.id,
      })
    );
  }, [group?.data]);

  function _renderLeftArea() {
    switch (group?.reservation?.payment_type) {
      case 'wallet':
      case 'both':
        var wallet_balance = wallet?.data?.balance || 0;
        var amount = group?.reservation?.totals_amount || 0;
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
                defaultCardName={group?.reservation?.holder_name}
                defaultCardNo={group?.reservation?.card_number}
                defaultSKT={
                  group?.reservation?.expiration_month +
                  '/' +
                  group?.reservation?.expiration_year
                }
                defaultCVV={group?.reservation?.cvc}
                onCardName={(val) => {
                  dispatch(setGroupLessonReservation({ holder_name: val }));
                }}
                onCardNo={(val) => {
                  dispatch(setGroupLessonReservation({ card_number: val }));
                }}
                onSKT={(month, year) => {
                  dispatch(
                    setGroupLessonReservation({
                      expiration_month: month,
                      expiration_year: year,
                    })
                  );
                }}
                onCVV={(val) => {
                  dispatch(setGroupLessonReservation({ cvc: val }));
                }}
              />
            )}
          </div>
        );
      case 'credit_card':
        return (
          <div style={{ padding: '0 20px' }}>
            <CreditCard
              defaultCardName={group?.reservation?.holder_name}
              defaultCardNo={group?.reservation?.card_number}
              defaultSKT={
                group?.reservation?.expiration_month +
                '/' +
                group?.reservation?.expiration_year
              }
              defaultCVV={group?.reservation?.cvc}
              onCardName={(val) => {
                dispatch(setGroupLessonReservation({ holder_name: val }));
              }}
              onCardNo={(val) => {
                dispatch(setGroupLessonReservation({ card_number: val }));
              }}
              onSKT={(month, year) => {
                dispatch(
                  setGroupLessonReservation({
                    expiration_month: month,
                    expiration_year: year,
                  })
                );
              }}
              onCVV={(val) => {
                dispatch(setGroupLessonReservation({ cvc: val }));
              }}
            />
          </div>
        );

      default:
        return (
          <>
            <SideContainer>
              <PtCardContainer>
                <PtIcon src={group?.data?.pt?.photo}></PtIcon>
                <PtInfoContainer>
                  <Text>{group?.data?.pt?.name}</Text>
                  <text>{group?.data?.pt?.title}</text>
                  <Seperator />
                  <SubInfo>
                    <Svg.FitnessMediumIcon></Svg.FitnessMediumIcon>
                    <text style={{ margin: '0 5px' }}>
                      {group?.data?.slot?.branch?.name}
                    </text>
                    <Svg.UsersGym></Svg.UsersGym>
                    <text style={{ margin: '0 5px' }}>
                      {group?.data?.slot?.min_capacity} /{' '}
                      {group?.data?.slot?.max_capacity} Kişilik
                    </text>

                    <text style={{ margin: '0 5px' }}>
                      {group?.data?.pt?.classification} Sınıf Eğitmen
                    </text>
                  </SubInfo>
                </PtInfoContainer>
              </PtCardContainer>
              <InfoContainer>
                <HeaderText>Oturum Türü</HeaderText>
                <BigSeperator />
                {
                  {
                    gym: (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '20px',
                        }}
                      >
                        <Svg.SessionType.Gym style={{ marginRight: '10px' }} />{' '}
                        Spor Alanı
                      </div>
                    ),
                    home_park: (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '20px',
                        }}
                      >
                        <Svg.SessionType.Park style={{ marginRight: '10px' }} />{' '}
                        Ev / Park
                      </div>
                    ),
                    online: (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '20px',
                        }}
                      >
                        <Svg.SessionType.Online
                          style={{ marginRight: '10px' }}
                        />{' '}
                        Online
                      </div>
                    ),
                  }[group?.data?.slot?.session]
                }
                <LabelText>İçerik</LabelText>
                <Seperator />
                <h5>{group?.data?.title}</h5>
                <DescText style={{ marginTop: '6px' }}>{group?.data?.slot?.detail}</DescText>
              </InfoContainer>
            </SideContainer>
          </>
        );
    }
  }

  return (
    <Main>
      <img src={profileImg} alt="" className="banner-image" />

      <div style={{ padding: '40px 13%' }}>
        <BackLink
          onClick={() => {
            group?.reservation?.payment_type
              ? dispatch(setGroupLessonReservation({ payment_type: undefined }))
              : history.push('/group-lessons');
          }}
        >
          <Svg.ArrowLeftIcon />

          {group?.reservation?.payment_type ? (
            <span>Ödeme Yap</span>
          ) : (
            <span>Grup Ders Rezervasyon Oluşturun</span>
          )}
        </BackLink>
      </div>
      <Container>
        {_renderLeftArea()}
        <SideContainer>
          <TrainerGroupContainer>
            <div
              style={{
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <text style={{ fontSize: 19 }}>
                {group?.data?.bs?.title
                  ? group?.data?.bs?.title + ' >'
                  : 'Ev / Park'}
              </text>
              <Seperator />
            </div>
            <MapWrapper>
              {group?.data?.bs?.lat && group?.data?.bs?.lng && (
                <GoogleMap
                  locationFromUser={{
                    lat: group?.data?.bs?.lat,
                    lng: group?.data?.bs?.lng,
                  }}
                  disabled
                />
              )}
            </MapWrapper>
            <ResDetailContainer>
              <text>Grup Ders Tarih ve Saati</text>
              <Line />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                Ders
                <div
                  style={{
                    height: '18px',
                    width: '1px',
                    backgroundColor: 'rgba(0,0,0,0.17)',
                    margin: '5px',
                  }}
                ></div>
                <Svg.Date style={{ marginRight: '5px' }} />
                <text style={{ marginRight: '10px' }}>
                  {group?.data?.slot?.date}
                </text>
                <text style={{ marginRight: '5px', color: '#00b2a9' }}>
                  Saat
                </text>
                <text style={{ color: '#00b2a9' }}>
                  {group?.data?.slot?.hour}
                </text>
              </div>
            </ResDetailContainer>
          </TrainerGroupContainer>
          {userTypeId === USER && (
            <PaymentCard type="buy_group_lesson"></PaymentCard>
          )}
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
  display: flex;
  flex-direction: column;
  width: 48%;
`;
const PtCardContainer = styled.div`
  display: flex;
  width: 100%;
  z-index: 4;
  padding: 20px 0;
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
  padding: 20px 0;
`;
const PtInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
`;

const HeaderText = styled.text`
  font-size: 18px;
  color: var(--blue);
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
  min-height: 350px;
  border-radius: 20px;
  padding: 20px;
`;
const ResDetailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  min-height: 100px;
  border-radius: 20px;
  padding: 20px;
  margin-top: 5px;
  justify-content: center;
`;

const Line = styled.div`
  flex-grow: 1;
  background: #d3d3d3;
  height: 1px;
  margin: 7px;
`;

const PtIcon = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  object-fit: cover;
  margin-right: 10px;
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
const MapWrapper = styled.div`
  width: 100%;
  border-radius: 30px;
  overflow: hidden;
`;

export default BuyGroupLesson;
