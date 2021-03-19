import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { searchPt } from 'actions';
import { Title, Box, Spinner } from 'components';
import TrainerCard from './TrainerCard';

const Trainers = () => {
  const { data: foundUsers, isLoading } =
    useSelector((state) => state.profileSettings2.userSearch.foundUsers) || {};

  const dispatch = useDispatch();

  useEffect(() => {
    // TODO: There is no search feature for now, but it will be added soon.
    dispatch(searchPt());
  }, []);

  // const pageChangeHandler = (event, value) =>
  //   dispatch(setSearchFilters('pageNumber', value));

  return (
    <div>
      <Title textAlign="left" componet="h5" className="my-4">
        Eğitmenler
      </Title>

      <div className="trainers__wrapper">
        {isLoading ? (
          <Spinner />
        ) : (
          foundUsers?.data?.map((data, index) => (
            <Box key={index} col p="0 20px" width={[1, 1 / 2, 1 / 4]}>
              <TrainerCard data={data} />
            </Box>
          ))
        )}
      </div>

      {/* <Pagination page={pageNumber} onChange={pageChangeHandler} count={10} /> */}
    </div>
  );
};

export default Trainers;
