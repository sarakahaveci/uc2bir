import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { device } from 'utils';

import LongUserCard from 'components/UserCards/LongUserCard';
import {
  Button,
  GoogleMapClusterer,
  Svg,
  Pagination,
  BackLink,
  Text,
} from 'components';
import { searchPtOrDietition } from 'actions';
import Filter from './Filter';

const SearchProfessional = () => {
  const allBranchList = useSelector(
    (state) => state.profileSettings.ptBranchList.allList
  );

  const { type } = useSelector((state) => state.searchProfessional);

  const { totalPage, data, totalData } = useSelector(
    (state) => state.searchProfessional.listInfo
  );

  const dispatch = useDispatch();

  const userTypeText =
    type === 'gym' ? 'Salon' : type === 'pt' ? 'Eğitmen' : 'Diyetisyen';

  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [branch, setBranch] = useState('');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [classification, setClassification] = useState('');
  const [ratings, setRatings] = useState([]);
  const [price, setPrice] = useState([0, 1000]);

  const handleChangePage = (event, value) => {
    setPage(value);
    dispatch(
      searchPtOrDietition({ type, title, page: value, location, branch })
    );
  };

  useEffect(() => {
    dispatch(searchPtOrDietition({ type }));
  }, []);

  const searchProfessionalHandler = () => {
    dispatch(
      searchPtOrDietition({
        type,
        title,
        page: 1,
        location,
        branch,
        rating: ratings,
        minPrice: price?.[0],
        maxPrice: price?.[1],
      })
    );
  };

  return (
    <div className="mb-5 p-3">
      <Container className="mb-5 d-flex flex-column">
        <BackLink path="/" text={`${userTypeText} Arayın`} />

        <Text mb="15px">
          {userTypeText} için {totalData} sonuç listeleniyor.
        </Text>

        <div className="d-flex w-75 mb-3 mx-auto">
          <Row className="search-trainer__search-area">
            <SearchCol>
              <input
                className="search-trainer__search-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`${userTypeText} Adı...`}
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

            {type === 'pt' && (
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
            )}

            <SearchCol sm={12}>
              <FilterButton onClick={() => setShowFilters(!showFilters)}>
                Filtrele
              </FilterButton>

              {showFilters && (
                <Filter
                  searchHandler={searchProfessionalHandler}
                  type={type}
                  classification={classification}
                  setClassification={setClassification}
                  ratings={ratings}
                  setRatings={setRatings}
                  price={price}
                  setPrice={setPrice}
                  setShowFilters={setShowFilters}
                />
              )}
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
                onClick={searchProfessionalHandler}
              />
            </SearchCol>
          </Row>
        </div>

        <GoogleMapClusterer data={data} />

        {data.length > 0 ? (
          <>
            <GymListWrapper>
              {data?.map((professional) => (
                <LongUserCard
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
          <strong className="mt-3">Arama türüne uygun sonuç bulunamadı.</strong>
        )}
      </Container>
    </div>
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

const FilterButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: white;
  z-index: 2;
`;

export default SearchProfessional;
