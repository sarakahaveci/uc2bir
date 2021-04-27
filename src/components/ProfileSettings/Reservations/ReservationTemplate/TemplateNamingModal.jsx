import React, { forwardRef } from 'react';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';

import { getTemplates, saveTemplate } from 'actions';
import { Box, Modal, Button, Title, Material } from 'components';

const TemplateNamingModal = forwardRef(
  ({ openSuccessTemplateModal, templateName, setTemplateName }, ref) => {
    const dispatch = useDispatch();

    const saveSuccessCallback = () => {
      dispatch(getTemplates());
      openSuccessTemplateModal();
      ref.current.closeModal();
    };

    const saveClickHandler = () =>{
      dispatch(saveTemplate(templateName, saveSuccessCallback));
    }


    return (
      <StyledTemplateNamingModal activateFooter ref={ref}>
        <div className="reservation-template__naming-modal">
          <Title textAlign="left" color="blue">
            Şablonunuza İsim Verin
          </Title>

          <Box my="30px">
            <Material.TextField
              label="Yazınız"
              onChange={(e) => setTemplateName(e.target.value)}
            />
          </Box>
        </div>

        <Modal.Footer>
          <Box row justifyContent="center">
            <Button
              color="blue"
              cursor="pointer"
              type="text"
              onClick={saveClickHandler}
              disabled={templateName.trim() === ''}
              text="KAYDET"
            />
          </Box>
        </Modal.Footer>
      </StyledTemplateNamingModal>
    );
  }
);

export default TemplateNamingModal;

const StyledTemplateNamingModal = styled(Modal)`
  .modal-content {
    width: 500px;
  }

  .reservation-template__naming-modal {
    padding: 40px;
  }
`;
