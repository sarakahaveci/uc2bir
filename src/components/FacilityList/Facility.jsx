import React from 'react';
import styled from 'styled-components/macro';

import DoubleTickIcon from 'assets/double-tick.svg';

function Facility({ name }) {
  return (
    <Wrapper>
      <img src={DoubleTickIcon} alt={name} />
      <StyledText>{name}</StyledText>
    </Wrapper>
  );
}

const StyledText = styled.div`
  font-size: 15px;
  line-height: 17px;
  text-align: left;
  color: #1a1818;
  margin-left: 2px;
`;

const Wrapper = styled.div`
  display: flex;
  margin-right: 20px;
  margin-bottom: 10px;
  align-items: center;
  width: 200px;
`;

export default Facility;
