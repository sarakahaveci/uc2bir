import React from 'react';
import { Button } from 'react-bootstrap';

export default function SelectiveButton({
  id,
  name = 'asdas',
  selectButtonHandler = () => {},
  isActive,
  indelible = false,
}) {
  const buttonClass = isActive ? 'branch-button activeButton' : 'branch-button';

  return (
    <Button
      key={id}
      className={buttonClass}
      onClick={() => selectButtonHandler(id)}
    >
      {name}
      {!indelible && isActive && <span className="button-close-icon">x</span>}
    </Button>
  );
}
