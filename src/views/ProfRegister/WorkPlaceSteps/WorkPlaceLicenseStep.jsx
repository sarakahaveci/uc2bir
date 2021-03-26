import React from 'react';

import RegisterFileUpload from '../UserSteps/RegisterFileUpload';
import { LICENSE } from '../../../constants';

const WorkPlaceLicenseStep = () => {
  return (
    <RegisterFileUpload
      title="İş Yeri Ruhsatını yükleyin"
      fileTypeId={LICENSE}
    />
  );
};

export default WorkPlaceLicenseStep;
