import React from 'react';

import { Svg } from 'components';

const sportTypeIconGenerator = (type, className, style) => {
  const icons = {
    1: <Svg.FitnessSportIcon />,
    Fitness: <Svg.FitnessSportIcon />,
    2: <Svg.PilatesSportIcon />,
    Pilates: <Svg.PilatesSportIcon />,
    3: <Svg.YogaSportIcon />,
    Yoga: <Svg.YogaSportIcon />,
    4: <Svg.KickBoxSportIcon />,
    'Mücadele Sporları': <Svg.KickBoxSportIcon />,
    5: <Svg.TenisSportIcon />,
    Tenis: <Svg.TenisSportIcon />,
    6: <Svg.SwimSportIcon />,
    Yüzme: <Svg.SwimSportIcon />,
    7: <Svg.CimnastikSportIcon />,
    Jimnastik: <Svg.CimnastikSportIcon />,
    8: <Svg.AthleticSportIcon />,
  };

  return (
    <span className={className} style={style}>
      {icons[type] ?? icons[1]}
    </span>
  );
};

export default sportTypeIconGenerator;
