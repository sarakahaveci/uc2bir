import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { Button, Svg } from 'components';
import { getAllPTBranchList, searchPt } from 'actions';
import SearchFilters from './SearchFilters';

const SearchTrainer = () => {
  const allBranchList = useSelector(
    (state) => state.profileSettings.ptBranchList.allList
  );

  const { pageNumber } = useSelector(
    (state) => state.profileSettings2.userSearch
  );

  const [showFilters, setShowFilters] = useState(false);
  const [trainerName, setTrainerName] = useState('');
  const [location, setLocation] = useState('');
  const [branch, setBranch] = useState(null);
  const [sort, setSort] = useState();
  const [classification, setClassification] = useState('');
  const [ratings, setRatings] = useState([]);
  const [price, setPrice] = useState([0, 500]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPTBranchList());
  }, []);

  const searchHandler = () => {
    const smallestRating = [...ratings].sort((a, b) => a - b)?.[0];

    dispatch(
      searchPt({
        name: trainerName,
        location_key: location,
        branch_id: branch,
        rating: smallestRating,
        sortColumn: sort,
        classification,
        price,
      })
    );
  };

  useEffect(() => {
    searchHandler();
  }, [pageNumber]);

  return (
    <Row className="search-trainer">
      <Col className="search-trainer__search-area-wrapper" lg={9}>
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
              {allBranchList.map((item) => (
                <option value={item.id}>{item.name}</option>
              ))}
            </Form.Control>
          </SearchCol>

          <SearchCol sm={12}>
            <FilterButton onClick={() => setShowFilters(!showFilters)}>
              Filtrele
            </FilterButton>

            {showFilters && (
              <SearchFilters
                searchHandler={searchHandler}
                classification={classification}
                setClassification={setClassification}
                ratings={ratings}
                setRatings={setRatings}
                price={price}
                setPrice={setPrice}
              />
            )}
          </SearchCol>

          <SearchCol className="pr-0">
            <Button
              justifyContent="space-around"
              display="flex"
              className="blue"
              alignItems="center"
              text="Ara"
              search
              width="100%"
              maxWidth="150px"
              onClick={searchHandler}
            />
          </SearchCol>
        </Row>
      </Col>

      <Col lg={3}>
        <Row className="search-trainer__sort-row">
          <Col lg={6} sm={12}>
            <Form.Control
              as="select"
              className="search-trainer__select search-trainer__select--bg"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option hidden>Sırala</option>
              <option hidden>Fiyata göre artan</option>
              <option hidden>Fiyata göre azalan</option>
              <option hidden>Alfabetik sıralama</option>
            </Form.Control>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SearchTrainer;

const FilterButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: white;
  z-index: 2;
`;

const SearchCol = styled(Col)`
  &:not(:last-child) {
    border-right: 1px solid #707070;
  }

  flex-basis: 20%;
`;
