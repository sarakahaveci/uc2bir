import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { getPtGymList } from 'actions';
import LongUserCard from 'components/UserCards/LongUserCard';

const SportFields = ({ userId }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.userProfile.ptGymList);

  useEffect(() => {
    dispatch(getPtGymList(userId));
  }, []);

  return (
    <GymListWrapper>
      {data?.map((gym) => (
        <LongUserCard
          key={gym.id}
          data={gym}
          city={gym.city}
          district={gym.district}
          showHeartBg
        />
      ))}
    </GymListWrapper>
  );
};

const GymListWrapper = styled.div`
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: 300px 300px 300px 300px;
  grid-row-gap: 10px;
  padding: 10px;
  margin-top: 15px;

  @media (max-width: 1200px) {
    grid-template-columns: auto auto;
  }
  @media (max-width: 768px) {
    grid-template-columns: auto;
  }
`;

export default SportFields;
