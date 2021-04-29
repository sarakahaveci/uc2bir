/* eslint-disable react/jsx-pascal-case */

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import styled from 'styled-components/macro';

import { dtGetServices } from 'actions';
import { Title, Pagination } from 'components';
import Card from './Card';
export default function Services() {
  const dispatch = useDispatch();
  //const { services } = useSelector((state) => state.profileSettings2.services);
  const [page, setPage] = useState(1);
  useEffect(() => {}, []);
  useEffect(() => {
    dispatch(dtGetServices(page));
  }, [page]);

  function pageChangeHandler(event, value) {
    setPage(value);
  }

  return (
    <div className="w-100 h-100">
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        {'Danışanlar'}
      </Title>
      <CardContainer>
        <Card image={null} name="Nazlı Ulu" desc="Öğrenci" />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </CardContainer>
      <Pagination
        mt="50px"
        count={20}
        style={{ background: 'white' }}
        page={page}
        onChange={pageChangeHandler}
      />
    </div>
  );
}

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;
