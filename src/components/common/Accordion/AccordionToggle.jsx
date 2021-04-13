import React, { useContext } from 'react';

import { AccordionContext, AccordionItemContext } from './AccordionContext';

const AccordionToggle = ({ children, uid, className, onToggle = () => {} }) => {
  const { activeId, setActiveId } = useContext(AccordionContext);
  const { isActive } = useContext(AccordionItemContext);

  const toggleClickHandler = () => {
    if (uid === activeId) {
      setActiveId('');
      onToggle(false);
    } else {
      setActiveId(uid);
      onToggle(true);
    }
  };

  return (
    <div
      className={className}
      style={{ cursor: 'pointer' }}
      onClick={toggleClickHandler}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          isActive,
        })
      )}
    </div>
  );
};

export default AccordionToggle;
