// @ts-nocheck

import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import Svg from '../../statics/svg';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { CustomProgress } from 'components';
import { Container, Row, Col } from 'react-bootstrap';
import { device } from 'utils';
import image from '../../../assets/session-type.jpg';

const useStyles = makeStyles({
  barColorPrimary: {
    backgroundColor: '#00B2A9',
  },
});
const DetailLesson = ({ setBannerActive = () => {}, setPage = () => {} }) => {
  useEffect(() => {
    setBannerActive(false);
  }, []);
  function onClickLesson() {
    setPage('Exercises');
  }
  const classes = useStyles();
  var temp = ['55', '55s5d', '626', 'd', 'sdsd', 'sdasd', 'sdad'];
  function locationSelector(index) {
    if (index % 3 == 0) {
      return 'start';
    } else if (index % 3 == 2) {
      return 'end';
    } else {
      return 'mid';
    }
  }
  function handleReservationButton() {
    alert('sd');
  }
  function _renderLessons() {
    return temp.map((elm, index) => (
      <Col key={index} style={{ padding: 0 }} lg="4">
        <CustomProgress
          location={temp.length - 1 == index ? 'end' : locationSelector(index)}
          active="true"
        ></CustomProgress>
        <LessonCardContainer onClick={onClickLesson}>
          <MainField>
            <HeaderArea>
              {false ? (
                <Svg.TickLesson />
              ) : (
                <Number>
                  <BoldText color={'#C5C4C4'}>1.</BoldText>
                </Number>
              )}
              <BoldText style={{ marginLeft: '9px' }}>Gelişim Testi</BoldText>
            </HeaderArea>
            <DescArea>
              <IconArea></IconArea>
              <DescText>Denememasdoa ösasd oasöodoöasasdsad </DescText>
            </DescArea>
          </MainField>
          <RightSideField>
            <Svg.ArrowRightIcon></Svg.ArrowRightIcon>
          </RightSideField>
        </LessonCardContainer>
      </Col>
    ));
  }
  return (
    <Main>
      <InfoContainer>
        <Right>
          <ImageContainer>
            <ImageBanner src={image}></ImageBanner>
            <Button onClick={handleReservationButton}>Rezervasyon Yap</Button>
          </ImageContainer>
          <TextContainer>
            <Title>Gelin Paketi</Title>
            <DescText>12 Günde 8 Kilo Verin!</DescText>
          </TextContainer>
        </Right>
        <RichText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum. dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.”
        </RichText>
      </InfoContainer>
      <Wrapper>
        <StyledRow header style={{}}>
          <Col lg="12" style={{ padding: 0 }}>
            <HeaderText>Dersler</HeaderText>
            <LinearProgress
              classes={{ barColorPrimary: classes.barColorPrimary }}
              variant="determinate"
              value={20}
            />
          </Col>
        </StyledRow>
        <StyledRow style={{}}>{_renderLessons()}</StyledRow>
      </Wrapper>
    </Main>
  );
};
const Main = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const Wrapper = styled(Container)`
  width: 100%;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  padding: 5px;
  @media ${device.sm} {
  }
`;
const StyledRow = styled(Row)`
  margin: ${(props) => (props.header ? '20px' : '50px')};
  @media ${device.sm} {
    margin: ${(props) => (props.header ? '20px' : '5px')};
  }
`;

const HeaderText = styled.text`
  color: #00b2a9;
  font-size: 16px;
`;

const LessonCardContainer = styled.div`
  display: flex;
  width: 365px;

  height: 102px;
  border: #c5c4c4;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  cursor: pointer;
  @media ${device.sm} {
    margin-top: 10px;
    width: 95%;
  }
`;
const MainField = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
const RightSideField = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 100%;
`;
const HeaderArea = styled.div`
  display: flex;
  align-items: center;
  padding: 17px 12px 17px 12px;
  width: 100%;
  height: 50%;
`;
const Number = styled.div`
  width: 26px;
  text-align: center;
`;
const DescArea = styled.div`
  display: flex;
  align-items: center;
  padding: 17px 12px 17px 12px;
  height: 50%;
`;
const BoldText = styled.text`
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
`;
const IconArea = styled.div`
  width: 26px;
  height: 26px;
`;
const DescText = styled.text`
  margin-left: 9px;
  overflow: hidden;
`;
const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 50px;
`;
const ImageBanner = styled.section`
  width: 330px;
  height: 285px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-image: url('${(props) => props.src}');
  background-size: cover;
  background-repeat: no-repeat;
`;
const Right = styled.div`
  display: flex;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 285px;
  align-items: center;
  padding: 20px;
`;
const Title = styled.text`
  font-size: 26px;
`;
const RichText = styled.text`
  font-size: 16px;
  height: 285px;
  width: 543px;
`;
const ImageContainer = styled.div`
  position: relative;
`;

const Button = styled.button`
  width: 180px;
  height: 34px;
  background: var(--blue);
  color: white;
  border-radius: 5px;
  @media ${device.sm} {
    width: 90px;
    height: 17px;
    font-size: 10px;
    border-radius: 4px;
  }

  position: absolute;
  bottom: -17px;
  right: 20px;
`;
export default DetailLesson;
