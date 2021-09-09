import React from 'react';
import { useTranslation } from 'react-i18next';

import RegisterFileUpload from '../UserSteps/RegisterFileUpload';
import { CONTRACT } from '../../../constants';

const WorkPlaceContractStep = () => {
  const { t } = useTranslation();

  return (
    <RegisterFileUpload
      title={t('Upload Lease or deed')}
      fileTypeId={CONTRACT}
    />
  );
};

export default WorkPlaceContractStep;
