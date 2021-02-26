import React from 'react';

import RegisterFileUpload from '../UserSteps/RegisterFileUpload';
import { CONTRACT } from '../../../constants';

const WorkPlaceHirePlaceStep = () => {
  return (
    <RegisterFileUpload
      title="İş Yeri Kiralama Kararını yükleyin"
      fileTypeId={CONTRACT}
    />
  );
};

export default WorkPlaceHirePlaceStep;
