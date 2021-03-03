import React from 'react';

import { Accordion, PlusButton, Text } from 'components';

const ProficiencyRow = ({ sport, sportIcon }) => {
  return (
    <div>
      <Accordion.Toggle>
        <div>
          {sportIcon}
          {sport}
          <div>
            <Text>Uzmanlık Ekle</Text>

            <PlusButton />
          </div>
        </div>
      </Accordion.Toggle>
      <Accordion.Collapse></Accordion.Collapse>
    </div>
  );
};

export default ProficiencyRow;
