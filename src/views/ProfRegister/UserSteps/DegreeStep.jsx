import React from 'react';

import FileUpload from './FileUpload';
import { DEGREE } from '../../../constants';

const DegreeStep = () => {
  return <FileUpload title="Diplomanızı ekleyin." fileTypeId={DEGREE} />;
};

export default DegreeStep;
