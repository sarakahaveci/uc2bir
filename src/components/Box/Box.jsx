import styled, { css } from 'styled-components/macro';
import {
  space,
  layout,
  color,
  flexbox,
  border,
  typography,
  position,
} from 'styled-system';

const Box = styled.div`
  ${(p) =>
    p.row &&
    css`
      display: flex;
    `}

  ${(p) =>
    p.col &&
    css`
      display: flex;
      flex-direction: column;
    `}

    ${(p) =>
    p.center &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}

    cursor: ${(p) => p.cursor && p.cursor};

  ${position}
  ${space}
  ${layout}
  ${color}
  ${flexbox}
  ${border}
  ${typography}
`;

export default Box;
