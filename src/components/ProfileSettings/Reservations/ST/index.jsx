import React, { useEffect, useState } from 'react';
import { getGeocode } from 'use-places-autocomplete';
import Awaitings from './Awaitings';
import Approved from './Approved';
import SessionHistory from './SessionHistory';
import Rejecteds from './Rejecteds';
import styled from 'styled-components/macro';
import { Tabbar } from 'components';
import { useTranslation } from 'react-i18next';

const ST = () => {
  const { t } = useTranslation();

  const [tab, setTab] = useState('Awaitings');
  const [subPage, setSubPage] = useState();
  const [awaitingCount, setAwaitingCount] = useState(0);
  const [rejectCount, setRejectCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [sessionHistoryCount, setSessionHistoryCount] = useState(0);

  useEffect(() => {
    getGeocode();
  }, []);
  let content;
  switch (tab) {
    case 'Awaitings':
      content = <Awaitings setAwaitingCount={setAwaitingCount} />;
      break;
    case 'Approved':
      content = (
        <Approved setApprovedCount={setApprovedCount} setSubPage={setSubPage} />
      );
      break;
    case 'Rejecteds':
      content = <Rejecteds setRejectCount={setRejectCount} />;
      break;
    case 'SessionHistory':
      content = (
        <SessionHistory
          setSubPage={setSubPage}
          setSessionHistoryCount={setSessionHistoryCount}
        />
      );
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
              {
                text: t('APPROVALS'),
                value: 'Awaitings',
                notify: awaitingCount,
              },
              {
                text: t('APPROVED'),
                value: 'Approved',
                notify: approvedCount,
              },
              {
                text: t('REJECTED'),
                value: 'Rejecteds',
                notify: rejectCount,
              },
              {
                text: t('SESSION HISTORY'),
                value: 'SessionHistory',
                notify: sessionHistoryCount,
              },
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
