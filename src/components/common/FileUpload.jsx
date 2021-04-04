import React from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { useSelector, useDispatch } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Resizer from 'react-image-file-resizer';

import { deleteFile } from 'actions';
import { Text, Button, Svg } from 'components';

const FileUpload = ({
  fileTypeId,
  uploadedFiles,
  setUploadedFiles,
  showRegisterInfo,
  title,
}) => {
  const { accessToken, isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const history = useHistory();
  const resizeFile = (file) =>
    new Promise((resolve) => {
      if (file.type.includes('image')) {
        //Only İmage Formats
        Resizer.imageFileResizer(
          file,
          800,
          800,
          'JPEG',
          70,
          0,
          (uri) => {
            resolve(uri);
          },
          'file'
        );
      } else {
        resolve(file);
      }
    });
  const onDropAccepted = async (files) => {
    const formData = new FormData();

    for (const file of files) {
      const out = await resizeFile(file);
      formData.append('files[]', out);
    }
    formData.append('type_id', fileTypeId);

    try {
      if (!isAuthenticated) {
        toast.error('Giriş yapma sayfasına yönlendiriliyorsunuz.', {
          position: 'bottom-right',
          autoClose: 2000,
          onClose: () => history.push('/login'),
        });
        return;
      }

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/profile/file`,
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

      toast.error(err?.response?.data?.message, {
        position: 'bottom-right',
        autoClose: 2000,
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    onDropRejected: () =>
      toast.error('Desteklenmeyen dosya türü', {
        position: 'bottom-right',
      }),
    accept: ['image/*', '.pdf'],
  });

  const deleteFileSuccessHandler = (key) => {
    // Deletes selected key
    // eslint-disable-next-line no-unused-vars
    const { [key]: dynamicFileName, ...rest } = uploadedFiles;

    setUploadedFiles(rest);
  };

  const FilesInfoList = Object.keys(uploadedFiles).map((key) => {
    const { progressPercentage, fileId } = uploadedFiles[key];

    const splitedFileKey = key.split('.');

    return (
      <>
        <div className="file-upload__info-row">
          {progressPercentage === 'error' ? (
            <Svg.ErrorIcon />
          ) : (
            progressPercentage === 100 && <Svg.TickWithBgIcon />
          )}

          <span className="file-upload__file-name">{splitedFileKey[0]}</span>

          <span>.{splitedFileKey[1]}</span>

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

  return (
    <div className="file-upload">
      <div className="file-upload__text-wrapper">
        {showRegisterInfo && (
          <Text color="dark" fontSize="1.2rem" fontWeight="300">
            Lütfen Kayıt İçin Gerekli Belgeleri Yükleyin
          </Text>
        )}

        <Text color="#f77e0b" fontSize="1.2rem">
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
    </div>
  );
};

FileUpload.defaultProps = {
  fileTypeId: null,
  uploadedFiles: {},
  setUploadedFiles: () => {},
  title: '',
  showRegisterInfo: true,
};

FileUpload.propTypes = {
  fileTypeId: PropTypes.number,
  uploadedFiles: PropTypes.object,
  setUploadedFiles: PropTypes.func,
  title: PropTypes.string,
  showRegisterInfo: PropTypes.bool,
};

export default FileUpload;
