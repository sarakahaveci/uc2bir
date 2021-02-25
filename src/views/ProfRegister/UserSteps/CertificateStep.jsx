import React from 'react';

import { CERTIFICATE } from '../../../constants';
import RegisterFileUpload from './RegisterFileUpload';

const CertificateStep = () => {
  return (
    <>
      <RegisterFileUpload
        title="Sertifikalarınızı yükleyin"
        fileTypeId={CERTIFICATE}
      />
    </>
  );
};

export default CertificateStep;
