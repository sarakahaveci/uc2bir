import styled, { css } from 'styled-components';

const Row = styled.div`
  display: flex;
  margin: ${(props) => props.margin && props.margin};

  ${(p) =>
    p.center &&
    css`
      justify-content: center;
      align-items: center;
    `}
`;

export default Row;
