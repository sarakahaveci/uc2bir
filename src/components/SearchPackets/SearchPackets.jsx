import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { device } from 'utils';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';

import PacketCard from 'components/UserCards/PacketCard';
import { Button,Pagination, BackLink, Text } from 'components';
import { searchProffesional } from 'actions';
import Filter from './SearchFilters';

const SearchProfessional = () => {
  const { totalPage, data, totalData } = useSelector(
    (state) => state.searchProfessional.listInfo
  );

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [branch, setBranch] = useState('');
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState([0, 1000]);

  const [ratings, setRatings] = useState([]);
  const [classification, setClassification] = useState('');
  const [showFilters, setShowFilters] = useState(false); 

  const dispatch = useDispatch();
  const history = useHistory();

  const searchParams = queryString.parse(useLocation().search);

  const { type } = searchParams || 'packets';
  const { subType } = searchParams

  const userTypeText = 'Paket';

  useEffect(() => {
    const {
      title,
      location,
      branch,
      page = 1,
      price = '[0, 1000]',
      ratings = '[]',
      classification,
      type = 'packets',
      subType = 'pt' //hata olabilir  //BURASINI DİNAMİK YAPPPPPPPPPP
    } = searchParams;
    // Parsing this because it is coming string from url such as '[0, 1000]'
    const parsedPrice = JSON.parse(price);
    const parsedRatings = JSON.parse(ratings);

    setTitle(title);
    setLocation(location);
    setBranch(branch);
    setPage(page);
    setPrice(parsedPrice);
    setRatings(parsedRatings);
    setClassification(classification);

    dispatch(
      searchProffesional({
        title,
        ratings: parsedRatings,
        minPrice: parsedPrice?.[0],
        maxPrice: parsedPrice?.[1],
        // TODO: take it from sorting state
        sortBy: 'asc',
        branch,
        location,
        type,
        subType,
        page,
        classification,
      })
    );
  }, [window.location.href]);

  const linkChangeHandler = (pageNumber) => {
    let url = `/packets?type=${type}`;

    const formData = {
      title,
      location,
      branch,
      page: pageNumber,
      price,
      ratings,
      classification,
    };

    url = Object.keys(formData).reduce((acc, curr) => {
      if (formData[curr]) {
        if (Array.isArray(formData[curr])) {
          if (formData[curr]?.length) {
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

  const handleChangePage = (event, pageNumber) => {
    setPage(pageNumber);

    linkChangeHandler(pageNumber);
  };

  return (
    <div
      style={{
        minHeight: '70vh',
      }}
    >
      <Container className="mb-5 d-flex flex-column">
        <BackLink path="/" text={`${userTypeText} Arayın`} />

        <Text mb="15px">
          {userTypeText} için {totalData} sonuç listeleniyor.
        </Text>

        <SearchWrapper className="d-flex mb-3 mx-auto">
          <Row className="search-trainer__search-area">
            <SearchCol>
              <input
                className="search-trainer__search-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`${userTypeText} Adı...`}
              />
            </SearchCol>

           {/* <SearchCol>
              <div className="search-trainer__location-row">
                <Svg.LocationIcon className="mr-1 mb-1" />

                <input
                  className="search-trainer__search-input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Lokasyon..."
                />
              </div>
           </SearchCol>*/}
            <SearchCol>
              <div className="search-trainer__location-row">
                <select defaultValue={subType} onChange={(e)=>{
                  
                  history.push(`/packets?subType=${e.target.value}`
                  )}} name="packet-type" id="packet-type">
                  <option value="pt">Eğitmen Paketleri</option>
                  <option value="dt">Diyetisyen Paketleri</option>
                </select>
        
              </div>
            </SearchCol>
            <SearchCol sm={12}>
              <FilterButton onClick={() => setShowFilters(!showFilters)}>
                Filtrele
              </FilterButton>

              {showFilters && (
                <Filter
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

        {data?.data?.length > 0 ? (
          <>
            <PacketListWrapper>
              {data?.data?.map((packet) => (
                <PacketCard
                  showHeartBg
                  subType={subType || 'pt'}
                  key={packet?.id || packet?.user_id}
                  data={packet}
                  city={packet?.city}
                  district={packet?.district}
                />
              ))}
            </PacketListWrapper>

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

const PacketListWrapper = styled.div`
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

export default SearchProfessional;
