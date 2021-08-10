import React from 'react';

import RegisterFileUpload from './RegisterFileUpload';
import { IDENTITY_CARD } from '../../../constants';

const IdentityCardStep = () => {
  return (
    <RegisterFileUpload
      title="Nüfus cüzdanınızın arkalı önlü fotoğrafını ekleyin."
      fileTypeId={IDENTITY_CARD}
    />
  );
};

export default IdentityCardStep;
