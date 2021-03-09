import styled from 'styled-components/macro';

import React from 'react';
import Svg from 'components/statics/svg';

const PlusButton = () => {
  return (
    <Plus>
      <Svg.PlusIcon />
    </Plus>
  );
};

export default PlusButton;

const Plus = styled.button`
  flex: 0 0 27px;
  width: 27px;
  height: 27px;
  background-color: ${(p) => p.theme.colors.blue2};
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
