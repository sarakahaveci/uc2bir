import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { device } from 'utils';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';

import GroupLessonCard from 'components/UserCards/GroupLessonCard';

import { Button, Svg, Pagination, BackLink, Text,ChooseDateModal } from 'components';
import { searchProffesional } from 'actions';
import Filter from './SearchFilters';
import { useTranslation} from 'react-i18next'

const SearchGroupLesson = () => {
  const { totalPage, data, totalData } = useSelector(
    (state) => state.searchProfessional.listInfo
  );
  const [openDateModal, setOpenDateModal] = useState(false);
  const { t } = useTranslation();

  const [dateFilterText, setDateFilterText] = useState('Tarih Seçiniz');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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

  const { subType } = searchParams;

  const userTypeText = 'Grup Ders';

  useEffect(() => {
    const {
      title,
      location,
      branch,
      page = 1,
      price = '[0, 1000]',
      ratings = '[]',
      classification,
      type = 'group-lessons',
      subType = 'pt', //hata olabilir  //BURASINI DİNAMİK YAPPPPPPPPPP
      startDate,
      endDate,
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
    setStartDate(startDate);
    setEndDate(endDate);
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
        startDate,
        endDate,
      })
    );
  }, [window.location.href]);

  const linkChangeHandler = (pageNumber) => {
    let url = `/group-lessons?type=group-lessons`;

    const formData = {
      title,
      location,
      branch,
      page: pageNumber,
      price,
      ratings,
      classification,
      startDate,
      endDate,
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
      <Container className="mb-5 mt-5 d-flex flex-column">
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
            <SearchCol sm={12}>
              <FilterButton onClick={() => setOpenDateModal(true)}>
                {dateFilterText}
                <div style={{ marginLeft: 20, transform: 'rotate(90deg)' }}>
                  {' '}
                  {'>'}{' '}
                </div>
              </FilterButton>
            </SearchCol>
            <SearchCol>
              <div className="search-trainer__location-row">
                <Svg.LocationIcon className="mr-1 mb-1" />

                <input
                  className="search-trainer__search-input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t('location')+'....'}
                />
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
                maxWidth="200px"
                onClick={() => linkChangeHandler(page)}
              />
            </SearchCol>
          </Row>
        </SearchWrapper>

        {data?.length > 0 ? (
          <>
            <PacketListWrapper>
              {data?.map((group) => (
                <GroupLessonCard
                  showHeartBg
                  subType={subType}
                  hoverText="Grup Derse Git"
                  key={group?.id || group?.user_id}
                  data={group}
                  city={group?.city}
                  district={group?.district}
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

  flex-basis: 20%;
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

const PacketListWrapper = styled.div`
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
  display:flex;
`;

export default SearchGroupLesson;
