import React from 'react';
import styled from 'styled-components';

import { colorGenerator } from '../../utils';

const StyledTitle = styled.h1`
  color: ${(props) => colorGenerator(props.color)};
  font-weight: ${(props) => props.fontWeight || 'bold'};
  text-align: center;
  display: block;
`;

const Title = ({
  component,
  textRight,
  textLeft,
  lineDisable,
  children,
  ...rest
}) => (
  <StyledTitle
    as={`${component}`}
    className={`${lineDisable ? '' : 'line'} ${textLeft ? 'text-left' : ''} ${
      textRight ? 'text-right' : ''
    }`}
    {...rest}
  >
    {children}
  </StyledTitle>
);

export default Title;
