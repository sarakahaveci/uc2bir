import React, { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AccordionItem = ({ children, defaultOpen = false }) => {
  const uid = useMemo(() => uuidv4(), []);

  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          defaultOpen,
          uid,
        })
      )}
    </div>
  );
};

export default AccordionItem;
