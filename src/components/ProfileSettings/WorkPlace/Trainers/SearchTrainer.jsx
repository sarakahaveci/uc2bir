import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import { Button, AwesomeIcon } from 'components';

const SearchTrainer = () => {
  const [trainerName, setTrainerName] = useState();
  const [location, setLocation] = useState();
  const [branch, setBranch] = useState();
  const [filter, setFilter] = useState();
  const [sort, setSort] = useState();

  return (
    <div className="search-trainer">
      <div className="search-trainer__search-area">
        <input
          className="search-input"
          value={trainerName}
          onChange={(e) => setTrainerName(e.target.value)}
          placeholder="Eğitmen adı..."
        />

        <div className="location-row">
          <AwesomeIcon.Map className="mr-1 mb-1" />

          <input
            className="search-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Lokasyon..."
          />
        </div>

        <Form.Control
          as="select"
          className="trainer__select"
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

        <Button
          justifyContent="space-around"
          display="flex"
          className="blue"
          alignItems="center"
          text="Ara"
          search
          minWidth="120px"
        />
      </div>

      <div className="search-trainer__sort-row">
        <Form.Control
          as="select"
          className="trainer__select--bg"
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

        <Form.Control
          as="select"
          className="trainer__select--bg"
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
      </div>
    </div>
  );
};

export default SearchTrainer;
