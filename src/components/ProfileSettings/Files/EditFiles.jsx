import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';

import {
  Row,
  Text,
  Svg,
  Span,
  Modal,
  Button,
  Col,
  scrollbar,
} from 'components';
import { deleteFile, getMyProfileFiles, updateFile } from 'actions';
import { Plus } from './Files.styles';
import EditWithClearInput from 'components/inputs/material/EditWithClearInput';

const EditFiles = ({
  setIsEditClicked,
  fileGroup,
  addFileHandler,
  fileGroupsArr,
  fileTypeId,
}) => {
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
    setFiles(files.filter((file) => file.id !== fileId.current));
    closeDeleteModal();
    dispatch(getMyProfileFiles());
  };

  return (
    <>
      <Text
        color="blue"
        fontWeight="500"
        fontSize="0.9rem"
        cursor="pointer"
        onClick={() => setIsEditClicked(false)}
        mb="5px"
      >
        {fileGroup.name}
      </Text>

      <EditWrapper>
        {files?.map((file) => (
          <EditWithClearInput
            width={['100%', '45%']}
            data={file}
            onClear={() => {
              fileId.current = file.id;
              openDeleteModal();
            }}
            onEditComplete={(value) => {
              dispatch(
                updateFile(file.id, value, () => dispatch(getMyProfileFiles()))
              );
            }}
            value={file.name}
          />
        ))}

        <Row
          alignItems="center"
          justifyContent="flexStart"
          width={['100%', '45%', '45%']}
        >
          <Span color="dark" fontWeight="500" fontSize="0.8rem" mr="7px">
            Dosya yükle
          </Span>
          <Plus onClick={(e) => addFileHandler(e, fileGroup.id)}>+</Plus>
        </Row>
      </EditWrapper>

      <StyledModal ref={deleteFileModalRef}>
        <Col p="60px 30px 0" alignItems="center">
          <Svg.WarningIcon />

          <Text my="30px" textAlign="center" color="dark" lineHeight="27px">
            Seçtiğiniz belgeyi silmek üzeresiniz. Bu işlemi yapmak istediğinize
            emin misiniz?
          </Text>
        </Col>

        <Row mb="40px" width="100%">
          <Button color="red" light text="VAZGEÇ" onClick={closeDeleteModal} />
          <Button
            light
            text="SİL"
            onClick={() =>
              dispatch(deleteFile(fileId.current, deleteFileSuccessHandler))
            }
          />
        </Row>
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
