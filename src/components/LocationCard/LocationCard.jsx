import React from 'react';
import PropTypes from 'prop-types';

import { Svg, Text } from 'components';
import SimpleGoogleMap from 'components/GoogleMaps/SimpleGoogleMap';

const LocationCard = ({ title, addressDetail, location, hasMapLocation }) => {
  return (
    <div class="row locationCardWrapper">
      <div class="col-lg-2 col-md-3 col-xs-12">
        <Svg.LocationIcon />
      </div>
      <div class="infoTextArea col-lg-4  col-md-9 col-xs-12">
        <Text className="titleText">{title}</Text>
        <Text className="subText">{addressDetail}</Text>
      </div>
      {hasMapLocation && (
        <div class="col-12 col-lg-6 p-0">
          <SimpleGoogleMap location={location} />
        </div>
      )}
      <div className="knock">
        <Svg.ArrowUpIcon />
      </div>
    </div>
  );
};

export default LocationCard;

LocationCard.propTypes = {
  title: PropTypes.string.isRequired,
  addressDetail: PropTypes.string.isRequired,
  location: PropTypes.object,
  hasMapLocation: PropTypes.bool,
};

LocationCard.defaultProps = {
  title: 'Maçka Parkı',
  addressDetail: 'Cevdet Paşa Caddesi No : 52-54 Bebek - İstanbul',
  hasMapLocation: true,
  location: { lat: 41.015137, lng: 28.97953 },
};
