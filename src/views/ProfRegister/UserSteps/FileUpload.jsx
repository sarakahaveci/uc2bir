import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { deleteFile } from 'actions';
import { useFileTypeIdFinder } from 'utils';
import { StepContext } from '../RegisterSteps';
import { Text, Button } from 'components';
import Svg from 'components/statics/svg';

const FileUpload = ({
  title,
  children,
  buttonText,
  fileTypeId,
  showPassButton,
}) => {
  const { accessToken, isAuthenticated } = useSelector((state) => state.auth);

  const foundFileTypeId = useFileTypeIdFinder(fileTypeId);

  const [uploadedFiles, setUploadedFiles] = useState({});

  const { setStepNumber } = useContext(StepContext);

  const dispatch = useDispatch();
  const history = useHistory();

  const onDrop = async (files) => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('files[]', file);
    });

    formData.append('type_id', foundFileTypeId);

    try {
      if (!isAuthenticated) {
        toast.error('Giriş yapma sayfasına yönlendiriliyorsunuz.', {
          position: 'bottom-right',
          autoClose: 2000,
          onClose: () => history.push('/'),
        });
        return;
      }

      const { data } = await axios.post(
        'http://gateway.ms.321.4alabs.com/user/profile/file',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
          // Setting file objects progress during upload
          onUploadProgress: (progressEvent) => {
            const inProgressFiles = files.reduce((acc, curr) => {
              let tempAcc = {};

              tempAcc = {
                ...acc,
                [curr.name]: {
                  fileId: 0,
                  progressPercentage: parseInt(
                    Math.round(
                      (progressEvent.loaded * 100) / progressEvent.total
                    )
                  ),
                },
              };

              return tempAcc;
            }, {});

            setUploadedFiles((files) => ({
              ...files,
              ...inProgressFiles,
            }));
          },
        }
      );

      // If response is success add fileIds to them
      const filesWithFileIds = data?.data.reduce((acc, curr, index) => {
        let tempAcc = {};

        tempAcc = {
          ...acc,
          [files[index].name]: {
            fileId: curr.id,
            progressPercentage: 100,
          },
        };

        return tempAcc;
      }, {});

      setUploadedFiles((files) => ({
        ...files,
        ...filesWithFileIds,
      }));
    } catch (err) {
      const failedFiles = files.reduce((acc, curr) => {
        let tempAcc = {};

        tempAcc = {
          ...acc,
          [curr.name]: {
            fileId: 0,
            progressPercentage: 'error',
          },
        };

        return tempAcc;
      }, {});

      setUploadedFiles((files) => ({ ...files, ...failedFiles }));

      toast.error(err.response.data.message, {
        position: 'bottom-right',
        autoClose: 2000,
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ['image/*', '.pdf'],
  });

  const deleteFileSuccessHandler = (key) => {
    // Deletes selected key
    const { [key]: dynamicFileName, ...rest } = uploadedFiles;

    setUploadedFiles(rest);
  };

  const FilesInfoList = Object.keys(uploadedFiles).map((key) => {
    const { progressPercentage, fileId } = uploadedFiles[key];

    return (
      <>
        <div className="file-upload__info-row">
          {progressPercentage === 'error' ? (
            <Svg.ErrorIcon />
          ) : (
            progressPercentage === 100 && <Svg.TickIcon />
          )}

          <span>{key}</span>

          {progressPercentage === 100 && (
            <span
              className="file-upload__trash-icon"
              onClick={() =>
                dispatch(
                  deleteFile(fileId, () => deleteFileSuccessHandler(key))
                )
              }
            >
              <Svg.TrashIcon />
            </span>
          )}
        </div>

        <ProgressBar
          now={progressPercentage === 'error' ? 0 : progressPercentage}
        />
      </>
    );
  });

  const isValidProgress = Object.keys(uploadedFiles).some(
    (key) => uploadedFiles[key].progressPercentage === 100
  );

  return (
    <div className="file-upload">
      <div className="file-upload__text-wrapper">
        <Text color="dark" fontSize="1.2rem" fontWeight="300">
          Lütfen Kayıt Için Gerekli Belgeleri Yükleyin
        </Text>

        <Text color="dark" fontSize="1rem">
          {title}
        </Text>
      </div>

      <section className="file-upload__section">
        <div {...getRootProps({ className: 'file' })}>
          <input {...getInputProps()} />
          <Svg.UploadIcon className="upload-icon" />

          <Text
            fontSize="1.1rem"
            color="softDark"
            fontWeight="900"
            textAlign="center"
            margin="15px 0"
          >
            Sürükle Bırak
          </Text>

          <span className={'file-upload__or'}>Veya</span>

          <Button
            text="Bilgisayardan Yükle"
            fontWeight="600"
            className="blue"
            fontSize="0.8rem"
            margin="15px 0 0"
          />
        </div>
        <aside>{FilesInfoList}</aside>
      </section>

      {children}

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
    </div>
  );
};

FileUpload.propTypes = {
  buttonText: PropTypes.string,
  showPassButton: PropTypes.bool,
  title: PropTypes.string,
};

FileUpload.defaultProps = {
  buttonText: 'Devam Et',
  showPassButton: false,
  title: '',
};

export default FileUpload;
