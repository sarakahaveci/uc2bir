import React, { useState } from 'react';

import AccordionItem from './AccordionItem';
import AccordionToggle from './AccordionToggle';
import AccordionCollapse from './AccordionCollapse';
import { AccordionContext } from './AccordionContext';

const Accordion = ({ children }) => {
  const [activeId, setActiveId] = useState('');

  return (
    <AccordionContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </AccordionContext.Provider>
  );
};

Accordion.Item = AccordionItem;
Accordion.Toggle = AccordionToggle;
Accordion.Collapse = AccordionCollapse;

export default Accordion;
