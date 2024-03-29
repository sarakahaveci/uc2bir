import React from 'react';
import { useTranslation } from 'react-i18next';

import { Title } from 'components';
export default function ProficiencyCard({ title, data }) {
  const { t } = useTranslation();

  return (
    <div className="proficiencyCard__wrapper">
      <Title
        fontSize="14px"
        letterSpacing="0.01em"
        fontWeight="500"
        textAlign="left"
        color="gray1"
      >
        {title}
      </Title>
      <div className="d-flex proficiencyCard__line__wrapper">
        {data?.length > 0 &&
          data?.map((value) => (
            <div
              className="d-flex  justify-content-between proficiencyCard__line"
              key={value?.name}
            >
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
                {value?.status === 'pending'
                  ? t('Waiting for approval')
                  : t('Approved')}
              </Title>
            </div>
          ))}
      </div>
    </div>
  );
}
