import React from 'react';

import RegisterFileUpload from '../UserSteps/RegisterFileUpload';
import { CONTRACT } from '../../../constants';

const WorkPlaceContractStep = () => {
  return (
    <RegisterFileUpload
      title="Kira Kontratı veya tapuyu yükleyin"
      fileTypeId={CONTRACT}
    />
  );
};

export default WorkPlaceContractStep;
