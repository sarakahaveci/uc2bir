import React from 'react';
import { Button } from 'react-bootstrap';

import CloseIcon from 'components/statics/svg/images/close.svg';

export default function SelectiveButton({
  id,
  name = 'asdas',
  selectButtonHandler,
  isActive,
}) {
  const buttonClass = isActive ? 'branch-button activeButton' : 'branch-button';

  return (
    <Button
      key={id}
      className={buttonClass}
      onClick={() => selectButtonHandler(id)}
    >
      {name} <img src={CloseIcon} alt="" />
    </Button>
  );
}
