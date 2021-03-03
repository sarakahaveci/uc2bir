import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

import { Button, AwesomeIcon } from 'components';

const SearchTrainer = () => {
  const [trainerName, setTrainerName] = useState();
  const [location, setLocation] = useState();
  const [branch, setBranch] = useState();
  const [filter, setFilter] = useState();
  const [sort, setSort] = useState();

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
            <AwesomeIcon.Map className="mr-1 mb-1" />

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
            <option>deneme</option>
            <option>deneme</option>
            <option>deneme</option>
            <option>deneme</option>
            <option>deneme</option>
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
          <Form.Control
            as="select"
            className="search-trainer__select search-trainer__select--bg"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option hidden>Filtreler</option>
            <option>deneme</option>
            <option>deneme</option>
            <option>deneme</option>
            <option>deneme</option>
            <option>deneme</option>
          </Form.Control>
        </Col>

        <Col lg={6} sm={12}>
          <Form.Control
            as="select"
            className="search-trainer__select search-trainer__select--bg"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option hidden>Sırala</option>
            <option>deneme</option>
            <option>deneme</option>
            <option>deneme</option>
            <option>deneme</option>
            <option>deneme</option>
          </Form.Control>
        </Col>
      </Row>
    </div>
  );
};

export default SearchTrainer;
