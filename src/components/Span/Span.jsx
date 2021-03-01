import styled from 'styled-components';
import { flexbox, space, typography, color, border } from 'styled-system';

const Span = styled.span`
  text-decoration: ${(p) => p.textDecoration && p.textDecoration};
  text-transform: ${(p) => p.textTransform && p.textTransform};
  cursor: ${(p) => p.cursor && p.cursor};

  ${border}
  ${space}
  ${typography}
  ${flexbox}
  ${color}
`;

export default Span;
