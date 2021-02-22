import styled, { css } from 'styled-components';
import { flexbox, space } from 'styled-system';

const Row = styled.div`
  display: flex;
  margin: ${(props) => props.margin && props.margin};

  ${flexbox}
  ${space}

  ${(p) =>
    p.center &&
    css`
      justify-content: center;
      align-items: center;
    `}
`;

export default Row;
