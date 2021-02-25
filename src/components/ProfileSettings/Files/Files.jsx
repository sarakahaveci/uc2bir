import React, { useRef, useState, useEffect } from 'react';

import { Row, Modal, Title, Text, Button, FileUpload } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { getMyProfileFiles } from 'actions';
import FileCellRow from './FileCellRow';
import EditFile from './FileInputs';

const Files = () => {
  const fileRef = useRef();
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProfileFiles());
  }, []);

  const openModal = (e) => {
    e.stopPropagation();
    fileRef.current.openModal();
  };

  const isValidProgress = Object.keys(uploadedFiles).some(
    (key) => uploadedFiles[key].progressPercentage === 100
  );

  const modalContent = (
    <>
      <Title variant="h5" textAlign="left" fontSize="1.3rem" fontWeight="600">
        Belge Yükle
      </Title>

      <Text color="dark" fontSize="0.9rem">
        İlgili kurumlardan aldığınız sağlık raporunuzu ekleyin.
      </Text>

      <FileUpload
        showRegisterInfo={false}
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
      />

      <Text color="red" fontSize="0.9rem">
        E-devlet üzerinden alabileceğiniz adli sicil kaydınızı ekleyin.
        Aşağıdaki linkten e-devlete ulaşabilirsiniz.
      </Text>

      <Row center my="15px">
        <Button
          disabled={!isValidProgress}
          className="blue"
          width="200px"
          text="Yükle"
          onClick={() => fileRef.current.closeModal()}
        />
      </Row>
    </>
  );

  return (
    <div>
      {isEditClicked ? (
        <EditFile setIsEditClicked={setIsEditClicked} />
      ) : (
        <Row
          alignItems="center"
          flexWrap="wrap"
          justifyContent="space-between"
          isEditClicked={isEditClicked}
        >
          <FileCellRow
            setIsEditClicked={setIsEditClicked}
            openModal={openModal}
          />

          <FileCellRow
            setIsEditClicked={setIsEditClicked}
            openModal={openModal}
          />
          <FileCellRow
            setIsEditClicked={setIsEditClicked}
            openModal={openModal}
          />
          <FileCellRow
            setIsEditClicked={setIsEditClicked}
            openModal={openModal}
          />
          <FileCellRow
            setIsEditClicked={setIsEditClicked}
            openModal={openModal}
          />
        </Row>
      )}

      <Modal ref={fileRef}>{modalContent}</Modal>
    </div>
  );
};

export default Files;
