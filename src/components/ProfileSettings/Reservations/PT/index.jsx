import React, { useEffect, useState } from 'react';

import { getGeocode } from 'use-places-autocomplete';
import Awaitings from './Awaitings';
import Approved from './Approved';
import Calendar from './Calendar';
import SessionHistory from './SessionHistory';
import Rejecteds from './Rejecteds';
import styled from 'styled-components/macro';
import { Tabbar, Svg } from 'components';
import ReservationTemplate from '../ReservationTemplate/ReservationTemplate';
const PT = () => {
  const [tab, setTab] = useState('Awaitings');
  const [subPage, setSubPage] = useState();

  useEffect(() => {
    getGeocode();
  }, []);

  useEffect(() => {}, []);

  let content;
  switch (tab) {
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
      {subPage ? ( //Alt Pageler burada route edilecektir
        subPage
      ) : (
        //Aşagıdaki routing tablerde gezinmek içindir.
        <>
          <Tabbar
            defaultSelected="Awaitings"
            onSelect={(value) => {
              setTab(value);
            }}
            tabs={[
              { text: 'ONAYDAKİLER', value: 'Awaitings' },
              { text: 'TAKVİMİM', value: 'Calendar' },
              { text: 'ONAYLANANLAR', value: 'Approved' },
              { text: 'REDDEDİLENLER', value: 'Rejecteds' },
              { text: 'DERS GEÇMİŞİ', value: 'SessionHistory' },
            ]}
            rightButton={
              <DateCreateButton
                onClick={() => {
                  setSubPage(<ReservationTemplate />);
                }}
              >
                <Svg.PlusIcon />
                <ButtonText>Takvim Oluştur</ButtonText>
              </DateCreateButton>
            }
          ></Tabbar>
          {content}
        </>
      )}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const DateCreateButton = styled.button`
  display: flex;
  align-items: center;
  width: 219px;
  height: 32px;
  background: red;
  margin-top: 7px;
  border-radius: 20px;
  background: var(--blue);
`;
const ButtonText = styled.text`
  color: white;
  margin-left: 10px;
`;

export default PT;
