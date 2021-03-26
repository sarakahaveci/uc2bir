import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

import { Box, Modal, Title, Text, Button, FileUpload } from 'components';
import { getMyProfileFiles } from 'actions';
import FileCellRow from './FileCellRow';
import EditFiles from './EditFiles';
import { fileDetails } from '../../../constants';

const Files = () => {
  const { data: fileGroupsArr } = useSelector(
    (state) => state.profileSettings2.fileSettings.files
  );

  const [isEditClicked, setIsEditClicked] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [fileTypeId, setFileTypeId] = useState(null);
  const [fileGroup, setFileGroup] = useState({});

  const fileRef = useRef();
  const wrapperRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProfileFiles());
  }, []);

  const modalOnExitHandler = () => {
    if (!isEmpty(uploadedFiles)) {
      dispatch(getMyProfileFiles());
    }

    setUploadedFiles({});
  };

  const addFileHandler = (e, fileType) => {
    e.stopPropagation();
    fileRef.current.openModal();
    setFileTypeId(fileType);
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
        {fileDetails[fileTypeId]}
      </Text>

      <FileUpload
        showRegisterInfo={false}
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
        fileTypeId={fileTypeId}
      />

      <Box center my="15px">
        <Button
          disabled={!isValidProgress}
          className="blue"
          width="200px"
          text="Tamam"
          onClick={() => fileRef.current.closeModal()}
        />
      </Box>
    </>
  );

  return (
    <div ref={wrapperRef}>
      {isEditClicked ? (
        <EditFiles
          fileGroupsArr={fileGroupsArr}
          fileGroup={fileGroup}
          setIsEditClicked={setIsEditClicked}
          addFileHandler={addFileHandler}
          fileTypeId={fileTypeId}
        />
      ) : (
        <Box
          row
          alignItems="center"
          flexWrap="wrap"
          justifyContent="space-between"
          isEditClicked={isEditClicked}
        >
          {fileGroupsArr.map((file, index) => (
            <FileCellRow
              key={'files' + index}
              file={file}
              setIsEditClicked={setIsEditClicked}
              addFileHandler={addFileHandler}
              setFileGroup={setFileGroup}
              setFileTypeId={setFileTypeId}
            />
          ))}
        </Box>
      )}

      <Modal onExit={modalOnExitHandler} ref={fileRef}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default Files;
