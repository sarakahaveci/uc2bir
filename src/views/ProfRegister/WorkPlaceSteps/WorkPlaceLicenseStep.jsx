import React from 'react';
import { useTranslation } from 'react-i18next';

import RegisterFileUpload from '../UserSteps/RegisterFileUpload';
import { LICENSE } from '../../../constants';

const WorkPlaceLicenseStep = () => {
  const { t } = useTranslation();

  return (
    <RegisterFileUpload
      title={t('Upload the Business License')}
      fileTypeId={LICENSE}
    />
  );
};

export default WorkPlaceLicenseStep;
