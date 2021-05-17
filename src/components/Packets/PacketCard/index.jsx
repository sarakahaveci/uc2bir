import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import Svg from '../../statics/svg';
import { device } from 'utils';

const PacketCard = ({ onClickEdit, data }) => {
  useEffect(() => {}, []);

  return (
    <Container>
      <Column>
        <Row>
          <Svg.ClockIcon style={{ marginRight: '9px', marginBottom: '2px' }} />
          <BoldText>{data?.hour}</BoldText>
        </Row>
        <Seperator/>
        <Row>
          <BoldText>{data?.branch}</BoldText>
        </Row>
        <Seperator/>
        <FlexSpace position={'END'}>
          <Dot />
          <BoldText>{data?.user}</BoldText>
        </FlexSpace>
      </Column>
      <Column>
        <Row>
          <BoldText>{data?.title.toUpperCase() }</BoldText>
        </Row>
        <FlexSpace position={'END'}>
          <BoldText color={'#00B2A9'}>{data?.lesson}/{data?.quantity} DERS</BoldText>
        </FlexSpace>
      </Column>
      {data?.session_type !== 'online' &&
      <Column>
        <Row>
          <BoldText>SPOR ALANI: FIGHTNING FIT CLUB</BoldText>
        </Row>
      </Column>
      }

      {data?.session_type !== 'online' &&
      <Column>
        <Row>
          <BoldText>SPOR ALANI: FIGHTNING FIT CLUB</BoldText>
        </Row>
      </Column>
      }

      <Column borderDisable>
          <FlexSpace>
            <Svg.LocationIcon/>
            {data?.session_type !== 'online' &&
            <AdressText>Denemememmejsad saokdk asokdo</AdressText>
            }
          </FlexSpace>
        <Seperator/>
        <Row>
          <Button onClick={()=>onClickEdit(data)}>Dersleri Düzenle</Button>
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
  @media ${device.sm} {
    width: 100%;
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
  @media ${device.sm} {
    height: 6vw;
    padding-left: 1vw;
  }
`;
const Row = styled.div`
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
  width: 180px;
  height: 34px;
  background: #f77e0b;
  color: white;
  border-radius: 5px;
  @media ${device.sm} {
    width: 90px;
    height: 17px;
    font-size: 10px;
    border-radius: 4px;
  }
`;
export default PacketCard;
