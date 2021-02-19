import React from 'react';

import FileUpload from './FileUpload';
import { CERTIFICATE } from '../../../constants';

const CertificateStep = () => {
  return (
    <>
      <FileUpload title="Sertifikalarınızı yükleyin" fileTypeId={CERTIFICATE} />
    </>
  );
};

export default CertificateStep;
