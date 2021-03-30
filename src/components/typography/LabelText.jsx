import React from 'react';
import styled from 'styled-components';
import { color } from 'styled-system';

const StyledLabelText = styled.div`
  ${color}

  font-weight: ${(props) => props.fontWeight || '400'};
  font-size: ${(props) => props.fontSize || '1.6rem'};
  text-align: ${(props) => props.textAlign || 'left'};
`;

const LabelText = ({
  label,
  labelClassName = '',
  textClassName = '',
  children,
  className,
  ...rest
}) => {
  return (
    <StyledLabelText className={`typography label-text ${className}`} {...rest}>
      <label className={`label ${labelClassName}`}>{label}</label>
      <div className={`text ${textClassName}`}>{children}</div>
    </StyledLabelText>
  );
};

export default LabelText;
