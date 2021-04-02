import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import Svg from '../../statics/svg';

const PacketCard = () => {
  useEffect(() => {}, []);

  return (
    <Container>
      <Column>
        <Row>
          <Svg.ClockIcon
            style={{ marginRight: '9px', marginBottom: '2px' }}
          ></Svg.ClockIcon>
          <BoldText>08:00 - 09:00</BoldText>
        </Row>
        <Seperator></Seperator>
        <Row>
          <BoldText>FITNESS</BoldText>
        </Row>
        <Seperator></Seperator>
        <FlexSpace position={'END'}>
          <Dot />
          <BoldText>Faruk Kale</BoldText>
        </FlexSpace>
      </Column>
      <Column>
        <Row>
          <BoldText>GELİN PAKETİ</BoldText>
        </Row>
        <FlexSpace position={'END'}>
          <BoldText color={'#00B2A9'}>2 / 12 DERS</BoldText>
        </FlexSpace>
      </Column>
      <Column>
        <Row>
          <BoldText>SPOR ALANI: FIGHTNING FIT CLUB</BoldText>
        </Row>
      </Column>
      <Column borderDisable>
        <FlexSpace>
          <Svg.LocationIcon></Svg.LocationIcon>
          <AdressText>Denemememmejsad saokdk asokdo</AdressText>
        </FlexSpace>
        <Seperator></Seperator>

        <Row>
          <Button>Dersleri Düzenle</Button>
        </Row>
      </Column>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 731px;
  border-radius: 10px;
  background-color: #fcfcfc;
  -webkit-box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  @media (max-width: 768px) {
    width: 98vw;
  }
`;
const Column = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  padding-left: 10px;
  border-bottom-style: ${(props) => (props.borderDisable ? 'none' : 'solid')};
  border-bottom-width: 1px;
  border-bottom-color: rgba(197, 196, 196, 0.5);
  @media (max-width: 768px) {
    height: 6vw;
    padding-left: 1vw;
  }
`;
const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 3vw;
  }
`;
const Seperator = styled.div`
  display: flex;
  width: 1px;
  height: 60%;
  background-color: rgba(197, 196, 196, 0.5);
`;
//text
const BoldText = styled.text`
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;
const AdressText = styled.text`
  color: #909090;
  font-family: 'Poppins', sans-serif;
  margin-left: 8px;
  @media (max-width: 768px) {
    margin-left: 3px;
    font-size: 0.6rem;
  }
`;

//<=
const FlexSpace = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.position == 'END' ? 'flex-end' : 'flex-start'};
  padding: 0 20px 0 20px;
  flex-grow: 2;
  @media (max-width: 768px) {
  }
`;
const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 6px;
  background-color: #ef805a;
  margin-right: 8px;
  @media (max-width: 768px) {
    margin-right: 3px;
  }
`;

const Button = styled.button`
  width: 180px;
  height: 34px;
  background: #f77e0b;
  color: white;
  border-radius: 5px;
  @media (max-width: 768px) {
    width: 90px;
    height: 17px;
    font-size: 10px;
    border-radius: 4px;
  }
`;
export default PacketCard;
