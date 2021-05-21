import Svg from 'components/statics/svg';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { device } from 'utils';
import { toast } from 'react-toastify';

const AddExercise = ({item, data, setData, index, exerciseItem}) => {
  const [weight, setWeight] = useState(0);
  const [set, setSet] = useState(0);
  const [time, setTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [repetition, setRepetition] = useState(0);

  const checkSelected = ()=>{
    if(exerciseItem!==index){
      toast.error(`Lütfen İlk Önce Egzersiz Seçimini Yapınız`, {
        position: 'bottom-right',
        autoClose: 2000,
      });
    }
  }

  return (
    <Container>
      <MovementSection>
        <BoldText style={{textAlign:'center'}}>{item?.title} </BoldText>
      </MovementSection>
      <Selections>
        {item?.weight&&
        <Row>
          <text>Ağırlık</text>
          <Counter>
            <CircleButton onClick={() => { exerciseItem===index && (setWeight(weight + 1), setData({...data, weight:weight+1})); checkSelected()}}>
              <Svg.PlusIcon />
            </CircleButton>
            <BoldText color="#00B2A9">{weight}kg</BoldText>
            <CircleButton onClick={() => { exerciseItem===index && (setWeight(weight - 1), setData({...data, weight:weight-1})); checkSelected()}}>
              <Svg.Minus />
            </CircleButton>
          </Counter>
        </Row> }
        {item?.set &&
        <Row>
          <text>SET</text>
          <Counter>
            <CircleButton onClick={() => { exerciseItem===index && (setSet(set + 1), setData({...data, set:set+1})); checkSelected() }}>
              <Svg.PlusIcon />
            </CircleButton>
            <BoldText color="#00B2A9">{set}</BoldText>
            <CircleButton onClick={() => { exerciseItem===index && (setSet(set - 1), setData({...data, set:set-1})); checkSelected()}}>
              <Svg.Minus />
            </CircleButton>
          </Counter>
        </Row>}

        {item?.time&&
        <Row>
          <text>Zaman</text>
          <Counter>
            <CircleButton onClick={() => {exerciseItem===index && (setTime(time + 1), setData({...data, time:time+1})); checkSelected()}}>
              <Svg.PlusIcon />
            </CircleButton>
            <BoldText color="#00B2A9">{time} dk</BoldText>
            <CircleButton onClick={() => {exerciseItem===index && (setTime(time - 1), setData({...data, time:time-1})); checkSelected()}}>
              <Svg.Minus />
            </CircleButton>
          </Counter>
        </Row>}

        {item?.break&&
        <Row>
          <text>Mola</text>
          <Counter>
            <CircleButton onClick={() => {exerciseItem===index &&(setBreakTime(breakTime + 5), setData({...data, breakTime:breakTime+5})); checkSelected()}}>
              <Svg.PlusIcon />
            </CircleButton>
            <BoldText color="#00B2A9">{breakTime} sn</BoldText>
            <CircleButton  onClick={() => {exerciseItem===index &&(setBreakTime(breakTime - 5), setData({...data, breakTime:breakTime-5})); checkSelected()}}>
              <Svg.Minus />
            </CircleButton>
          </Counter>
        </Row>}

        {item?.repetition&&
        <Row end={'true'}>
          <text>Tekrar</text>
          <Counter>
            <CircleButton  onClick={() => {exerciseItem===index &&(setRepetition(repetition + 1), setData({...data, repetition:repetition+1})); checkSelected()}}>
              <Svg.PlusIcon />
            </CircleButton>
            <BoldText color="#00B2A9">{repetition}</BoldText>
            <CircleButton onClick={() => {exerciseItem===index &&(setRepetition(repetition - 1), setData({...data, repetition:repetition-1})); checkSelected()}}>
              <Svg.Minus />
            </CircleButton>
          </Counter>
        </Row>}

      </Selections>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  overflow: hidden;
  width: 532px;
  height: auto;
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
  justify-content: center;
  align-items: center;
  display: flex;
  background: yellow;
  padding: 10px;
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
  margin-bottom: 5px;
  margin-top: 5px;
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
