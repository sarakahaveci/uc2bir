import React, { useState, forwardRef, useImperativeHandle } from 'react';

import { Modal } from 'react-bootstrap';

const EditedModal = forwardRef(({ children, className }, ref) => {
  const [open, setOpen] = useState();

  useImperativeHandle(ref, () => {
    return {
      openModal: () => open(),
      closeModal: () => setOpen(false),
    };
  });

  return (
    <Modal className={className} open={open} onHide={() => setOpen(!open)}>
      {children}
    </Modal>
  );
});

export default EditedModal;
