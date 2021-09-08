import React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import { Svg, Title, Text, svgBackground } from 'components';

const CancellationInformation = () => {
  const { t } = useTranslation();

  return (
    <div>
      <RedBackground>
        <Svg.SadFaceIcon />
      </RedBackground>

      <Title component="h5">
        {t('We are unable to process membership cancellation at this time')}
      </Title>

      <Text>{t('Go to my booking calendar')}</Text>

      <Text>{t('Go to My Wallet')}</Text>
    </div>
  );
};

export default CancellationInformation;

const RedBackground = styled.div`
  ${svgBackground};
  background-color: ${(p) => p.theme.colors.red};
`;
