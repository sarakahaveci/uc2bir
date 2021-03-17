import React from 'react';

import { Title } from 'components';

export default function ProficiencyCard({ title, data }) {
  return (
    <div className="proficiencyCard__wrapper">
      <Title
        fontSize="14px"
        letterSpacing="0.01em"
        fontWeight="500"
        textAlign="left"
        color="#909090"
      >
        {title}
      </Title>
      <div className="d-flex proficiencyCard__line__wrapper">
        {data?.map((value) => (
          <div className="d-flex  justify-content-between proficiencyCard__line">
            <Title
              fontSize="14px"
              letterSpacing="0.01em"
              fontWeight="500"
              textAlign="left"
            >
              {value?.name}
            </Title>

            <Title
              fontSize="14px"
              letterSpacing="0.01em"
              fontWeight="500"
              textAlign="right"
              color={value?.status === 'pending' ? '#f01c62' : '#00b2a9'}
            >
              {value?.status === 'pending' ? 'Onay Bekliyor' : 'Onaylandı'}
            </Title>
          </div>
        ))}
      </div>
    </div>
  );
}
