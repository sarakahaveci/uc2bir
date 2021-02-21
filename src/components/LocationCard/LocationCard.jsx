import React from 'react';
import PropTypes from 'prop-types';

import { Svg, Text } from 'components';

const LocationCard = ({ title, addressDetail }) => {
  return (
    <div className="locationCardWrapper">
      <div className="d-flex ml-2 p-3">
        <Svg.LocationIcon />
        <div className="infoTextArea">
          <Text className="titleText">{title}</Text>
          <Text className="subText">{addressDetail}</Text>
        </div>
      </div>
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
};

LocationCard.defaultProps = {
  title: 'Maçka Parkı',
  addressDetail: 'Cevdet Paşa Caddesi No : 52-54 Bebek - İstanbul',
};
