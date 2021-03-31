import React from 'react';
import { useSelector } from 'react-redux';

import { LocationCard } from 'components';

function GymLocation() {
  const { userInfo } = useSelector((state) => state.userProfile.userInfo);

  return (
    <div>
      <LocationCard
        key={userInfo?.type_id}
        title={userInfo?.title}
        city={userInfo?.city}
        district={userInfo?.district}
        addressDetail={userInfo?.address_detail}
        hasMapLocation={userInfo?.lat && userInfo?.lng}
        location={{ lat: userInfo?.lat, lng: userInfo?.lng }}
      />
    </div>
  );
}

export default GymLocation;
