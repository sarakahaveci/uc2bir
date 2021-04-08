import styled from 'styled-components/macro';
import React from 'react';

import BluePlusIcon from 'assets/blue-plus.svg';

const PlusButton = ({ onClick, className }) => {
  return <Plus className={className} src={BluePlusIcon} onClick={onClick} />;
};

export default PlusButton;

const Plus = styled.img`
  flex: 0 0 27px;
  width: 27px;
  height: 27px;
  cursor: pointer;
`;
