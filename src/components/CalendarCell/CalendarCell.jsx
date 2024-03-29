import React from 'react';
import styled, { css } from 'styled-components/macro';

export default function CalendarCell({
  children,
  onClick = () => {},
  isActive,
  halfActive,
  disabled,
  ...restProps
}) {
  const onClickHandler = () => {
    if (disabled || isActive) {
      return;
    }

    onClick();
  };

  return (
    <Cell
      onClick={onClickHandler}
      isActive={isActive}
      halfActive={halfActive}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </Cell>
  );
}

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
  margin: 10px 10px 0 0;

  ${(p) =>
    p.type === 'day' &&
    css`
      width: 69px;
      height: 69px;
      background-color: ${p.theme.colors.white4};
      color: ${p.theme.colors.gray1};
      font-size: 0.9rem;
      border-radius: 12px;

      ${(p) =>
        p.isActive &&
        css`
          background-color: ${p.theme.colors.blue};
          color: white;
          height: 91px;
          cursor: not-allowed;
        `}
    `}

  ${(p) =>
    p.type === 'time' &&
    css`
      width: 66px;
      height: 45px;
      border-radius: 15px;
      background: #fff;
      border: 1px solid ${p.theme.colors.gray9};
      padding: 5px;
      color: ${(p) => p.theme.colors.gray1};

      ${p.size === 'large' &&
      css`
        width: 120px;
      `}

      ${(p) =>
        p.halfActive &&
        css`
          background-color: ${p.theme.colors.blue};
          border-color: ${p.theme.colors.blue};
          color: white;
        `}

      ${(p) =>
        p.isActive &&
        css`
          background-color: ${p.theme.colors.blue};
          border-color: ${p.theme.colors.blue};
          color: white;
          cursor: not-allowed;
        `}
    `}
`;
