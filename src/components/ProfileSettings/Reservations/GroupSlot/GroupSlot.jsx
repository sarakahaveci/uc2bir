import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import { BackLink } from 'components';
import GroupLeftSelections from './GroupLeftSelections';
import GroupRightSelections from './GroupRightSelections';

export default function GroupSlot() {
  const [selectedDayHours, setSelectedDayHours] = useState([]);
  const [classSelection, setClassSelection] = useState({});

  return (
    <div>
      <BackLink text="Grup Ders Oluştur" mb="20px" path="/" />

      <Row>
        <Col lg={6}>
          <GroupLeftSelections
            selectedDayHours={selectedDayHours}
            setSelectedDayHours={setSelectedDayHours}
            classSelection={classSelection}
            setClassSelection={setClassSelection}
          />
        </Col>
        <Col lg={6}>
          <GroupRightSelections
            classSelection={classSelection}
            setClassSelection={setClassSelection}
          />
        </Col>
      </Row>
    </div>
  );
}
