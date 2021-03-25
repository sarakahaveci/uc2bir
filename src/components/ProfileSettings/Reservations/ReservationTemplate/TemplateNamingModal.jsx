import React, { forwardRef } from 'react';
import styled from 'styled-components/macro';

import { Box, Modal, Text, Title, Material } from 'components';

const TemplateNamingModal = forwardRef(({ openSuccessTemplateModal }, ref) => {
  return (
    <StyledTemplateNamingModal activateFooter ref={ref}>
      <div className="reservation-template__naming-modal">
        <Title textAlign="left" color="blue">
          Şablonunuza İsim Verin
        </Title>

        <Box my="30px">
          <Material.TextField label="Yazınız" />
        </Box>
      </div>

      <Modal.Footer>
        <Text
          color="blue"
          textAlign="center"
          cursor="pointer"
          onClick={openSuccessTemplateModal}
        >
          {/* <Spinner type="static" /> */}
          KAYDET
        </Text>
      </Modal.Footer>
    </StyledTemplateNamingModal>
  );
});

export default TemplateNamingModal;

const StyledTemplateNamingModal = styled(Modal)`
  .modal-content {
    width: 500px;
  }

  .reservation-template__naming-modal {
    padding: 40px;
  }
`;
