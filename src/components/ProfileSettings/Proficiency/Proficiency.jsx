import React from 'react';

import { Text, Accordion } from 'components';

const Proficiency = () => {
  return (
    <div>
      <Text color="dark" fontSize="1rem"></Text>

      <Text color="dark" fontSize="0.9rem" fontWeight="500">
        Branşlarınıza ait uzmanlıklarınızı giriniz.
      </Text>

      <Accordion>
        <ProficiencyRow />
      </Accordion>
    </div>
  );
};

export default Proficiency;
