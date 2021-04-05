import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { CustomProgress } from 'components';
import { Container, Row, Col } from 'react-bootstrap';
import ExerciseCard from './ExerciseCard';
const useStyles = makeStyles({
  barColorPrimary: {
    backgroundColor: '#00B2A9',
  },
});
const Exercises = () => {
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
  function _renderExercises() {
    return temp.map((elm, index) => (
      <Col key={index} style={{ padding: 0 }} lg="4">
        <CustomProgress
          location={temp.length - 1 == index ? 'end' : locationSelector(index)}
          active="false"
        ></CustomProgress>
        <ExerciseCard />
      </Col>
    ));
  }
  return (
    <Wrapper>
      <StyledRow header style={{}}>
        <Col lg="12" style={{ padding: 0 }}>
          <HeaderText>EGZERSİZLER</HeaderText>
          <LinearProgress
            classes={{ barColorPrimary: classes.barColorPrimary }}
            variant="determinate"
            value={20}
          />
        </Col>
      </StyledRow>
      <StyledRow style={{}}>{_renderExercises()}</StyledRow>
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

export default Exercises;
