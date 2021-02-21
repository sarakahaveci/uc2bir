import React from 'react';

import FileUpload from '../UserSteps/FileUpload';
import { CONTRACT } from '../../../constants';

const WorkPlaceHirePlaceStep = () => {
  return (
    <FileUpload
      title="İş Yeri Kiralama Kararını yükleyin"
      fileTypeId={CONTRACT}
    />
  );
};

export default WorkPlaceHirePlaceStep;
