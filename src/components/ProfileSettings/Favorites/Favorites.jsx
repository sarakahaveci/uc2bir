import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components/macro';

import { Title, Pagination, Spinner, Box } from 'components';
import { getFavoriteUsers } from 'actions';
import { PERSONAL_TRAINER, WORK_PLACE, DIETITIAN } from '../../../constants';
import LongUserCard from 'components/UserCards/LongUserCard';
import SubTabs from 'components/SubTabs/SubTabs';

const subTabsData = [
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
    data: { data: favoriteUsers, totalPage },
    isLoading,
  } = useSelector(
    (state) => state.profileSettings2.favoriteSettings.favoriteUsers
  );
  const [userType, setUserType] = useState(PERSONAL_TRAINER);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavoriteUsers(userType, currentPage));
  }, [userType, currentPage]);

  const pageChangeHandler = (event, value) => setCurrentPage(value);

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else {
    content = favoriteUsers?.length ? (
      favoriteUsers.map((item, index) => (
        <Col
          lg={4}
          md={6}
          sm={12}
          key={'Favori' + index}
          style={{ paddingLeft: '35px', marginBottom: '20px' }}
        >
          <LongUserCard
            data={item}
            favoriteId={item.favorite_id}
            showHeartBg
            favoritedUser
          />
        </Col>
      ))
    ) : (
      <Col style={{ paddingLeft: '35px' }}>
        Herhangi bir favori kullancınız bulunmamaktır.
      </Col>
    );
  }

  return (
    <Box>
      <div>
        <Title
          textAlign="left"
          component="h5"
          fontWeight="bold"
          fontSize="1.1rem"
          paddingLeft="20px"
        >
          Favorilerim
        </Title>

        <SubTabs
          style={{ color: 'red' }}
          data={subTabsData}
          onChange={(item) => {
            setUserType(item.value);
            setCurrentPage(1);
          }}
          lineWidth="50%"
        />
      </div>

      <ContentRow>{content}</ContentRow>

      {!!totalPage && !isLoading && (
        <Pagination
          mt="150px"
          count={totalPage}
          page={currentPage}
          onChange={pageChangeHandler}
        />
      )}
    </Box>
  );
};

const ContentRow = styled(Row)`
  position: relative;
`;

export default Favorites;
