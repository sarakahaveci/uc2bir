import React from 'react';
import styled, { css } from 'styled-components/macro';

import { AwesomeIcon } from 'components';

const Stars = ({ rating, position }) => {
  return (
    <StarsList position={position}>
      <Star isActive={rating > 0}>
        <AwesomeIcon.StarSolid />
      </Star>

      <Star isActive={rating > 1}>
        <AwesomeIcon.StarSolid />
      </Star>

      <Star isActive={rating > 2}>
        <AwesomeIcon.StarSolid />
      </Star>

      <Star isActive={rating > 3}>
        <AwesomeIcon.StarSolid />
      </Star>

      <Star isActive={rating > 4}>
        <AwesomeIcon.StarSolid />
      </Star>
    </StarsList>
  );
};

export default Stars;

const StarsList = styled.ul`
  display: flex;
  position: absolute;
  left: 0px;
  padding: 5px 15px 10px 10px;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.7);

  ${(p) =>
    p.position === 'bottom' &&
    css`
      bottom: 0px;
      border-top-right-radius: 30px;
      border-top-left-radius: 30px;
    `}

  ${(p) =>
    p.position === 'top' &&
    css`
      top: 0px;
      border-bottom-right-radius: 30px;
    `}
`;

const Star = styled.li`
  margin: 0px;
  cursor: pointer;

  svg {
    color: #ccc;
    width: 12px;
    height: 12px;
  }

  ${(p) =>
    p.isActive &&
    css`
      svg {
        color: #FFBA00;
      }
    `}
`;
