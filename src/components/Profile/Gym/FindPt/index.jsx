import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { device } from 'utils';

import { getGymPtList } from 'actions';
import { Pagination } from 'components';
import LongUserCard from 'components/UserCards/LongUserCard';

function FindPt({ userId }) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.userProfile.gymPtList);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getGymPtList(userId, page));
  }, [page]);

  const pageChangeHandler = (event, value) => setPage(value);

  return (
    <div>
      {data?.data?.length > 0 ? (
        <>
          <GymListWrapper>
            {data?.data?.map((gym) => (
              <LongUserCard
                key={gym.name}
                data={gym}
                city={gym.city}
                district={gym.district}
                showHeartBg
              />
            ))}
          </GymListWrapper>
          <Pagination
            mt="50px"
            count={data?.totalPage}
            page={page}
            onChange={pageChangeHandler}
          />
        </>
      ) : (
        <div className="d-flex">
          <strong className="mx-auto">
            İş Yerine kayıtlı herhangi bir eğitmen bulunmamaktadır.
          </strong>
        </div>
      )}
    </div>
  );
}

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
  @media ${device.sm} {
    grid-template-columns: auto;
  }
`;

export default FindPt;
