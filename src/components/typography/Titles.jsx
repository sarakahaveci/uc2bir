// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import { colorGenerator } from '../../utils';

const StyledTitle = styled(Typography)`
  font-family: ${(props) => (props.fontFamily && props.fontFamily) || 'Poppins, sans-serif'} !important;
  color: ${(props) => props.color && colorGenerator(props.color)};
  font-weight: ${(props) => props.fontWeight || 'bold'} !important;
  font-size: ${(props) => props.fontSize && props.fontSize} !important;
  text-align: center;
  display: block;
`;

const Titles = ({
  component,
  textRight,
  textLeft,
  lineDisable = false,
  color = "dark",
  children,
  ...rest
}) => (
  <StyledTitle
    gutterBottom
    className={`typography title ${lineDisable ? '' : 'line'} ${
      textLeft ? 'text-left' : ''
    } ${textRight ? 'text-right' : ''}`}
    color={color} 
    {...rest}
  >
    {children}
  </StyledTitle>
);

export default Titles;
