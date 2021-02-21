// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { space, typography } from 'styled-system';

import { colorGenerator } from '../../utils';

const StyledText = styled.div`
  font-family: ${(props) => props.fontFamily && props.fontFamily};
  padding: 7px 0;
  color: ${(props) => props.color || colorGenerator(props.color)};
  font-weight: ${(props) => props.fontWeight || '400'};
  font-size: ${(props) => props.fontSize || '1rem'};
  text-align: ${(props) => props.textAlign || 'initial'};
  margin: ${(props) => props.margin && props.margin};
  cursor: ${(props) => props.cursor && props.cursor};
  line-height: 120%;

  ${typography}
  ${space}
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
