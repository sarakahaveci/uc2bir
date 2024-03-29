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

export const svgBackground = css`
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

export const pulse = css`
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }

    70% {
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }

    100% {
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }
`;
