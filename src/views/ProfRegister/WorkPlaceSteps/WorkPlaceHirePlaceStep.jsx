import React from 'react';
import { useTranslation } from 'react-i18next';

import RegisterFileUpload from '../UserSteps/RegisterFileUpload';
import { CONTRACT } from '../../../constants';

const WorkPlaceHirePlaceStep = () => {
  const { t } = useTranslation();

  return (
    <RegisterFileUpload
      title={t('Upload the Office Lease Order')}
      fileTypeId={CONTRACT}
    />
  );
};

export default WorkPlaceHirePlaceStep;
