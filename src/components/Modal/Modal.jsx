import React, { useState, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components/macro';

import { Svg } from 'components';
import { Modal } from 'react-bootstrap';

const EditedModal = forwardRef(({ children, className, closeIcon }, ref) => {
  const [open, setOpen] = useState();

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setOpen(true),
      closeModal: () => setOpen(false),
    };
  });

  return (
    <Modal className={className} show={open} onHide={() => setOpen(!open)}>
      {closeIcon && <CloseIcon onClick={() => setOpen(false)} />}

      {children}
    </Modal>
  );
});

export default EditedModal;

EditedModal.defaultProps = {
  closeIcon: true,
};

const CloseIcon = styled(Svg.CloseIcon)`
  svg {
    z-index: 5;
    width: 30px;
    height: 30px;
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
  }
`;
