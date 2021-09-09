import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { StepContext } from '../RegisterSteps';
import { Button, FileUpload } from 'components';

const RegisterFileUpload = ({ title = '', children, buttonText = 'Devam', fileTypeId }) => { // Buraya translate yazma sunucuda patlıyor
  const { t } = useTranslation();

  const { setStepNumber } = useContext(StepContext) || {};

  const [uploadedFiles, setUploadedFiles] = useState({});

  const isValidProgress = Object.keys(uploadedFiles).some(
    (key) => uploadedFiles[key].progressPercentage === 100
  );

  return (
    <>
      {children}

      <FileUpload
        title={title}
        fileTypeId={fileTypeId}
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
      />

      <div className="file-upload__next-button">
        <Button
          onClick={() => setStepNumber((value) => value + 1)}
          text={buttonText}
          className="blue"
          disabled={!isValidProgress}
        />

        <div className="file-upload__next-link">
          <button onClick={() => setStepNumber((value) => value + 1)}>
            {t('skip')}
          </button>
        </div>
      </div>
    </>
  );


};

RegisterFileUpload.propTypes = {
  buttonText: PropTypes.string,
  title: PropTypes.string,
};


export default RegisterFileUpload;
