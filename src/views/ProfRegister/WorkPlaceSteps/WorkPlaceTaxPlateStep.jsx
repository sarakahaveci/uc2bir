import React from 'react';
import { useTranslation } from 'react-i18next';

import RegisterFileUpload from '../UserSteps/RegisterFileUpload';
import { TAXPLATE } from '../../../constants';

const WorkPlaceTaxPlateStep = () => {
  const { t } = useTranslation();

  return (
    <RegisterFileUpload
      title={t('Upload Tax Plate')}
      fileTypeId={TAXPLATE}
    />
  );
};

export default WorkPlaceTaxPlateStep;
