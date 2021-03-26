import React, { useContext } from 'react';

import { AccordionContext, AccordionItemContext } from './AccordionContext';

const AccordionToggle = ({ children, uid }) => {
  const { activeId, setActiveId } = useContext(AccordionContext);
  const { isActive } = useContext(AccordionItemContext);

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
