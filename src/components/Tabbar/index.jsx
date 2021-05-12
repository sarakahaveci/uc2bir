import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { device } from 'utils';
const Tabbar = ({
  onSelect = () => {},
  defaultSelected = null,
  tabs = [],
  rightButton = <></>,
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultSelected);

  return (
    <>
      <Container>
        {tabs.map((elm, index) => (
          <Tab
            onClick={() => {
              setSelectedValue(elm.value);
              onSelect(elm.value);
            }}
            key={index}
          >
            <BoldText selected={selectedValue === elm.value}>
              {elm.text}
            </BoldText>
            {elm?.notify > 0 && <Notify>{elm?.notify}</Notify>}
          </Tab>
        ))}
        {rightButton}
      </Container>
    </>
  );
};
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
`;

const Notify = styled.div`
  border-radius: 100%;
  background: ${(p) => p.theme.colors.blue};
  right: 0;
  top: 5px;
  font-size: 6pt;
  font-weight: bold;
  margin-top: -5px;
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 3px;
  color: white;
`;

const Tab = styled.button`
  display: flex;
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
