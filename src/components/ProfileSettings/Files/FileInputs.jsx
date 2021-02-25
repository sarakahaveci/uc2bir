import React, { useRef } from 'react';
import styled, { css } from 'styled-components/macro';

import { Row, Text, Material, Svg, Span, Modal, Button, Col } from 'components';
import { deleteFile } from 'actions';
import { Plus } from './Files.styles';

const EditFile = ({ setIsEditClicked }) => {
  const deleteFileModalRef = useRef();

  const openDeleteModal = () => deleteFileModalRef.current.openModal();

  const closeDeleteModal = () => deleteFileModalRef.current.closeModal();

  const deleteFileSuccessHandler = () => {
    console.log('message');
  };

  return (
    <>
      <Text
        color="blue"
        fontWeight="500"
        fontSize="0.9rem"
        onClick={() => setIsEditClicked(false)}
      >
        Sertifika & Diploma
      </Text>

      <EditWrapper>
        <InputWrapper>
          <Material.TextField />
          <EditIcon />
          <InputClearIcon onClick={openDeleteModal} />
        </InputWrapper>

        <Row alignItems="center" flexBasis="45%" mt="10px">
          <Span color="dark" fontWeight="500" fontSize="0.8rem" mr="7px">
            Dosya yükle
          </Span>
          <Plus>+</Plus>
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
            onClick={(id) => deleteFile(id, deleteFileSuccessHandler)}
          />
        </Row>
      </StyledModal>
    </>
  );
};

export default EditFile;

const StyledModal = styled(Modal)`
  .modal-content {
    padding: 0;
    width: 450px;
    align-items: center;
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const icon = css`
  z-index: 5;
  position: absolute;
  right: 0;
  bottom: 10px;
  cursor: pointer;
`;

const InputClearIcon = styled(Svg.InputClearIcon)`
  svg {
    ${icon}
  }
`;

const EditIcon = styled(Svg.EditIcon)`
  svg {
    ${icon}
    right: 30px;
  }
`;

const EditWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .materials {
    flex: 0 0 45%;
  }
`;
