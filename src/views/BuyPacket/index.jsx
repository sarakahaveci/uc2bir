import React from 'react';
import styled, { css } from 'styled-components/macro';
import profileImg from '../../assets/banner/slider-item-1.png';
import packetImg from '../../assets/banner/dw1.jpg';
import avatar1 from '../../assets/slider/04.jpg';
import avatar3 from '../../assets/slider/05.jpg';
import avatar4 from '../../assets/slider/p1.jpg';
import avatar5 from '../../assets/slider/p2.jpg';

import { Button, Svg } from 'components';
import { Main } from 'components';
import PaymentCard from 'components/PaymentCard';
const BuyPacket = () => {
  return (
    <Main>
      <img src={profileImg} alt="" className="banner-image" />
      <Container>
        <SideContainer>
          <Image src={packetImg}></Image>
          <InfoContainer>
            <HeaderText>Gelin Paketi</HeaderText>
            <TitleText>12 Günde 8 Kilo Verin!</TitleText>
            <BigSeperator />
            <SubInfo>
              <Svg.FitnessMediumIcon></Svg.FitnessMediumIcon>
              <text style={{ margin: '0 5px' }}>Fitness</text>
              <Svg.ClockMediumIcon></Svg.ClockMediumIcon>
              <text style={{ margin: '0 5px' }}>12 Ders</text>
            </SubInfo>
            <LabelText>İçerik</LabelText>
            <Seperator />
            <DescText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum. dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.”
            </DescText>
          </InfoContainer>
        </SideContainer>
        <SideContainer>
          <TrainerGroupContainer>
            <TrainerGroupWrapper>
              <div>
                <LabelText>Seviyenizi Seçiniz</LabelText>
                <Seperator></Seperator>
                <LevelContainer>
                  <LevelCircle enable>A</LevelCircle>
                  <Line />
                  <LevelCircle>B</LevelCircle>
                  <Line />

                  <LevelCircle>C</LevelCircle>
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
                />
              </BottomContainer>
            </TrainerGroupWrapper>
          </TrainerGroupContainer>
          <PaymentCard></PaymentCard>
        </SideContainer>
      </Container>
    </Main>
  );
};
const Container = styled.div`
  display: flex;
  widht: 100%;
  min-height: 1200px;
  padding: 50px 15%;
  justify-content: space-between;
`;
const SideContainer = styled.div`
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
const DescText = styled.text`
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
  widht: 100%;
  background: #f8f8f8;
  height: 350px;
  border-radius: 30px;
  padding: 20px;
`;
const TrainerGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  widht: 100%;
  background: white;
  height: 100%;
  border-radius: 30px;
  padding: 30px;
  justify-content: space-between;
`;
const LevelContainer = styled.div`
  widht: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LevelCircle = styled.div`
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
export default BuyPacket;
