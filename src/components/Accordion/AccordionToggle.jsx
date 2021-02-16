import React, { useContext } from 'react';

import { AccordionContext } from './Accordion';

const AccordionToggle = ({ children, uid }) => {
  const { activeId, setActiveId } = useContext(AccordionContext);

  const isActive = uid === activeId;

  const toggleClickHandler = () => {
    if (uid === activeId) {
      setActiveId('');
    } else {
      setActiveId(uid);
    }
  };

  return (
    <div style={{ cursor: 'pointer' }} onClick={toggleClickHandler}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          isActive,
        })
      )}
    </div>
  );
};

export default AccordionToggle;
