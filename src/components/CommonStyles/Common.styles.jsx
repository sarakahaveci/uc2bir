import { css } from 'styled-components/macro';

export const scrollbar = css`
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-thumb {
    height: 62px;
    border-radius: 3px;
    background: rgba(155, 155, 155, 0.4);
  }
`;
