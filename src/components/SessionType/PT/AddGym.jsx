/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import SearchBar from 'material-ui-search-bar';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import Pagination from '@material-ui/lab/Pagination';

import LongUserCard from 'components/UserCards/LongUserCard';
import { Button } from 'components';
import { searchGymForPt, addGymFromPt } from 'actions';

const AddGym = ({ setSubPage, setBannerActive }) => {
  const dispatch = useDispatch();
  const { totalPage, data } = useSelector(
    (state) => state.profileSettings2.sessionType.searchGym
  );

  const [title, setTitle] = useState('');
  const [showSearch, setShowSearch] = useState(true);

  const [page, setPage] = React.useState(1);
  const handleChangePage = (event, value) => {
    setPage(value);
    dispatch(searchGymForPt(title, value));
  };

  useEffect(() => {
    setBannerActive(false);
    dispatch(searchGymForPt());
  }, []);

  const searchGymHandler = () => {
    dispatch(searchGymForPt(title));
    setShowSearch(true);
  };

  const addGymHandler = (id) => {
    dispatch(addGymFromPt(id, () => {}));
  };

  return (
    <>
      <div className="row">
        <Button text="< Geri" onClick={() => setSubPage('Adds')} />
        <Button text="Spor Salonu Seçiniz." />
      </div>
      <div className="row">
        <SearchBar
          id="search"
          name="search"
          className="regular-search-box w-75"
          value={title}
          onChange={setTitle}
          placeholder="Salon arayın!"
          onCancelSearch={() => {
            dispatch(searchGymForPt());
            setTitle('');
          }}
        />
        <Button className="blue ml-2" text="Ara" onClick={searchGymHandler} />
      </div>
      <GymListWrapper>
        {showSearch &&
          data?.map((gym) => (
            <LongUserCard
              key={gym.id}
              data={gym}
              city={gym.address.city}
              district={gym.address.district}
              hoverText="+ Salonu Ekle"
              showHeartBg
              isGym
              onClickHover={(id) => addGymHandler(id)}
            />
          ))}
      </GymListWrapper>
      <div className="d-flex w-100 mt-3">
        <Pagination
          className="mx-auto"
          count={totalPage}
          page={page}
          onChange={handleChangePage}
        />
      </div>
    </>
  );
};

const GymListWrapper = styled.div`
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: 300px 300px 300px 300px;
  grid-row-gap: 10px;
  padding: 10px;
  margin-top: 15px;
`;

export default AddGym;
