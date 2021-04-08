import React from 'react';
import styled, { css } from 'styled-components/macro';
import { space } from 'styled-system';

import BluePlusIcon from 'assets/blue-plus.svg';
import DarkBluePlusIcon from 'assets/dark-blue-plus.svg';

const PlusButton = ({ type = 'light', onClick, className, ...restProps }) => {
  return (
    <Plus
      src={type === 'light' ? BluePlusIcon : DarkBluePlusIcon}
      className={className}
      onClick={onClick}
      type={type}
      {...restProps}
    />
  );
};

export default PlusButton;

const Plus = styled.img`
  width: ${(p) => (p.width ? p.width : '27px')};
  height: ${(p) => (p.height ? p.height : '27px')};
  cursor: pointer;

  ${(p) =>
    p.type === 'dark' &&
    css`
      width: 50px;
      height: 50px;
    `}

  ${space}
`;
