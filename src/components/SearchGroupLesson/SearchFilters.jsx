import React, { useRef } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  useCheckOutsideClick(filterWrapperRef, () => setShowFilters(false));

  const ratingChangeHandler = (starCount) => {
    if (ratings.includes(starCount)) {
      setRatings(ratings?.filter((rating) => rating !== starCount));
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
            {t('SELECT LEVEL')}
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
        {t('LIST BY PRICE ( TL )')}
      </Text>

      <Slider
        value={price}
        onChange={priceChangeHandler}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
        min={0}
        max={2000}
      />

      <Text color="dark" fontSize="0.9rem" m="15px 0 5px 0">
        {t('EVALUATION SCORE')}
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
        text={t('Apply')}
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
  padding: 20px 20px;
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
