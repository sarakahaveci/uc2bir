import React from 'react';
import { useTranslation } from 'react-i18next';

import GreenTickIcon from 'assets/green-tick.svg';
import { Title } from 'components';

export default function FacilityCard({ isAccepted, name = 'Duş', status }) {
  const { t } = useTranslation();

  const cardClass = isAccepted
    ? 'facility-card-wrapper'
    : 'facility-card-wrapper not-accepted-card';

  const statusTextClass = isAccepted ? 'accepted-text' : 'waiting-accept-text';

  const statusText = isAccepted
    ? t('Approved')
    : status === 'pending'
    ? t('Waiting for approval')
    : t('Denied');

  return (
    <div className={`d-flex mb-2 mr-2 justify-content-between ${cardClass}`}>
      <div className="d-flex flex-column">
        <img src={GreenTickIcon} alt="" width="55px" height="55px" />
        <Title
          fontWeight="600"
          textAlign="left"
          letterSpacing="0.2em"
          fontSize="12px"
          className="mt-3 ml-1"
          color="black3"
        >
          {name}
        </Title>
      </div>
      <div className={statusTextClass}>{statusText}</div>
    </div>
  );
}
