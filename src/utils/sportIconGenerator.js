import React from 'react';
import styled from 'styled-components/macro';

import { FITNESS, YOGA, PILATES, TENNIS } from '../constants';
import { Svg } from 'components';

const sportIconGenerator = (type, className, style) => {
  const icons = {
    [FITNESS]: <Svg.FitnessIcon />,
    [YOGA]: <Svg.YogaIcon />,
    [PILATES]: <Svg.PilatesIcon />,
    [TENNIS]: <Svg.TennisIcon />,
  };

  return (
    <StyledSpan className={className} style={style}>
      {icons[type]}
    </StyledSpan>
  );
};

export default sportIconGenerator;

const StyledSpan = styled.span`
  svg {
    width: 25px;
    height: 25px;
    margin-right: 15px;
  }
`;
