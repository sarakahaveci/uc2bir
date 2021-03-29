import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LocationCard } from 'components';
import { getPtWorkingHomePlace } from 'actions';

export default function WorkPlace({ userId }) {
  const dispatch = useDispatch();

  const { data } = useSelector(
    (state) => state.userProfile.workPlace.ptHomePlace
  );

  useEffect(() => {
    dispatch(getPtWorkingHomePlace(userId));
  }, []);

  return (
    <div>
      {data?.home_park?.length > 0 ? (
        data?.home_park?.map((workPlace) => (
          <LocationCard
            key={workPlace.id}
            title={workPlace.city}
            city={workPlace.city}
            district={workPlace.district}
            addressDetail={workPlace.addressDetail}
            hasMapLocation={false}
          />
        ))
      ) : (
        <div className="d-flex">
          <strong className="mx-auto">
            Kullanıcıya ait Ev Park bulunmamaktadır.
          </strong>
        </div>
      )}
    </div>
  );
}
