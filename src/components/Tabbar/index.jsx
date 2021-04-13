import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { device } from 'utils';
const Tabbar = ({ onSelect = () => {}, defaultSelected = null, tabs = [] }) => {
  const [selectedValue, setSelectedValue] = useState(defaultSelected);

  return (
    <Container>
      {tabs.map((elm, index) => (
        <Tab
          onClick={() => {
            setSelectedValue(elm.value);
            onSelect(elm.value);
          }}
          key={index}
        >
          <BoldText selected={selectedValue == elm.value}>{elm.text}</BoldText>
        </Tab>
      ))}
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
`;
const Tab = styled.button`
  padding: 20px;
  background: white;
`;
const BoldText = styled.text`
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => (props.selected ? '#00B2A9' : '#909090')};
  @media ${device.sm} {
    font-size: 0.7rem;
  }
`;
export default Tabbar;
