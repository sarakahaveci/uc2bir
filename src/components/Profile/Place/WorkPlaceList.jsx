import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LocationCard } from 'components';
import { getPtWorkingHomePlace } from 'actions';

export default function WorkPlace() {
  const dispatch = useDispatch();

  const { data } = useSelector(
    (state) => state.userProfile.workPlace.ptHomePlace
  );

  useEffect(() => {
    dispatch(getPtWorkingHomePlace());
  }, []);

  return (
    <div>
      {data?.home_park?.map((workPlace) => (
        <LocationCard
          key={workPlace.id}
          title={workPlace.city}
          city={workPlace.city}
          district={workPlace.district}
          addressDetail={workPlace.addressDetail}
          hasMapLocation={false}
        />
      ))}
    </div>
  );
}
