import styled, { css } from 'styled-components';
import { flexbox, space, layout } from 'styled-system';

const Col = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${(props) => props.margin && props.margin};

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

export default Col;