import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import Facility from 'components/FacilityList/Facility';
import { getGymFacility } from 'actions';

function FacilityList({ userId }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.userProfile.gymFacility);

  useEffect(() => {
    dispatch(getGymFacility(userId));
  }, []);

  return list.length > 0 ? (
    <Wrapper>
      {list?.map((item) => (
        <Facility key={item} name={item} />
      ))}
    </Wrapper>
  ) : (
    <div className="d-flex">
      <strong className="mx-auto">
        {t('There are no facilities registered with the Workplace')}
      </strong>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: #8e8d8b0f;
  padding: 10px;
  box-shadow: 2px 3px 18px rgba(0, 0, 0, 0.09);
`;

export default FacilityList;
