import React from 'react';
import styled, { css } from 'styled-components';
import { Button as BaseButton } from 'react-bootstrap';

const StyledButton = styled(BaseButton)`
  color: black;
  font-size: 1rem;
  font-weight: ${(props) => (props.fontWeight && props.fontWeight) || 'normal'};
  border-radius: 4px;
  margin: ${(props) => props.margin && props.margin};

  ${(props) =>
    props.soft &&
    css`
      background: transparent;
      color: white;
      border-radius: 0;
      padding: 15px 40px;
      position: relative;

      &:after {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        background: radial-gradient(rgb(56, 56, 56), rgba(163, 163, 163, 0.53));
        transform: matrix(1, 0, -0.7, 1, 0, 0);
      }
    `}

  ${(props) =>
    props.perspective &&
    css`
      background-color: ${(props) =>
        (props.bgColor && props.bgColor) || 'transparent'};
      position: relative;
      color: #fff;
      padding: 15px 30px;
      border-radius: unset;

      &:after {
        top: 0;
        left: 0;
        z-index: -1;
        display: block;
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        background: var(--light-blue);
        transform: matrix(1, 0, -0.4, 1, 0, 0);
      }
    `}

    ${(props) =>
    props.lineButton &&
    css`
      background: transparent;
      font-weight: bold;
      border-radius: 0;
      color: var(--light-blue);
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;

      &:after {
        display: block;
        content: '';
        width: 90px;
        height: 2px;
        background: var(--light-blue);
        margin-top: 5px;
      }
    `}

    ${(props) =>
    !!props.icon &&
    css`
      span {
        font-size: ${props.fontSize && props.fontSize};
      }
    `};
`;

const Button = ({ onClick, icon, variant, className, text, ...restProps }) => (
  <StyledButton
    {...restProps}
    onClick={onClick}
    variant=""
    className={icon ? `icon-button ${className}` : className}
  >
    {icon && icon({ className: 'icon' })}
    <span>{text}</span>
  </StyledButton>
);

export default Button;
