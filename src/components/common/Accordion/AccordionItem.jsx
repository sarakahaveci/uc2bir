import React, { useEffect, useMemo, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { AccordionContext, AccordionItemContext } from './AccordionContext';

const AccordionItem = ({ children, defaultOpen = false }) => {
  const { activeId, setActiveId } = useContext(AccordionContext);

  useEffect(() => {
    if (defaultOpen) {
      setActiveId(uid);
    }
  }, []);

  const uid = useMemo(() => uuidv4(), []);

  const isActive = activeId === uid;

  return (
    <AccordionItemContext.Provider value={{ isActive }}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          defaultOpen,
          uid,
        })
      )}
    </AccordionItemContext.Provider>
  );
};

export default AccordionItem;
