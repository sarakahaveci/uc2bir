/* eslint-disable react/display-name */
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import styled, { css } from 'styled-components/macro';

import { Svg } from 'components';
import { Modal } from 'react-bootstrap';

export const ModalFooter = ({ children }) => (
  <StyledFooter>{children}</StyledFooter>
);

const EditedModal = forwardRef(
  (
    { children, className, closeIcon, onExit, backdrop, activateFooter },
    ref
  ) => {
    const [open, setOpen] = useState();

    useImperativeHandle(ref, () => {
      return {
        openModal: () => setOpen(true),
        closeModal: () => setOpen(false),
      };
    });

    return (
      <StyledModal
        activateFooter={activateFooter}
        className={className}
        backdrop={backdrop}
        show={open}
        onExit={() => {
          onExit();
          setOpen(false);
        }}
        onHide={() => {
          onExit();
          setOpen(false);
        }}
      >
        {closeIcon && <CloseIcon onClick={() => setOpen(false)} />}

        {children}
      </StyledModal>
    );
  }
);

EditedModal.displayName = 'Modal';
EditedModal.Footer = ModalFooter;

export default EditedModal;

EditedModal.defaultProps = {
  closeIcon: true,
  onExit: () => {},
};

const StyledFooter = styled.div`
  border-top: 1px solid rgba(144, 144, 144, 0.2);
  padding: 20px 0;
`;

const StyledModal = styled(Modal)`
  ${(p) =>
    p.activateFooter &&
    css`
      .modal-content {
        padding: 0;
      }
    `}
`;

const CloseIcon = styled(Svg.CloseIcon)`
  svg {
    z-index: 5;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
  }
`;
