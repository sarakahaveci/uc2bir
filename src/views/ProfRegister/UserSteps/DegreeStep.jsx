import React from 'react';

import RegisterFileUpload from './RegisterFileUpload';
import { DEGREE } from '../../../constants';

const DegreeStep = () => {
  return (
    <RegisterFileUpload title="Diplomanızı ekleyin." fileTypeId={DEGREE} />
  );
};

export default DegreeStep;
