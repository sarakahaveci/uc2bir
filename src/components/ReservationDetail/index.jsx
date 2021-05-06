import Svg from 'components/statics/svg';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { device } from 'utils';
import GoogleMap from 'components/GoogleMaps/GoogleMap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const ReservationDetail = ({ type, goBack = () => {} }) => {
  const [detailData, setDetailData] = useState({});
  var professionalReservation = useSelector(
    (state) => state.professionalReservation
  );
  useEffect(() => {
    switch (type) {
      case 'pt':
        setDetailData(professionalReservation?.ptReservation?.res_detail);
        break;
      case 'dt':
        setDetailData(professionalReservation?.dtReservation?.res_detail);
        break;
      case 'st':
        setDetailData(professionalReservation?.userReservation?.res_detail);
        break;
      default:
        break;
    }
  }, [professionalReservation]);

  return (
    <Container>
      <Header>
        <BoldText
          onClick={() => {
            goBack();
          }}
          style={{ cursor: 'pointer' }}
        >
          {'<  Randevu Detaylarınız'}
        </BoldText>
      </Header>
      <Sections>
        <Left>
          <InfoItem>
            <InfoMain>
              <CustomerImage
                src={detailData?.pt?.photo || detailData?.dt?.photo}
              ></CustomerImage>
              <BoldText>
                {detailData?.student?.name ||
                  detailData?.bs?.title ||
                  detailData?.pt?.name}
              </BoldText>
            </InfoMain>
            <text style={{ fontSize: '30px' }}> {'>'} </text>
          </InfoItem>
          <InfoItem>
            <InfoMain>
              <Icon>
                <Svg.SessionType.Gym />
              </Icon>
              <BoldText>{detailData?.branch}</BoldText>
            </InfoMain>
            <text style={{ fontSize: '30px' }}> {'>'} </text>
          </InfoItem>
          <InfoItem>
            <InfoMain>
              <Icon>
                <Svg.Date />
              </Icon>
              <AdressText>
                {detailData?.hour + '  ' + detailData?.date}
              </AdressText>
            </InfoMain>
          </InfoItem>
          {detailData?.address_detail && (
            <InfoItem>
              <InfoMain>
                <Icon>
                  <Svg.LocationIcon />
                </Icon>
                <AdressText>{detailData?.address_detail}</AdressText>
              </InfoMain>
            </InfoItem>
          )}
          <MapWrapper>
            <GoogleMap
              locationFromUser={{
                lat: 34.0525,
                lng: 41.0525,
              }}
            />
          </MapWrapper>
        </Left>
        <Right>
          <RightAreaWrapper>
            <DescTextWrapper>
              <DescHeader>Ders Hakkında</DescHeader>
              <DescText>
                Burada oturum türüne göre, ders hakkında yazılar hazır bir
                şeklde gelecek. Lie back on a flat bench. Using a medium width
                grip, lift the bar from the rack and hold it straight. over you
                with your arms locked. This will be your starting
                position.Burada oturum türüne göre, ders hakkında yazılar hazır
                bir şeklde gelecek. Lie back on a flat bench. Using a medium
                width grip, lift the bar from the rack and hold it straight.
                over you with your arms locked. This will be your starting
                position.
              </DescText>
            </DescTextWrapper>
            <MessageButtonContainer>
              <MessageButton>Mesaj Gönder</MessageButton>
              <Link to={'/myprofile/online'}>
                <OnlineClassButton color={'blue2'}>
                  Derse Gir{' '}
                </OnlineClassButton>
              </Link>
            </MessageButtonContainer>
          </RightAreaWrapper>
        </Right>
      </Sections>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 10px;

  @media ${device.sm} {
    width: 100%;
  }
`;
const Sections = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  @media ${device.sm} {
    flex-direction: column;
  }
`;
const Left = styled.div`
  width: 50%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  @media ${device.sm} {
    width: 100%;
  }
`;
const Right = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  @media ${device.sm} {
    width: 100%;
  }
`;
const RightAreaWrapper = styled.div`
  border-radius: 20px;
  -webkit-box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
`;
const MessageButtonContainer = styled.div`
  width: 100%;
  padding: 30px;
`;
const MessageButton = styled.button`
  width: 100%;
  height: 50px;
  background: var(--blue);
  color: white;
`;

const OnlineClassButton = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 15px;
  background: var(--blue2);
  color: white;
`;

const Header = styled.div`
  width: 100%;
`;
const InfoItem = styled.div`
  width: 100%;
  background: white;
  -webkit-box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
`;
const InfoMain = styled.div`
  display: flex;
  align-items: center;
`;

const CustomerImage = styled.img`
  width: 41px;
  height: 41px;
  backround: white;
  -webkit-box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  display: flex;
  border-radius: 41px;
  margin-right: 20px;
`;
const Icon = styled.div``;
const MapWrapper = styled.div`
  width: 100%;
  border-radius: 18px;
  overflow: hidden;
  margin-top: 20px;
`;

//text
const BoldText = styled.text`
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media ${device.sm} {
    font-size: 0.7rem;
  }
`;
const AdressText = styled.text`
  color: #909090;
  font-family: 'Poppins', sans-serif;
  margin-left: 8px;
  @media ${device.sm} {
    margin-left: 3px;
    font-size: 0.6rem;
  }
`;
const DescTextWrapper = styled.div`
  width: 100%;
  background: #f8f8f8;
  display: flex;
  flex-direction: column;
  padding: 25px;
`;
const DescHeader = styled.text`
  font-family: 'Poppins', sans-serif;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: #00b2a9;
  font-size: 1rem;
  font-weight: bold;
`;
const DescText = styled.text``;

export default ReservationDetail;
