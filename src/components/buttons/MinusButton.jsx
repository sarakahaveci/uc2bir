import React from 'react';
import styled from 'styled-components/macro';
import { space } from 'styled-system';

import { Svg } from 'components';

const MinusButton = ({ onClick, width, height, ...restProps }) => {
  return (
    <Minus {...restProps} onClick={onClick} width={width} height={height} />
  );
};

export default MinusButton;

const Minus = styled(Svg.MinusIcon)`
  svg {
    width: ${(p) => (p.width ? p.width : '27px')};
    height: ${(p) => (p.height ? p.height : '27px')};
    cursor: pointer;
  }

  ${space}
`;
