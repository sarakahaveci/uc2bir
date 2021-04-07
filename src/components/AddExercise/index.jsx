import Svg from 'components/statics/svg';
import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { device } from 'utils';

const AddExercise = () => {
  useEffect(() => {}, []);

  return (
    <Container>
      <MovementSection></MovementSection>
      <Selections>
        <Row>
          <text>Ağırlık</text>
          <Counter>
            <CircleButton>
              <Svg.PlusIcon />
            </CircleButton>
            <BoldText color="#00B2A9">1kg</BoldText>
            <CircleButton>
              <Svg.Minus />
            </CircleButton>
          </Counter>
        </Row>
        <Row>
          <text>SET</text>
          <Counter>
            <CircleButton>
              <Svg.PlusIcon />
            </CircleButton>
            <BoldText color="#00B2A9">1</BoldText>
            <CircleButton>
              <Svg.Minus />
            </CircleButton>
          </Counter>
        </Row>
        <Row>
          <text>Mola</text>
          <Counter>
            <CircleButton>
              <Svg.PlusIcon />
            </CircleButton>
            <BoldText color="#00B2A9">0:30</BoldText>
            <CircleButton>
              <Svg.Minus />
            </CircleButton>
          </Counter>
        </Row>
        <Row end>
          <text>Tekrar</text>
          <Counter>
            <CircleButton>
              <Svg.PlusIcon />
            </CircleButton>
            <BoldText color="#00B2A9">1</BoldText>
            <CircleButton>
              <Svg.Minus />
            </CircleButton>
          </Counter>
        </Row>
      </Selections>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  overflow: hidden;
  width: 532px;
  height: 219px;
  background: #fcfbfb;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  @media ${device.sm} {
    width: 100%;
  }
`;
const MovementSection = styled.div`
  width: 30%;
  height: 100%;
  background: yellow;
`;
const Selections = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  height: 100%;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  height: 25%;
  border-bottom-style: ${(props) => (props.end ? 'none' : 'solid')};
  border-width: 1px;
  border-color: #afafaf;
`;
const Counter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 130px;
  height: 35px;
`;
const CircleButton = styled.button`
  display: flex;
  width: 35px;
  height: 35px;
  background: #d6f7f5;
  border-radius: 35px;
  align-items: center;
  justify-content: center;
`;

const BoldText = styled.text`
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media ${device.sm} {
    font-size: 0.7rem;
  }
`;
export default AddExercise;
