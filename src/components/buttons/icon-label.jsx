import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const StyledLink = styled(Link)`
  span {
    font-size: ${(props) => (props.fontSize && props.fontSize) || '1rem'};
  }
`;

const IconLabel = (props) => {
  return (
    <StyledLink {...props} className={`icon-button ${props.className}`}>
      {props.icon && props.icon({ className: 'icon' })}
      <span>{props.text}</span>
    </StyledLink>
  );
};

export default IconLabel;
