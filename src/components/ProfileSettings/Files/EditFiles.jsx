import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Text,
  Svg,
  Span,
  Modal,
  Button,
  scrollbar,
  PlusButton,
  BackLink,
} from 'components';
import { deleteFile, getMyProfileFiles, updateFile } from 'actions';
import { ACCEPTED } from '../../../constants';
import EditWithClearInput from 'components/inputs/material/EditWithClearInput';

const EditFiles = ({
  setIsEditClicked,
  fileGroup,
  addFileHandler,
  fileGroupsArr,
  fileTypeId,
}) => {
  const { t } = useTranslation();

  const [files, setFiles] = useState(fileGroup?.files || []);
  const deleteFileModalRef = useRef();
  const fileId = useRef(null);

  useEffect(() => {
    setFiles(fileGroupsArr.find((file) => file.id === fileTypeId)?.files);
  }, [fileGroupsArr]);

  const dispatch = useDispatch();

  const openDeleteModal = () => deleteFileModalRef.current.openModal();

  const closeDeleteModal = () => deleteFileModalRef.current.closeModal();

  const deleteFileSuccessHandler = () => {
    setFiles(files?.filter((file) => file.id !== fileId.current));
    closeDeleteModal();
    dispatch(getMyProfileFiles());
  };

  return (
    <>
      <Text onClick={() => setIsEditClicked(false)}>
        <BackLink text={t('< Back')} to="/myprofile/settings/profile" />
      </Text>

      <Text
        color="blue"
        fontWeight="500"
        fontSize="0.9rem"
        cursor="pointer"
        mb="5px"
      >
        {fileGroup.name}
      </Text>

      <EditWrapper>
        {files?.map((file, index) => (
          <EditWithClearInput
            key={'file' + index}
            showTickIcon={file.status.id === ACCEPTED}
            showEditButtons={file.status.id !== ACCEPTED}
            width={['100%', '45%']}
            data={file}
            onClear={() => {
              fileId.current = file.id;
              openDeleteModal();
            }}
            onEditComplete={(value) => {
              dispatch(updateFile(file.id, value));
              dispatch(getMyProfileFiles());
            }}
            value={file.name}
          />
        ))}

        <Box
          row
          alignItems="center"
          justifyContent="flexStart"
          width={['100%', '45%', '45%']}
        >
          <Span color="dark" fontWeight="500" fontSize="0.8rem" mr="7px">
            {t('Upload file')}
          </Span>
          <PlusButton onClick={(e) => addFileHandler(e, fileGroup.id)} />
        </Box>
      </EditWrapper>

      <StyledModal ref={deleteFileModalRef}>
        <Box col p="60px 30px 0" alignItems="center">
          <Svg.WarningIcon />

          <Text my="30px" textAlign="center" color="dark" lineHeight="27px">
            {t(
              'You are about to delete the selected document. Are you sure you want to do this?'
            )}
          </Text>
        </Box>

        <Box row mb="40px" width="100%">
          <Button
            color="red"
            light
            text={t('Give Up')}
            onClick={closeDeleteModal}
          />
          <Button
            light
            text={t('delete')}
            onClick={() =>
              dispatch(deleteFile(fileId.current, deleteFileSuccessHandler))
            }
          />
        </Box>
      </StyledModal>
    </>
  );
};

export default EditFiles;

EditFiles.defaultProps = {
  fileGroup: {},
};

const StyledModal = styled(Modal)`
  .modal-content {
    padding: 0;
    width: 450px;
    align-items: center;
  }
`;

const EditWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-height: 230px;
  overflow: auto;

  ${scrollbar}
`;
