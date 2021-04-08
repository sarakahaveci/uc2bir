import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import GroupLeftSelections from './GroupLeftSelections';
import GroupRightSelections from './GroupRightSelections';

export default function GroupSlot() {
  const [selectedDayHours, setSelectedDayHours] = useState([]);

  return (
    <Row>
      <Col lg={6}>
        <GroupLeftSelections
          selectedDayHours={selectedDayHours}
          setSelectedDayHours={setSelectedDayHours}
        />
      </Col>
      <Col lg={6}>
        <GroupRightSelections />
      </Col>
    </Row>
  );
}
