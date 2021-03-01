import styled, { css } from 'styled-components/macro';
import { flexbox, space, layout } from 'styled-system';

const Row = styled.div`
  display: flex;
  cursor: ${(p) => p.cursor && p.cursor};

  ${flexbox}
  ${space}
  ${layout}

  ${(p) =>
    p.center &&
    css`
      justify-content: center;
      align-items: center;
    `}
`;

export default Row;
