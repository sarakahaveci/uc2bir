import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { StepContext } from '../RegisterSteps';
import { Button, FileUpload } from 'components';

const RegisterFileUpload = ({
  title,
  children,
  buttonText,
  fileTypeId,
  showPassButton,
}) => {
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

        {showPassButton && (
          <div className="file-upload__next-link">
            <button onClick={() => setStepNumber((value) => value + 1)}>
              Geç
            </button>
          </div>
        )}
      </div>
    </>
  );
};

RegisterFileUpload.propTypes = {
  buttonText: PropTypes.string,
  showPassButton: PropTypes.bool,
  title: PropTypes.string,
};

RegisterFileUpload.defaultProps = {
  buttonText: 'Devam Et',
  showPassButton: false,
  title: '',
};

export default RegisterFileUpload;
