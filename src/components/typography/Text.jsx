import React from 'react';
import styled, { css } from 'styled-components';
import { space, typography, color, flexbox, border } from 'styled-system';

const StyledText = styled.div`
  padding: 7px 0;
  position: relative;
  cursor: ${(p) => p.cursor && p.cursor};
  line-height: 120%;
  text-transform: ${(p) => p.textTransform && p.textTransform};
  line-height: ${(p) => p.lineHeight && p.lineHeight};
  min-width: ${(p) => p.minWidth && p.minWidth};
  width: ${(p) => p.width && p.width};

  ${(p) =>
    p.underline &&
    css`
      &:after {
        content: '';
        width: 10%;
        background: ${p.theme.colors.blue};
        height: 2px;
        margin-top: 5px;
        display: block;
      }
    `}

  ${border};
  ${flexbox};
  ${color};
  ${typography};
  ${space};
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
