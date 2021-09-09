import React from 'react';
import { useTranslation } from 'react-i18next';

import { CERTIFICATE } from '../../../constants';
import RegisterFileUpload from './RegisterFileUpload';

const CertificateStep = () => {
  const { t } = useTranslation();

  return (
    <>
      <RegisterFileUpload
        title={t('Upload your certificates')}
        fileTypeId={CERTIFICATE}
      />
    </>
  );
};

export default CertificateStep;
