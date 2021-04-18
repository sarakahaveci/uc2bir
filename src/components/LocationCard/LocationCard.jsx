import React from 'react';

import { Svg, Text } from 'components';
import SimpleGoogleMap from 'components/GoogleMaps/SimpleGoogleMap';

const LocationCard = ({
  title,
  addressDetail,
  location,
  hasMapLocation,
  city,
  district,
}) => {
  return (
    <div className="row locationCardWrapper">
      <div className="col-lg-2 col-md-3 col-xs-12">
        <Svg.LocationCardIcon />
      </div>
      <div className="infoTextArea col-lg-4  col-md-9 col-xs-12">
        <Text className="titleText">{title}</Text>
        <Text className="subText">
          {addressDetail} {city} - {district}
        </Text>
      </div>
      {hasMapLocation ? (
        <div className="col-12 col-lg-6 p-0">
          <SimpleGoogleMap location={location} />
        </div>
      ) : null}
      {/*  <div className="knock">
        <Svg.WhiteArrowUpIcon />
      </div> */}
    </div>
  );
};

export default LocationCard;
