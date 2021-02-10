import React, { useState, useContext, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { StepContext } from './RegisterSteps';
import { Text, Button } from 'components';
import Svg from 'components/statics/svg';

const FileUpload = ({ title, children, buttonText, showPassButton }) => {
  const { accessToken } = useSelector((state) => state.auth);

  const [uploadPercentage, setUploadPercentage] = useState(0);

  const { setStepNumber } = useContext(StepContext);

  const onDrop = useCallback(async (files) => {
    const formData = new FormData();

    formData.append('files', files);
    formData.append('type_id', 1);

    console.log('acceptedFiles1: ', files);

    try {
      const res = await axios.post(
        'http://gateway.ms.321.4alabs.com/user/profile/file',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },

          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );

            // Clear percentage
            setTimeout(() => setUploadPercentage(0), 10000);
          },
        }
      );

      console.log(res);

      //   const { fileName, filePath } = res.data;

      // setUploadedFile({ fileName, filePath });

      // setMessage('File Uploaded');
    } catch (err) {
      // if (err.response.status === 500) {
      //   setMessage('There was a problem with the server');
      // } else {
      //   setMessage(err.response.data.msg);
      // }
    }
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  console.log('acceptedFiles:2 ', acceptedFiles);

  const files = acceptedFiles.map((file) => (
    <li key={file.path} className="file-path">
      {file.path}
    </li>
  ));

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
        <aside>
          <ul>{files}</ul>
        </aside>
      </section>

      {children}

      <div className="file-upload__next-button">
        <Button
          onClick={() => setStepNumber((value) => value + 1)}
          text={buttonText}
          className="blue"
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
