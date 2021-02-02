// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { colorGenerator } from '../../utils';

const StyledText = styled.div`
  padding: 15px 0;
  color: ${(props) => colorGenerator(props.color)};
  font-weight: ${(props) => props.fontWeight || '400'};
  font-size: ${(props) => props.fontSize || '1.6rem'};
  text-align: ${(props) => props.textAlign || 'initial'};
`;

const Text = (props) => (
  <StyledText
    {...props}
    className={`typography ${props.className ? props.className : ''}`}
  >
    {props.children}
  </StyledText>
);

export default Text;
