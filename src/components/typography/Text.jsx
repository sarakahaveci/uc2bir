// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { space, typography, color } from 'styled-system';

const StyledText = styled.div`
  padding: 7px 0;
  cursor: ${(props) => props.cursor && props.cursor};
  line-height: 120%;

  ${color}
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
