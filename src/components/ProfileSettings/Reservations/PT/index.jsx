import React, { useEffect, useState } from 'react';
import { getSessionTypes } from 'actions';
import { useDispatch } from 'react-redux';

import { getGeocode } from 'use-places-autocomplete';
import Awaitings from './Awaitings';
import Approved from './Approved';
import Calendar from './Calendar';
import SessionHistory from './SessionHistory';
import Rejecteds from './Rejecteds';
import styled from 'styled-components/macro';
import { Tabbar } from 'components';

const PT = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState('Awaitings');

  useEffect(() => {
    getGeocode();
  }, []);

  useEffect(() => {
    dispatch(getSessionTypes());
  }, []);

  let content;
  switch (page) {
    case 'Awaitings':
      content = <Awaitings />;
      break;

    case 'Calendar':
      content = <Calendar />;
      break;
    case 'Approved':
      content = <Approved />;
      break;
    case 'Rejecteds':
      content = <Rejecteds />;
      break;
    case 'SessionHistory':
      content = <SessionHistory />;
      break;
    default:
      return <></>;
  }

  return (
    <Container>
      <Tabbar
        defaultSelected="Awaitings"
        onSelect={(value) => {
          setPage(value);
        }}
        tabs={[
          { text: 'ONAYDAKİLER', value: 'Awaitings' },
          { text: 'TAKVİMİM', value: 'Calendar' },
          { text: 'ONAYLANANLAR', value: 'Approved' },
          { text: 'REDDEDİLENLER', value: 'Rejecteds' },
          { text: 'DERS GEÇMİŞİ', value: 'SessionHistory' },
        ]}
      ></Tabbar>
      {content}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
export default PT;
