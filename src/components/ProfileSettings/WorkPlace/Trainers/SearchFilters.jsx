import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Slider } from '@material-ui/core';

import { Material, AwesomeIcon, Text, Button, Svg, Box } from 'components';

const classificationsArr = ['A', 'B', 'C'];

const SearchFilters = () => {
  const [classification, setClassification] = useState('');
  const [ratings, setRatings] = useState([]);
  const [price, setPrice] = useState([0, 500]);

  const ratingChangeHandler = (event) => {
    const value = event.target.value;

    if (ratings.includes(value)) {
      setRatings.filter((rating) => rating !== value);
    } else {
      setRatings([...ratings, value]);
    }
  };

  const priceChangeHandler = (event, newValue) => setPrice(newValue);

  const ariaLabelHandler = (value) => {
    return 'deneme ';
  };

  return (
    <FiltersWrapper>
      <Text color="dark" fontSize="0.9rem" mb="15px">
        SEVİYE SEÇİNİZ
      </Text>

      <Box col>
        {classificationsArr.map((item) => (
          <Box row onClick={() => setClassification(item)}>
            <Material.checkbox checked={classification === item} />

            <div>{item}</div>
          </Box>
        ))}
      </Box>

      <Text color="dark" fontSize="0.9rem" mb="5px">
        FİYATA GÖRE LİSTELE
      </Text>

      <Slider
        value={price}
        onChange={priceChangeHandler}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
        getAriaLabel={ariaLabelHandler}
        min={0}
        max={1000}
      />

      <Text color="dark" fontSize="0.9rem" mb="15px">
        DEĞERLENDİRME PUANI
      </Text>

      {[5, 4, 3, 2, 1].map((starCount) => (
        <StarWrapper row>
          <Material.checkbox
            checked={ratings.includes(starCount)}
            onChange={ratingChangeHandler}
          />
          <Box flex={1}>
            {[...Array(5)].map((_, index) => (
              <Star active={starCount >= index + 1} />
            ))}
          </Box>
        </StarWrapper>
      ))}

      <Button mt="10px" text="Uygula" className="blue" />
    </FiltersWrapper>
  );
};

export default SearchFilters;

const FiltersWrapper = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px 13px;
  position: absolute;
  width: 250px;
  border-radius: 10px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.05);

  .materials {
    width: unset;
  }
`;

const StarWrapper = styled.div`
  display: flex;
`;

const Star = styled(AwesomeIcon.StarSolid)`
  color: ${(p) =>
    p.active ? p.theme.colors.trunge : 'rgba(255, 187, 0, 0.2)'};
  margin-left: 2px;
`;
