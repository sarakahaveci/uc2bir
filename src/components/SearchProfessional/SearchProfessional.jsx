import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { device } from 'utils';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';

import LongUserCard from 'components/UserCards/LongUserCard';
import {
  Button,
  GoogleMapClusterer,
  Pagination,
  BackLink,
  Text,
  LocationInput,
  ChooseDateModal,
} from 'components';
import { searchProffesional } from 'actions';
import Filter from './SearchFilters';
import { useTranslation } from 'react-i18next';

const SearchProfessional = () => {
  const allBranchList = useSelector(
    (state) => state.profileSettings.ptBranchList.allList
  );

  const { totalPage, data, totalData } = useSelector(
    (state) => state.searchProfessional.listInfo
  );
  const { t } = useTranslation();

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [branch, setBranch] = useState('');
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState(undefined);

  const [ratings, setRatings] = useState([]);
  const [classification, setClassification] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [openDateModal, setOpenDateModal] = useState(false);

  const [dateFilterText, setDateFilterText] = useState(t('selectDate'));
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const searchParams = queryString.parse(useLocation().search);

  const { type } = searchParams || 'pt';

  let userTypeText;
  const sortingStates = [
    { id: 'asc', name: t('Price Increasing') },
    { id: 'desc', name: t('Price Descending') },
  ];
  switch (type) {
    case 'gym':
      userTypeText = t('Gym');
      break;
    case 'pt':
      userTypeText = t('trainerCapitalize');
      break;
    case 'dt':
      userTypeText = t('dietitianCapitalize');
      break;
    case 'map':
      userTypeText = t('Map');
    default:
      break;
  }

  useEffect(() => {
    const {
      title,
      location,
      branch,
      page = 1,
      price = '[0, 2000]',
      ratings = '[]',
      classification,
      startDate,
      endDate,
    } = searchParams;

    // Parsing this because it is coming string from url such as '[0, 1000]'
    const parsedPrice = JSON.parse(price);
    const parsedRatings = JSON.parse(ratings);

    setTitle(title);
    setLocation(location);
    setBranch(branch);
    setPage(Number(page));
    setPrice(parsedPrice);
    setRatings(parsedRatings);
    setClassification(classification);
    setStartDate(startDate);
    setEndDate(endDate);

    dispatch(
      searchProffesional({
        title,
        ratings: parsedRatings,
        minPrice: parsedPrice?.[0],
        maxPrice: parsedPrice?.[1],
        // TODO: take it from sorting state
        sortBy: sortBy,
        branch,
        location,
        type,
        page,
        classification,
        startDate,
        endDate,
      })
    );
  }, [window.location.href]);

  const linkChangeHandler = (pageNumber) => {
    let url = `/find?type=${type}`;

    const formData = {
      title,
      location,
      branch,
      page: pageNumber,
      price,
      ratings,
      classification,
      sortBy,
      startDate,
      endDate,
    };

    url = Object.keys(formData).reduce((acc, curr) => {
      if (formData[curr]) {
        if (Array.isArray(formData[curr])) {
          if (formData[curr].length) {
            return acc + `&${curr}=${JSON.stringify(formData[curr])}`;
          } else {
            return acc;
          }
        } else {
          return acc + `&${curr}=${formData[curr]}`;
        }
      }

      return acc;
    }, url);

    history.push(url);
  };
  async function handleChangePage(event, pageNumber) {

    linkChangeHandler(pageNumber);


  };

  return (
    <div className="mb-5 p-3">
      <Container className="mb-5  mt-4 d-flex flex-column">
        <BackLink path="/" text={`${userTypeText} Arayın`} />

        <Text mb="15px">
          {userTypeText} için {totalData} sonuç listeleniyor.
        </Text>

        <SearchWrapper className="d-flex mb-3 mx-auto">
          <Row className="search-trainer__search-area">
            <SearchCol sm={12}>
              <FilterButton onClick={() => setOpenDateModal(true)}>
                {dateFilterText}
                <div style={{ marginLeft: 20, transform: 'rotate(90deg)' }}>
                  {' '}
                  {'>'}{' '}
                </div>
              </FilterButton>
            </SearchCol>
            <SearchCol sm={12}>
              <input
                className="search-trainer__search-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('Search')}
              />
            </SearchCol>

            <SearchCol>
              <LocationInput
                className="search-trainer__search-input"
                style={{ width: '50px' }}
                defaultValue={location}
                onChange={(e) => {
                  setLocation(e);
                }}
                placeholder={t('location')}
              />
            </SearchCol>

            {type === 'pt' && (
              <SearchCol sm={12}>
                <Form.Control
                  style={{ width: '100%' }}
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
            )}
            <SearchCol sm={12}>
              <Form.Control
                style={{ width: '100%' }}
                as="select"
                className="search-trainer__select"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  linkChangeHandler(page);
                }}
              >
                <option hidden>{t('sorting')}</option>
                {sortingStates.map((item, index) => (
                  <option key={'option' + index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Control>
            </SearchCol>
            <SearchCol>
              <FilterButton onClick={() => setShowFilters(!showFilters)}>
                {t('Filter')}
              </FilterButton>
              {showFilters && (
                <Filter
                  type={type}
                  setShowFilters={setShowFilters}
                  page={page}
                  classification={classification}
                  setClassification={setClassification}
                  ratings={ratings}
                  setRatings={setRatings}
                  price={price}
                  setPrice={setPrice}
                  linkChangeHandler={linkChangeHandler}
                />
              )}
            </SearchCol>

            <SearchCol sm={12}>
              <Button
                justifyContent="space-around"
                display="flex"
                className="blue w-100 ml-md-auto"
                alignItems="center"
                text={t('Search')}
                search
                width="100%"
                maxWidth="200px"
                onClick={() => linkChangeHandler(1)}
              />
            </SearchCol>
          </Row>
        </SearchWrapper>

        {data && <GoogleMapClusterer data={data} />}

        {data?.length > 0 ? (
          <>
            <GymListWrapper>
              {data?.map((professional) => (
                <LongUserCard
                  favoritedUser={professional?.has_favorite_count > 0}
                  favoriteId={professional?.user_id}
                  showHeartBg
                  key={professional?.id || professional?.user_id}
                  data={professional}
                  city={professional?.city}
                  district={professional?.district}
                />
              ))}
            </GymListWrapper>

            <div className="d-flex w-100 mt-3">
              <Pagination
                className="mx-auto"
                mt="50px"
                count={totalPage}
                page={page}
                onChange={handleChangePage}
              />
            </div>
          </>
        ) : (
          <strong className="mt-3">
            {t('No results matching your search type were found')}
          </strong>
        )}
      </Container>
      <ChooseDateModal
        open={openDateModal}
        cancel={() => {
          setOpenDateModal(false);
        }}
        setDateFilterText={setDateFilterText}
        setEndDateToApi={setEndDate}
        setStartDateToApi={setStartDate}
      />
    </div>
  );
};

const SearchCol = styled(Col)`
  &:not(:last-child) {
    border-right: 1px solid #707070;
  }
  flex-basis: 13.2%;
  align-self: center;
`;

const SearchWrapper = styled.div`
  width: 100%;

  @media ${device.sm} {
    width: 100%;

    ${SearchCol} {
      flex-basis: 100%;
      border-right: unset;
      margin-bottom: 20px;
    }
  }

  @media ${device.md} {
    width: 100%;
  }
`;

const GymListWrapper = styled.div`
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: 300px 300px 300px 300px;
  grid-row-gap: 20px;
  padding: 30px;
  margin-top: 15px;

  @media (max-width: 1200px) {
    grid-template-columns: auto auto;
  }
  @media ${device.sm} {
    grid-template-columns: auto;
  }
`;

const FilterButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: white;
  z-index: 2;
  display: flex;
`;

export default SearchProfessional;
