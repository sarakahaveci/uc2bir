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

export const redBackground = css`
  width: 90px;
  height: 90px;
  background-color: ${(p) => p.theme.colors.red};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;
