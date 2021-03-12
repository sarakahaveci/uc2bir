import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Svg } from 'components';
import { getAllPTBranchList } from 'actions';
import SearchFilters from './SearchFilters';

const SearchTrainer = () => {
  const allBranchList = useSelector(
    (state) => state.profileSettings.ptBranchList.allList
  );

  const [showFilters, setShowFilters] = useState();
  const [trainerName, setTrainerName] = useState();
  const [location, setLocation] = useState();
  const [branch, setBranch] = useState();
  const [sort, setSort] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPTBranchList());
  }, []);

  return (
    <div className="search-trainer">
      <Row className="search-trainer__search-area">
        <Col lg={3}>
          <input
            className="search-trainer__search-input"
            value={trainerName}
            onChange={(e) => setTrainerName(e.target.value)}
            placeholder="Eğitmen adı..."
          />
        </Col>

        <Col lg={3}>
          <div className="search-trainer__location-row">
            <Svg.LocationIcon className="mr-1 mb-1" />

            <input
              className="search-trainer__search-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Lokasyon..."
            />
          </div>
        </Col>

        <Col lg={2}>
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
        </Col>

        <Col lg={2} className="pr-0">
          <Button
            justifyContent="space-around"
            display="flex"
            className="blue"
            alignItems="center"
            text="Ara"
            search
            width="100%"
            maxWidth="150px"
          />
        </Col>
      </Row>

      <Row className="search-trainer__sort-row">
        <Col lg={6} sm={12}>
          <div
            onClick={() => setShowFilters(!showFilters)}
            className="search-trainer__select search-trainer__select--bg"
          >
            Filtreler
          </div>
          {showFilters && <SearchFilters />}
        </Col>

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
    </div>
  );
};

export default SearchTrainer;
