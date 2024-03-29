import React, { useEffect, useState } from 'react';

import { getGeocode } from 'use-places-autocomplete';
import Awaitings from './Awaitings';
import Approved from './Approved';
import Calendar from './Calendar';
import SessionHistory from './SessionHistory';
import Rejecteds from './Rejecteds';
import styled from 'styled-components/macro';
import { Tabbar, Svg, CreateCalenderModal } from 'components';
import ReservationTemplate from '../ReservationTemplate/ReservationTemplate';
import ReservationCreatedTemplate from '../ReservationTemplate/ReservationCreatedTemplate';
import { useDispatch, useSelector } from 'react-redux';
import { getTemplates } from '../../../../actions';
import GroupSlot from '../GroupSlot/GroupSlot';
import { useTranslation } from 'react-i18next';

const DIETITIAN = () => {
  const { t } = useTranslation();

  const [tab, setTab] = useState('Awaitings');
  const [subPage, setSubPage] = useState();
  const [openCreateCalender, setOpenCreateCalender] = useState(false);
  const [awaitingCount, setAwaitingCount] = useState(0);
  const {
    myTemplates: { data: myTemplates },
  } = useSelector((state) => state.profileSettings2.reservationTemplate);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemplates());
    getGeocode();
  }, []);

  let content;
  switch (tab) {
    case 'Awaitings':
      content = <Awaitings setAwaitingCount={setAwaitingCount} />;
      break;
    case 'Calendar':
      content = <Calendar />;
      break;
    case 'Approved':
      content = <Approved setSubPage={setSubPage} />;
      break;
    case 'Rejecteds':
      content = <Rejecteds />;
      break;
    case 'SessionHistory':
      content = <SessionHistory setSubPage={setSubPage} />;
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
              { text: t('MY CALENDAR'), value: 'Calendar' },
              { text: t('APPROVED'), value: 'Approved' },
              { text: t('REJECTED'), value: 'Rejecteds' },
              { text: t('SESSION HISTORY'), value: 'SessionHistory' },
            ]}
            rightButton={
              <DateCreateButton
                onClick={() => {
                  setOpenCreateCalender(true);
                }}
              >
                <Svg.BluePlusIcon />
                <ButtonText>{t('Create Calendar')}</ButtonText>
              </DateCreateButton>
            }
          />
          {content}
        </>
      )}

      <CreateCalenderModal
        open={openCreateCalender}
        approve={() => {
          setOpenCreateCalender(false);
          setSubPage(
            myTemplates.length > 0 ? (
              <ReservationCreatedTemplate
                setTab={setTab}
                setTabPage={setSubPage}
              />
            ) : (
              <ReservationTemplate />
            )
          );
        }}
        cancel={() => {
          setSubPage(<GroupSlot type="dt" setTabPage={setSubPage} />);
          setOpenCreateCalender(false);
        }}
        closeModal={() => setOpenCreateCalender(false)}
      />
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

export default DIETITIAN;
