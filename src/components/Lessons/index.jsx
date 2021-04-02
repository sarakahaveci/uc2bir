import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import Svg from '../statics/svg';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { CustomProgress } from 'components';
import { Container, Row, Col } from 'react-bootstrap';
const useStyles = makeStyles({
  barColorPrimary: {
    backgroundColor: '#00B2A9',
  },
});
const Lessons = () => {
  useEffect(() => {}, []);
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
  function _renderLessons() {
    return temp.map((elm, index) => (
      <Col key={index} style={{ padding: 0 }} lg="4">
        <CustomProgress
          location={temp.length - 1 == index ? 'end' : locationSelector(index)}
          active="true"
        ></CustomProgress>
        <LessonCardContainer>
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
        </LessonCardContainer>
      </Col>
    ));
  }
  return (
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
  );
};

const Wrapper = styled(Container)`
  width: 100%;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  @media (max-width: 768px) {
    padding: 0;
  }
`;
const StyledRow = styled(Row)`
  margin: ${(props) => (props.header ? '20px' : '50px')};
  @media (max-width: 768px) {
    margin: ${(props) => (props.header ? '20px' : '5px')};
  }
`;

const HeaderText = styled.text`
  color: #00b2a9;
  font-size: 16px;
`;

const LessonCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 365px;
  height: 102px;
  border: #c5c4c4;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  @media (max-width: 768px) {
    margin-top: 10px;
    width: 95%;
  }
`;
const HeaderArea = styled.div`
  display: flex;
  align-items: center;
  padding: 17px 12px 17px 12px;
  width: 100%;
  height: 50%;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgba(197, 196, 196, 0.5);
`;
const Number = styled.div`
  width: 26px;
  text-align: center;
`;
const DescArea = styled.div`
  display: flex;
  align-items: center;
  padding: 17px 12px 17px 12px;
  width: 100%;
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
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export default Lessons;
