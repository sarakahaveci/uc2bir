import React from 'react';

import RegisterFileUpload from './RegisterFileUpload';
import { FACE_PICTURE } from '../../../constants';

const FacePictureStep = () => {
  return (
    <RegisterFileUpload
      fileTypeId={FACE_PICTURE}
      title="Yüzünüzün net bir şekilde görüldüğü fotoğrafınızı ekleyin. "
    />
  );
};

export default FacePictureStep;
