import React from 'react';
import { useTranslation } from 'react-i18next';

import RegisterFileUpload from './RegisterFileUpload';
import { FACE_PICTURE } from '../../../constants';

const FacePictureStep = () => {
  const { t } = useTranslation();

  return (
    <RegisterFileUpload
      fileTypeId={FACE_PICTURE}
      title={t('Add your photo with a clear view of your face')}
    />
  );
};

export default FacePictureStep;
