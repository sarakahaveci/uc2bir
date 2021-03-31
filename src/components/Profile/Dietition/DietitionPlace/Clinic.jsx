import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getDietitianClinics } from 'actions';
import { LocationCard } from 'components';

export default function Clinic({ userId }) {
  const dispatch = useDispatch();
  const { clinic } = useSelector(
    (state) => state.userProfile?.dietitianClinic?.clinics
  );
  useEffect(() => {
    dispatch(getDietitianClinics(userId));
  }, []);

  return (
    <div>
      {clinic?.map((clinics) => (
        <LocationCard
          key={clinics?.id}
          title={clinics?.title}
          city={clinics?.city}
          district={clinics?.district}
          addressDetail={clinics?.address_detail}
          hasMapLocation={clinics?.lat && clinics?.lng}
          location={{ lat: clinics?.lat, lng: clinics?.lng }}
        />
      ))}
    </div>
  );
}
