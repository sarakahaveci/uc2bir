import React from 'react';
import styled from 'styled-components';
import { Button as BaseButton } from 'react-bootstrap';
import { color, space, } from 'styled-system';
import Svg from 'components/statics/svg';
import debounce from 'lodash/debounce';

const ReservationHourButton = ({
    onClick = () => {},
    icon,
    className,
    text,
    isLoading,
    ...restProps
  }) => {
  const debouncedClick = debounce(onClick, 200);

  const onClickHandler = () => {
    if (restProps.disabled && isLoading) {
      return;
    } else {
      debouncedClick();
    }
  };

  return (
    <StyledButton
      onClick={onClickHandler}
      variant=""
      className={icon ? `icon-button ${className}` : className}
      {...restProps}
    >
      <Clock />
      <span>{text}</span>
      <ArrowRight />

    </StyledButton>
  );
};

export default ReservationHourButton;

const StyledButton = styled(BaseButton)`
  font-size: ${(props) => (props.fontSize && props.fontSize) || '1rem'};
  font-weight: ${(props) => (props.fontWeight && props.fontWeight) || 'bold'};
  border-radius: 10px;
  background: #F8F8F8 !important;
  color: #1A1818 !important;
  width: ${(props) => props.width && props.width};
  display: flex;
  flex-direction: row;
  ${color}
  ${space}


  &:hover {
    ${color}
  }
`;

const Clock = styled(Svg.ClockIcon)`
  margin-right: 15px;
`;

const ArrowRight = styled(Svg.ArrowRightIcon)`
  fill: black;
  display: flex;
  justify-content: flex-end;
  flex: 1;
`;
