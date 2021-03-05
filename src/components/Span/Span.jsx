import styled, { css } from 'styled-components';
import { flexbox, space, typography, color, border } from 'styled-system';

const Span = styled.span`
  text-decoration: ${(p) => p.textDecoration && p.textDecoration};
  text-transform: ${(p) => p.textTransform && p.textTransform};
  cursor: ${(p) => p.cursor && p.cursor};
  position: relative;

  ${(p) =>
    p.underline &&
    css`
      &:after {
        content: '';
        position: absolute;
        bottom: -5px;
        width: ${(p) => (p.lineWidth ? p.lineWidth : '25%')};
        height: 2px;
        left: 0;
        background-color: ${p.theme.colors.blue};
      }
    `}

  ${border}
  ${space}
  ${typography}
  ${flexbox}
  ${color}
`;

export default Span;
