import React, { useRef } from 'react';
import styled from 'styled-components/macro';

import { Material, AwesomeIcon, Text, Button, Slider, Box } from 'components';
import { useCheckOutsideClick } from 'utils';

const classificationsArr = ['A', 'B', 'C'];

const SearchFilters = ({
  type,
  setShowFilters,
  page,
  classification,
  setClassification,
  ratings,
  setRatings,
  price,
  setPrice,
  linkChangeHandler,
}) => {
  const filterWrapperRef = useRef();

  useCheckOutsideClick(filterWrapperRef, () => setShowFilters(false));

  const ratingChangeHandler = (starCount) => {
    if (ratings.includes(starCount)) {
      setRatings(ratings.filter((rating) => rating !== starCount));
    } else {
      setRatings([...ratings, starCount]);
    }
  };

  const priceChangeHandler = (event, newValue) => setPrice(newValue);

  return (
    <FiltersWrapper ref={filterWrapperRef}>
      {type === 'pt' && (
        <>
          <Text color="dark" fontSize="0.9rem" mb="15px">
            SEVİYE SEÇİNİZ
          </Text>

          <Box col>
            {classificationsArr.map((item, index) => (
              <Box
                key={'class' + index}
                row
                onClick={() => setClassification(item)}
              >
                <Material.checkbox checked={classification === item} />

                <div>{item}</div>
              </Box>
            ))}
          </Box>
        </>
      )}

      <Text color="dark" fontSize="0.9rem" m="15px 0 5px 0">
        FİYATA GÖRE LİSTELE ( TL )
      </Text>

      <Slider
        value={price}
        onChange={priceChangeHandler}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
        min={0}
        max={1000}
      />

      <Text color="dark" fontSize="0.9rem" m="15px 0 5px 0">
        DEĞERLENDİRME PUANI
      </Text>

      {[5, 4, 3, 2, 1].map((starCount, index) => (
        <StarWrapper row key={index}>
          <Material.checkbox
            checked={ratings?.includes(starCount)}
            onChange={() => ratingChangeHandler(starCount)}
          />

          <Box flex={1}>
            {[...Array(5)].map((_, index) => (
              <Star key={index} active={starCount >= index + 1} />
            ))}
          </Box>
        </StarWrapper>
      ))}

      <Button
        mt="10px"
        text="Uygula"
        className="blue"
        onClick={() => {
          setShowFilters(false);

          linkChangeHandler(page);
        }}
      />
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
