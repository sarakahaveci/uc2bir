import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import Svg from '../statics/svg';
import { device } from 'utils';

const ApproveCard = ({ onApprove = () => {}, onReject = () => {} }) => {
  useEffect(() => {}, []);

  return (
    <Container>
      <Row>
        <Column>
          <Svg.ClockIcon
            style={{ marginRight: '9px', marginBottom: '2px' }}
          ></Svg.ClockIcon>
          <BoldText>08:00 - 09:00</BoldText>
        </Column>
        <Seperator></Seperator>
        <Column>
          <BoldText>FITNESS</BoldText>
        </Column>
        <Seperator></Seperator>
        <FlexSpace position={'END'}>
          <Dot />
          <BoldText>Faruk Kale</BoldText>
        </FlexSpace>
      </Row>

      <Row>
        <Column>
          <BoldText>SALON: FIGHTNING FIT CLUB</BoldText>
        </Column>
      </Row>
      <Row borderDisable>
        <FlexSpace>
          <Svg.LocationIcon></Svg.LocationIcon>
          <AdressText>Denemememmejsad saokdk asokdo</AdressText>
        </FlexSpace>
        <Seperator></Seperator>

        <Column>
          <Button onClick={onApprove}>Onayla</Button>
          <Button onClick={onReject}>Reddet</Button>
        </Column>
      </Row>
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
  @media ${device.sm} {
    width: 100%;
  }
`;
const Row = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  padding-left: 10px;
  border-bottom-style: ${(props) => (props.borderDisable ? 'none' : 'solid')};
  border-bottom-width: 1px;
  border-bottom-color: rgba(197, 196, 196, 0.5);
  @media ${device.sm} {
    height: 6vw;
    padding-left: 1vw;
  }
`;
const Column = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  @media ${device.sm} {
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

//<=
const FlexSpace = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.position == 'END' ? 'flex-end' : 'flex-start'};
  padding: 0 20px 0 20px;
  flex-grow: 2;
  @media ${device.sm} {
  }
`;
const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 6px;
  background-color: #ef805a;
  margin-right: 8px;
  @media ${device.sm} {
    margin-right: 3px;
  }
`;

const Button = styled.button`
  width: 120px;
  height: 34px;
  background: #f77e0b;
  color: white;
  border-radius: 5px;
  margin-right: 10px;
  @media ${device.sm} {
    width: 90px;
    height: 17px;
    font-size: 10px;
    border-radius: 4px;
  }
`;
export default ApproveCard;
