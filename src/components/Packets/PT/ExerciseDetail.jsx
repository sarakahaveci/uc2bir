// @ts-nocheck
import React from 'react';
import styled from 'styled-components/macro';
import { makeStyles } from '@material-ui/core/styles';
import { device } from 'utils';
import { AddExercise } from 'components';
import LinearProgress from '@material-ui/core/LinearProgress';
import Svg from 'components/statics/svg';
const useStyles = makeStyles({
  barColorPrimary: {
    backgroundColor: '#00B2A9',
  },
});
const ExerciseDetail = () => {
  const classes = useStyles();

  return (
    <Container>
      <Side>
        <AddExercise />
        <AddExercise />
      </Side>
      <Side>
        <TextContent>
          <Text bold>Nasıl Yapılır ? </Text>
          <LinearProgress
            classes={{ barColorPrimary: classes.barColorPrimary }}
            variant="determinate"
            value={20}
          />
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum. dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.”
          </Text>
        </TextContent>
        <Info>
          <Text bold>Squat</Text>
          <Properties>
            <PropertyContainer>
              <Svg.Difficulty></Svg.Difficulty>
              <TextWrapper>
                <Text>Zorluk</Text>
                <Text bold>2</Text>
              </TextWrapper>
            </PropertyContainer>
            <PropertyContainer>
              <Svg.Weight></Svg.Weight>
              <TextWrapper>
                <Text>Ağırlık</Text>
                <Text bold>1 kg</Text>
              </TextWrapper>
            </PropertyContainer>
            <PropertyContainer>
              <Svg.Set></Svg.Set>
              <TextWrapper>
                <Text>Set</Text>
                <Text bold>1</Text>
              </TextWrapper>
            </PropertyContainer>
            <PropertyContainer>
              <Svg.Break></Svg.Break>
              <TextWrapper>
                <Text>Mola</Text>
                <Text bold>00:30</Text>
              </TextWrapper>
            </PropertyContainer>
            <PropertyContainer>
              <Svg.Repetition></Svg.Repetition>
              <TextWrapper>
                <Text>Tekrar</Text>
                <Text bold>1</Text>
              </TextWrapper>
            </PropertyContainer>
          </Properties>
        </Info>
      </Side>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
`;
const Side = styled.div`
  width: 586px;
  height: 586px;
  @media ${device.sm} {
    width: 100%;
  }
`;
const TextContent = styled.div`
  width: 586px;
  padding: 30px;
  @media ${device.sm} {
    width: 100%;
  }
`;
const Info = styled.div`
  width: 586px;
  height: 234px;
  padding: 30px;
  @media ${device.sm} {
    width: 100%;
  }
`;
const Properties = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  @media ${device.sm} {
    width: 100%;
  }
`;
const PropertyContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;
const Text = styled.text`
  font-size: 1rem;
  font-weight: ${(props) => (props.bold ? 'bold' : 'initial')};
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media ${device.sm} {
    font-size: 0.7rem;
  }
`;

export default ExerciseDetail;
