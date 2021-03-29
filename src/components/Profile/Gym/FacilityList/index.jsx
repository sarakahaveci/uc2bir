import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import Facility from 'components/FacilityList/Facility';
import { getGymFacility } from 'actions';

function FacilityList({ userId }) {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.userProfile.gymFacility);

  useEffect(() => {
    dispatch(getGymFacility(userId));
  }, []);

  return (
    <Wrapper>
      {list?.map((item) => (
        <Facility key={item} name={item} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: #8e8d8b0f;
  padding: 10px;
  border: 1px solid #00000047;
  box-shadow: 2px 3px 18px rgba(0, 0, 0, 0.09);
`;

export default FacilityList;
