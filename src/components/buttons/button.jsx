import React from 'react';
import styled, { css } from 'styled-components';
import { Button as BaseButton, Spinner } from 'react-bootstrap';
import { color, space, layout, flexbox } from 'styled-system';
import Svg from 'components/statics/svg';

const StyledButton = styled(BaseButton)`
  font-size: ${(props) => (props.fontSize && props.fontSize) || '1rem'};
  font-weight: ${(props) => (props.fontWeight && props.fontWeight) || 'normal'};
  border-radius: 4px;
  min-height: 45px;
  background: ${(props) =>
    !props.transparentDisabled && props.disabled && '#8CDEDA !important'};
  color: ${(props) =>
    props.transparentDisabled && `${props.theme.colors.gray2} !important`};
  width: ${(props) => props.width && props.width};
  cursor: ${(props) => props.disabled && 'not-allowed !important'};

  ${color}
  ${space}
  ${layout}
  ${flexbox}

  &:hover {
    ${color}
  }

  ${(props) =>
    props.light &&
    css`
      border: 1px solid rgba(144, 144, 144, 0.3);
      width: 100%;

      &:focus {
        border: 1px solid rgba(144, 144, 144, 0.5);
      }
    `}

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
        background: ${props.theme.colors.blue};
        transform: matrix(1, 0, -0.4, 1, 0, 0);
      }
    `}

    ${(props) =>
    props.lineButton &&
    css`
      background: transparent;
      font-weight: bold;
      border-radius: 0;
      color: ${props.theme.colors.blue};
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;

      &:after {
        display: block;
        content: '';
        width: 90px;
        height: 2px;
        background: ${props.theme.colors.blue};
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

  ${(props) =>
    props.type === 'text' &&
    css`
      background-color: transparent !important;
      color: ${(p) => p.disabled && p.theme.colors.disabled};
    `}
`;

const Search = styled(Svg.Search)`
  fill: white;
`;

const Button = ({
  onClick = () => {},
  icon,
  className,
  text,
  isLoading,
  search,
  ...restProps
}) => {
  const onClickHandler = () => {
    if (restProps.disabled) {
      return;
    } else {
      onClick();
    }
  };

  return (
    <StyledButton
      onClick={onClickHandler}
      variant=""
      className={icon ? `icon-button ${className}` : className}
      {...restProps}
    >
      {icon && icon({ className: 'icon' })}

      {isLoading ? (
        <Spinner animation="border" variant="light" size="md" />
      ) : (
        <>
          <span>{text}</span>
          {search && <Search />}
        </>
      )}
    </StyledButton>
  );
};

export default Button;
