import React from 'react';
import { useTranslation } from 'react-i18next';

import RegisterFileUpload from './RegisterFileUpload';
import { DEGREE } from '../../../constants';

const DegreeStep = () => {
  const { t } = useTranslation();

  return (
    <RegisterFileUpload title={t('Add your diploma')} fileTypeId={DEGREE} />
  );
};

export default DegreeStep;
