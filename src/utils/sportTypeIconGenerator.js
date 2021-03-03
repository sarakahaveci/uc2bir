import React from 'react';
import styled from 'styled-components/macro';

import { Svg } from 'components';

const sportTypeIconGenerator = (type, className, style) => {
  const icons = {
    8: <Svg.AthleticSportIcon />,
    1: <Svg.FitnessSportIcon />,
    7: <Svg.CimnastikSportIcon />,
    4: <Svg.KickBoxSportIcon />,
    2: <Svg.PilatesSportIcon />,
    6: <Svg.SwimSportIcon />,
    5: <Svg.TenisSportIcon />,
    3: <Svg.YogaSportIcon />,
  };

  return (
    <StyledSpan className={className} style={style}>
      {icons[type]}
    </StyledSpan>
  );
};

export default sportTypeIconGenerator;

const StyledSpan = styled.span`
  svg {
    width: 60px;
    height: 60px;
    margin-left: 55%;
    margin-bottom: 5px;
  }
`;
