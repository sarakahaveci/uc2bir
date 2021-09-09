/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { device } from 'utils';
import { useTranslation } from 'react-i18next';

import LongUserCard from 'components/UserCards/LongUserCard';
import { Button, GoogleMapClusterer, Pagination, Svg, Title } from 'components';
import {
  searchGymForPt,
  addGymFromPt,
  getAllPTBranchList,
  searchGymWithDetail,
} from 'actions';

const AddGym = ({ setSubPage, setBannerActive }) => {
  const { t } = useTranslation();

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
  const [selectedItem, setSelectedItem] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [showSearch, setShowSearch] = useState(true);

  const pageChangeHandler = (event, value) => {
    dispatch(searchGymForPt(trainerName, value, location, branch));
    setPageNumber(value);
  };

  useEffect(() => {
    setBannerActive(false);
    dispatch(searchGymForPt(null, pageNumber));
    dispatch(getAllPTBranchList());
  }, []);

  const searchGymHandler = () => {
    dispatch(searchGymForPt(trainerName, pageNumber, location, branch));
    setShowSearch(true);
  };

  const addGymHandler = (user) => {
    dispatch(
      addGymFromPt(user.id, () => {
        setSubPage('gym-edit');
      })
    );
  };

  return (
    <>
      <div className="row">
        <Button
          text={t('< Back')}
          onClick={() => setSubPage('Adds')}
          fontSize="14pt"
          fontWeight="bold"
        />
        <Title fontSize="14pt" fontWeight="bold" color="#00b2a9">
          {t('Select Gym')}
        </Title>
      </div>
      <div className="d-flex w-75 mb-3 mx-auto">
        <Row className="search-trainer__search-area">
          <SearchCol>
            <input
              className="search-trainer__search-input"
              value={trainerName}
              onChange={(e) => setTrainerName(e.target.value)}
              placeholder={t('Gym name...')}
            />
          </SearchCol>

          <SearchCol>
            <div className="search-trainer__location-row">
              <Svg.LocationIcon className="mr-1 mb-1" />

              <input
                className="search-trainer__search-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t('Location...')}
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
              <option hidden>{t('Branches')}</option>
              {allBranchList?.map((item, index) => (
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
              text={t('Search')}
              search
              width="100%"
              maxWidth="150px"
              onClick={searchGymHandler}
            />
          </SearchCol>
        </Row>
      </div>
      <GoogleMapClusterer
        isSaloonMap
        defaultMarkerIcon={<Svg.FitnessIcon />}
        onSelected={(selected) => {
          setSelectedItem(data?.find((item) => item.id == selected));
        }}
        data={data}
      />
      <GymListWrapper>
        {data?.map((item, i) => (
          <LongUserWrapper key={item?.user_id}>
            <LongUserCard
              selected={false}
              data={item}
              city={item?.address?.city}
              district={item?.address?.district}
              hoverText={t('+ Add Gym')}
              showHeartBg
              isGym
              onClickHover={(id) => addGymHandler(id)}
            />
          </LongUserWrapper>
        ))}
      </GymListWrapper>

      <Pagination
        mt="100px"
        page={pageNumber}
        onChange={pageChangeHandler}
        count={totalPage}
      />
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

  @media (max-width: 1200px) {
    grid-template-columns: auto auto;
  }
  @media ${device.sm} {
    grid-template-columns: auto;
  }
`;

const SearchCol = styled(Col)`
  &:not(:last-child) {
    border-right: 1px solid #707070;
  }

  flex-basis: 20%;
`;

const LongUserWrapper = styled.div`
  margin: 20px;
`;

export default AddGym;
