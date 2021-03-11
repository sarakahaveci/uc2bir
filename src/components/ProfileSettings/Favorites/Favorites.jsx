import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import { Title, Box } from 'components';
import { getFavoriteUsers } from 'actions';
import { PERSONAL_TRAINER, WORK_PLACE, DIETITIAN } from '../../../constants';
import LongUserCard from 'components/UserCards/LongUserCard';
import SubTabs from 'components/SubTabs/SubTabs';

const subTabData = [
  {
    label: 'Eğitmenler',
    value: PERSONAL_TRAINER,
  },
  {
    label: 'Spor Alanları',
    value: WORK_PLACE,
  },
  {
    label: 'Diyetisyenler',
    value: DIETITIAN,
  },
];

const Favorites = () => {
  const {
    data: { data: favoriteUsers, currentPage, perPage, totalPage },
    isLoading,
  } = useSelector(
    (state) => state.profileSettings2.favoriteSettings.favoriteUsers
  );
  const [userType, setUserType] = useState(PERSONAL_TRAINER);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavoriteUsers(userType));
  }, [userType]);

  let content;

  if (isLoading) {
    content = <Spinner animation="border" variant="info" />;
  } else {
    content = favoriteUsers?.map((item) => (
      <LongUserCard data={item} showHeartBg />
    ));
  }

  return (
    <div>
      <div>
        <Title
          textAlign="left"
          component="h5"
          fontWeight="600"
          fontSize="1.5rem"
        >
          Favorilerim
        </Title>

        <SubTabs
          data={subTabData}
          onChange={(value) => setUserType(value)}
          lineWidth="50%"
        />
      </div>

      <Box position="relative">{content}</Box>
    </div>
  );
};

export default Favorites;
