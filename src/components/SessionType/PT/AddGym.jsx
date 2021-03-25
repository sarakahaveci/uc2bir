/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import Pagination from '@material-ui/lab/Pagination';

import LongUserCard from 'components/UserCards/LongUserCard';
import { Button, GoogleMapClusterer, Svg } from 'components';
import {
  searchGymForPt,
  addGymFromPt,
  getAllPTBranchList,
  searchGymWithDetail,
} from 'actions';

const AddGym = ({ setSubPage, setBannerActive }) => {
  const dispatch = useDispatch();
  const { totalPage, data } = useSelector(
    (state) => state.profileSettings2.sessionType.searchGym
  );

  const allBranchList = useSelector(
    (state) => state.profileSettings.ptBranchList.allList
  );

  const [location, setLocation] = useState('');
  const [trainerName, setTrainerName] = useState('');
  const [branch, setBranch] = useState('');

  const [showSearch, setShowSearch] = useState(true);
  const [page, setPage] = useState(1);

  const handleChangePage = (event, value) => {
    setPage(value);
    dispatch(searchGymForPt(trainerName, value));
  };

  useEffect(() => {
    setBannerActive(false);
    dispatch(searchGymForPt());
  }, []);

  useEffect(() => {
    dispatch(getAllPTBranchList());
  }, []);

  const searchGymHandler = () => {
    dispatch(searchGymWithDetail(trainerName, page, location, branch));
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
      <div className="d-flex w-75 mb-3 mx-auto">
        <Row className="search-trainer__search-area">
          <SearchCol>
            <input
              className="search-trainer__search-input"
              value={trainerName}
              onChange={(e) => setTrainerName(e.target.value)}
              placeholder="Eğitmen adı..."
            />
          </SearchCol>

          <SearchCol>
            <div className="search-trainer__location-row">
              <Svg.LocationIcon className="mr-1 mb-1" />

              <input
                className="search-trainer__search-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Lokasyon..."
              />
            </div>
          </SearchCol>

          <SearchCol>
            <Form.Control
              as="select"
              className="search-trainer__select"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option hidden>Branşlar</option>
              {allBranchList.map((item, index) => (
                <option key={'option' + index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Form.Control>
          </SearchCol>

          <SearchCol className="pr-0">
            <Button
              justifyContent="space-around"
              display="flex"
              className="blue w-100 ml-auto"
              alignItems="center"
              text="Ara"
              search
              width="100%"
              maxWidth="150px"
              onClick={searchGymHandler}
            />
          </SearchCol>
        </Row>
      </div>
      <GoogleMapClusterer data={data} />
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

const SearchCol = styled(Col)`
  &:not(:last-child) {
    border-right: 1px solid #707070;
  }

  flex-basis: 20%;
`;

export default AddGym;
