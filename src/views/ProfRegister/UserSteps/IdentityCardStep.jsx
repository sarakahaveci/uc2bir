import React from 'react';

import FileUpload from './FileUpload';
import { IDENTITY_CARD } from '../../../constants';

const IdentityCardStep = () => {
  return (
    <FileUpload
      title="Nüfus cüzdanınızın fotoğrafını ekleyin."
      fileTypeId={IDENTITY_CARD}
    />
  );
};

export default IdentityCardStep;
