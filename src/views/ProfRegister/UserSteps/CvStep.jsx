import React from 'react';
import { useTranslation } from 'react-i18next';

import { CV } from '../../../constants';
import RegisterFileUpload from './RegisterFileUpload';

const CvStep = () => {
  const { t } = useTranslation();

  return (
    <>
      <RegisterFileUpload
        title={t('Upload your cv')}
        fileTypeId={CV}
      />
    </>
  );
};

export default CvStep;
