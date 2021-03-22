import React from 'react';

import GreenTickIcon from 'assets/green-tick.svg';
import { Title } from 'components';

export default function FacilityCard({ isAccepted, name = 'Duş', status }) {
  const cardClass = isAccepted
    ? 'facility-card-wrapper'
    : 'facility-card-wrapper not-accepted-card';

  const statusTextClass = isAccepted ? 'accepted-text' : 'waiting-accept-text';

  const statusText = isAccepted
    ? 'Onaylandı'
    : status === 'pending'
    ? 'Onay Bekliyor'
    : 'Reddedildi';

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
          color="#404041"
        >
          {name}
        </Title>
      </div>
      <div className={statusTextClass}>{statusText}</div>
    </div>
  );
}
