// @ts-nocheck

import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import Svg from '../../statics/svg';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { CustomProgress, Title } from 'components';
import { Container, Row, Col } from 'react-bootstrap';
import { device } from 'utils';

const useStyles = makeStyles({
  barColorPrimary: {
    backgroundColor: '#00B2A9',
  },
});

const EditLesson = ({ setBannerActive = () => {}, setPage = () => {} }) => {
  useEffect(() => {
    setBannerActive(false);
  }, []);
  function onClickLesson() {
    setPage('Exercises');
  }
  const classes = useStyles();
  var temp = ['55', '55s5d', '626', 'd', 'sdsd', 'sdasd', 'sdad'];
  function locationSelector(index) {
    if (index % 3 === 0) {
      return 'start';
    } else if (index % 3 === 2) {
      return 'end';
    } else {
      return 'mid';
    }
  }
  function _renderLessons() {
    return temp.map((elm, index) => (
      <Col key={index} style={{ padding: 0 }} lg="4">
        <CustomProgress location={temp.length - 1 === index ? 'end' : locationSelector(index)} active='true' />
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
              <IconArea/>
              <DescText>Denememasdoa ösasd oasöodoöasasdsad </DescText>
            </DescArea>
          </MainField>
          <RightSideField>
            <Svg.ArrowRightIcon/>
          </RightSideField>
        </LessonCardContainer>
      </Col>
    ));
  }
  return (
    <Wrapper>
      <Title
        style={{ cursor: 'pointer', padding: 15 }}
        fontSize="14pt"
        textAlign="left"
        onClick={() => {
          setPage('Home');
          setBannerActive(true);
        }}
      >
        {`< Geri`}
      </Title>
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
  );
};

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

export default EditLesson;
