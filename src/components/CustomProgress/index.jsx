import React, { useEffect } from 'react';
import styled from 'styled-components/macro';

const PacketCard = ({ active, location }) => {
  useEffect(() => {}, []);

  switch (location) {
    case 'start':
      return (
        <Container>
          <Circle enable={active == 'true'}></Circle>
          <Line enable={active == 'true'}></Line>
        </Container>
      );
    case 'mid':
      return (
        <Container>
          <Line enable={active == 'true' || active == 'half'}></Line>
          <Circle enable={active == 'true' || active == 'half'}></Circle>
          <Line enable={active == 'true'}></Line>
        </Container>
      );
    case 'end':
      return (
        <Container>
          <Line enable={active == 'true'}></Line>
          <Circle enable={active == 'true'}></Circle>
        </Container>
      );
    default:
      return <></>;
  }
};

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 30px;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;
const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 30px;
  background-color: ${(props) =>
    props.enable ? '#00B2A9' : 'rgba(54, 54, 54, 0.1)'};
`;
const Line = styled.div`
  display: flex;
  flex-grow: 1;
  height: 4px;
  background-color: ${(props) =>
    props.enable ? '#00B2A9' : 'rgba(54, 54, 54, 0.1)'};
`;
export default PacketCard;
