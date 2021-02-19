import React from 'react';

import FileUpload from './FileUpload';
import { FACE_PICTURE } from '../../../constants';

const FacePictureStep = () => {
  return (
    <FileUpload
      fileTypeId={FACE_PICTURE}
      title="Yüzünüzün net bir şekilde görüldüğü fotoğrafınızı ekleyin. "
    />
  );
};

export default FacePictureStep;
