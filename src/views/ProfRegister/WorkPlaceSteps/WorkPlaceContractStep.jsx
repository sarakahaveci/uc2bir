import React from 'react';

import FileUpload from '../UserSteps/FileUpload';
import { CONTRACT } from '../../../constants';

const WorkPlaceContractStep = () => {
  return (
    <FileUpload
      title="Kira Kontratı veya tapuyu yükleyin"
      fileTypeId={CONTRACT}
    />
  );
};

export default WorkPlaceContractStep;
