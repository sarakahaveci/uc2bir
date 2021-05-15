import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components/macro';
import { Row, Col, Form, Container } from 'react-bootstrap';

import { searchProffesional } from 'actions';
import { device } from 'utils';
import { Button, Pagination, Svg } from 'components';
import LongUserCard from 'components/UserCards/LongUserCard';
import SearchFilters from 'components/SearchProfessional/SearchFilters';

const Trainers = ({ type, onClickHover = () => {} }) => {
  const dispatch = useDispatch();
  const [packetLevel, setPacketLevel] = useState('A');
  const allBranchList = useSelector(
    (state) => state.profileSettings.ptBranchList.allList
  );

  const { totalPage, data } = useSelector(
    (state) => state.searchProfessional.listInfo
  );

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [branch, setBranch] = useState('');
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState('[0, 1000]');

  const [ratings, setRatings] = useState('[]');
  const [classification, setClassification] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const parsedPrice = JSON.parse(price);
    const parsedRatings = JSON.parse(ratings);

    dispatch(
      searchProffesional({
        title,
        ratings: parsedRatings,
        minPrice: parsedPrice?.[0],
        maxPrice: parsedPrice?.[1],
        sortBy: 'asc',
        branch,
        location,
        type: 'pt',
        lat: 0,
        lng: 0,
        classification,
      })
    );
  }, []);

  const linkChangeHandler = () => {
    const parsedPrice = JSON.parse(price);
    const parsedRatings = JSON.parse(ratings);
    dispatch(
      searchProffesional({
        title,
        ratings: parsedRatings,
        minPrice: parsedPrice?.[0],
        maxPrice: parsedPrice?.[1],
        sortBy: 'asc',
        branch,
        location,
        type: 'pt',
        classification,
      })
    );
  };

  const handleChangePage = (event, pageNumber) => {
    setPage(pageNumber);
    linkChangeHandler(pageNumber);
  };

  return (
    <div className="mb-5 p-3">
      <Container className="mb-5 d-flex flex-column">
        <SearchWrapper className="d-flex mb-3 mx-auto">
          <Row className="search-trainer__search-area">
            <SearchCol>
              <input
                className="search-trainer__search-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Eğitmen Ara"
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

            {
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
            }

            <SearchCol sm={12}>
              <FilterButton onClick={() => setShowFilters(!showFilters)}>
                Filtrele
              </FilterButton>
              {showFilters && (
                <SearchFilters
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

            <SearchCol className="pr-0">
              <Button
                justifyContent="space-around"
                display="flex"
                className="blue w-100 ml-md-auto"
                alignItems="center"
                text="Ara"
                search
                width="100%"
                maxWidth="150px"
                onClick={() => linkChangeHandler(page)}
              />
            </SearchCol>
          </Row>
        </SearchWrapper>
        {type == 'selection' && (
          <div style={{ width: '40%', margin: '20px' }}>
            <LabelText>Seviyenizi Seçiniz</LabelText>
            <Seperator></Seperator>
            <LevelContainer>
              <LevelCircle
                onClick={() => {
                  setPacketLevel('A');
                }}
                enable={packetLevel == 'A'}
              >
                A
              </LevelCircle>
              <Line />
              <LevelCircle
                onClick={() => {
                  setPacketLevel('B');
                }}
                enable={packetLevel == 'B'}
              >
                B
              </LevelCircle>
              <Line />

              <LevelCircle
                onClick={() => {
                  setPacketLevel('C');
                }}
                enable={packetLevel == 'C'}
              >
                C
              </LevelCircle>
            </LevelContainer>
          </div>
        )}
        {data.length > 0 ? (
          <>
            <GymListWrapper>
              {data?.map((professional) => (
                <LongUserCard
                  type={type}
                  showHeartBg
                  hoverText={type == 'selection' ? '+ Eğitmeni Seç' : undefined}
                  key={professional?.id || professional?.user_id}
                  data={professional}
                  city={professional?.city}
                  district={professional?.district}
                  onClickHover={onClickHover}
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

const SearchCol = styled(Col)`
  &:not(:last-child) {
    border-right: 1px solid #707070;
  }

  flex-basis: 20%;
`;

const SearchWrapper = styled.div`
  width: 75%;

  @media ${device?.sm} {
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
  padding: 10px;
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
`;
/////////////

const LabelText = styled.text`
  font-size: 18px;
  font-weight: bold;
  color: var(--blue);
`;

const Seperator = styled.div`
  width: 60px;
  border-bottom-style: solid;
  border-color: var(--blue);
  border-width: 3px;
  margin-bottom: 15px;
`;

const LevelContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LevelCircle = styled.div`
  cursor: pointer;
  width: 80px;
  height: 80px;
  border-radius: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  ${(p) =>
    p.enable
      ? css`
          background: var(--blue);
          color: white;
        `
      : css`
          background: white;
          border-style: solid;
          border-width: 1px;
          border-color: #d3d3d3;
          color: gray;
        `}
`;
const Line = styled.div`
  flex-grow: 1;
  background: #d3d3d3;
  height: 1px;
  margin: 7px;
`;

export default Trainers;
