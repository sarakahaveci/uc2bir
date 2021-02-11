import React, { useState, useContext, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { deleteFile } from 'actions';
import { useFileTypeIdFinder } from 'utils';
import { StepContext } from './RegisterSteps';
import { Text, Button } from 'components';
import Svg from 'components/statics/svg';

const FileUpload = ({
  title,
  children,
  buttonText,
  fileTypeName,
  showPassButton,
}) => {
  const { accessToken, isAuthenticated } = useSelector((state) => state.auth);

  const fileTypeId = useFileTypeIdFinder(fileTypeName);
  console.log('fileTypeName: ', fileTypeName);
  console.log('fileTypeId: ', fileTypeId);

  const [uploadedFiles, setUploadedFiles] = useState({});

  const { setStepNumber } = useContext(StepContext);

  const dispatch = useDispatch();
  const history = useHistory();

  const onDrop = useCallback(async (files) => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('files[]', file);
    });

    formData.append('type_id', fileTypeId);

    try {
      // TODO: Servislerde iyileştirme yapılması bekleniyor
      if (!isAuthenticated) throw new Error();

      await axios.post(
        'http://gateway.ms.321.4alabs.com/user/profile/file',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
          onUploadProgress: (progressEvent) => {
            let tempUploadedFiles;

            files.forEach((file) => {
              tempUploadedFiles = {
                ...tempUploadedFiles,
                [file.name]: {
                  fileId: 0,
                  progressPercentage: parseInt(
                    Math.round(
                      (progressEvent.loaded * 100) / progressEvent.total
                    )
                  ),
                },
              };
            });

            setUploadedFiles((files) => ({
              ...files,
              ...tempUploadedFiles,
            }));
          },
        }
      );
    } catch (err) {
      let tempUploadedFiles;

      files.forEach((file) => {
        tempUploadedFiles = {
          ...tempUploadedFiles,
          [file.name]: {
            fileId: 0,
            progressPercentage: 'error',
          },
        };
      });

      setUploadedFiles((files) => ({ ...files, ...tempUploadedFiles }));

      toast.error('Giriş yapma sayfasına yönlendiriliyorsunuz.', {
        position: 'bottom-right',
        autoClose: 2000,
        onClose: () => history.push('/'),
      });
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const deleteFileHandler = (fileId) => dispatch(deleteFile(fileId));

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

          {/* TODO: File delete  */}
          <Svg.TrashIcon
            className="file-upload__trash-icon"
            onClick={() => deleteFileHandler(fileId)}
          />
        </div>

        <ProgressBar
          now={progressPercentage === 'error' ? 0 : progressPercentage}
        />
      </>
    );
  });

  const isValidProgress = Object.keys(uploadedFiles).some(
    (key) => uploadedFiles[key] !== 'error'
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

        {/* {showPassButton && <button className="file-upload__next-link" onClick={() => }>Geç</button>} */}
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
