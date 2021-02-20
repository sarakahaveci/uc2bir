import React from 'react';

import FileUpload from '../UserSteps/FileUpload';
import { LICENSE } from '../../../constants';

const WorkPlaceLicenseStep = () => {
  return <FileUpload title="İş Yeri Ruhsatını yükleyin" fileTypeId={LICENSE} />;
};

export default WorkPlaceLicenseStep;
