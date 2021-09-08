import React, { forwardRef } from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Box, Modal, Text, Svg } from 'components';

const TemplateSuccessModal = forwardRef(({ openApplyTemplateModal }, ref) => {
  const { t } = useTranslation();

  return (
    <StyledTemplateSuccessModal activateFooter ref={ref}>
      <div className="reservation-template__success-modal">
        <Box center mb="35px">
          <Svg.SuccessIcon />
        </Box>

        <Text textAlign="center" fontSize="1.1rem" fontWeight="600">
          {t('Congratulations')}
        </Text>

        <Text textAlign="center" fontSize="1.1rem" mb="15px">
          {t('Your template has been successfully saved')}
        </Text>
      </div>

      <Modal.Footer>
        <Text
          textAlign="center"
          p="0 0 20px 0"
          color="blue"
          cursor="pointer"
          onClick={openApplyTemplateModal}
        >
          {t('APPLY MY TEMPLATE TO MY CALENDAR')}
        </Text>

        <Link to="/" className="reservation-template__return-homepage">
          {t('HOME PAGE')}
        </Link>
      </Modal.Footer>
    </StyledTemplateSuccessModal>
  );
});

export default TemplateSuccessModal;

const StyledTemplateSuccessModal = styled(Modal)`
  .modal-content {
    width: 500px;
  }

  .reservation-template {
    &__success-modal {
      padding: 20px 0;
    }

    &__return-homepage {
      border-top: 1px solid rgba(144, 144, 144, 0.2);
      text-align: center;
      padding-top: 20px;
      cursor: pointer;
      color: ${(p) => p.theme.colors.dark};
      display: block;
    }
  }
`;
