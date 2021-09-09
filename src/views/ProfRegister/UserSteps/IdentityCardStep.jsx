import React from 'react';
import { useTranslation } from 'react-i18next';

import RegisterFileUpload from './RegisterFileUpload';
import { IDENTITY_CARD } from '../../../constants';

const IdentityCardStep = () => {
  const { t } = useTranslation();

  return (
    <RegisterFileUpload
      title={t('Include a photo of your identity card on the back')}
      fileTypeId={IDENTITY_CARD}
    />
  );
};

export default IdentityCardStep;
