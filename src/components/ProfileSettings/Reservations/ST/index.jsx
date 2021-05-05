import React, { useEffect, useState } from 'react';
import { getGeocode } from 'use-places-autocomplete';
import Awaitings from './Awaitings';
import Approved from './Approved';
import SessionHistory from './SessionHistory';
import Rejecteds from './Rejecteds';
import styled from 'styled-components/macro';
import { Tabbar } from 'components';
import { useDispatch } from 'react-redux';
import { getTemplates } from '../../../../actions';
const ST = () => {
  const [tab, setTab] = useState('Awaitings');
  const [subPage, setSubPage] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemplates());
    getGeocode();
  }, []);

  let content;
  switch (tab) {
    case 'Awaitings':
      content = <Awaitings />;
      break;
    case 'Approved':
      content = <Approved setSubPage={setSubPage} />;
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
              { text: 'ONAYLANANLAR', value: 'Approved' },
              { text: 'REDDEDİLENLER', value: 'Rejecteds' },
              { text: 'DERS GEÇMİŞİ', value: 'SessionHistory' },
            ]}
          />
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

export default ST;
