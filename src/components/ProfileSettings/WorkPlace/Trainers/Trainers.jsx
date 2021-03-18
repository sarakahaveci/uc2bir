/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Title, Text, Box, Pagination, Spinner } from 'components';
import { setSearchFilters } from 'actions';
import TrainerCard from './TrainerCard';
import SearchTrainer from './SearchTrainer';

const Trainers = () => {
  const {
    pageNumber,
    foundUsers: { data: foundUsers, isLoading },
  } = useSelector((state) => state.profileSettings2.userSearch);

  const dispatch = useDispatch();

  const pageChangeHandler = (event, value) =>
    dispatch(setSearchFilters('pageNumber', value));

  return (
    <div>
      <Title textAlign="left" componet="h5" className="my-4">
        Eğitmenler
      </Title>

      <Text
        color="gray3"
        fontSize="1rem"
        fontWeight="500"
        mb="10px"
        fontStyle="italic"
      >
        "Eğitmenler için {30} sonuç listeleniyor"
      </Text>

      <SearchTrainer />

      <div className="trainers__wrapper">
        {isLoading ? (
          <Spinner />
        ) : (
          foundUsers.map((data, index) => (
            <Box key={index} col p="0 20px" width={[1, 1 / 2, 1 / 4]}>
              <TrainerCard
                fullName="Nazlı Parlak"
                description="Fitness Eğitmeni"
                location="İstanbul, Beşiktaş"
                fee="150"
              />
            </Box>
          ))
        )}

        <Box col p="0 20px" width={[1, 1 / 2, 1 / 4]}>
          <TrainerCard
            fullName="Nazlı Parlak"
            description="Fitness Eğitmeni"
            location="İstanbul, Beşiktaş"
            fee="150"
          />
        </Box>

        <Box col p="0 20px" width={[1, 1 / 2, 1 / 4]}>
          <TrainerCard
            fullName="Nazlı Parlak"
            description="Fitness Eğitmeni"
            location="İstanbul, Beşiktaş"
            fee="150"
          />
        </Box>

        <Box col p="0 20px" width={[1, 1 / 2, 1 / 4]}>
          <TrainerCard
            fullName="Nazlı Parlak"
            description="Fitness Eğitmeni"
            location="İstanbul, Beşiktaş"
            fee="150"
          />
        </Box>
      </div>

      <Pagination page={pageNumber} onChange={pageChangeHandler} count={10} />
    </div>
  );
};

export default Trainers;
