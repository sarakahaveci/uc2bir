import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { BackLink } from 'components';
import GroupLeftSelections from './GroupLeftSelections';
import GroupRightSelections from './GroupRightSelections';

export default function GroupSlot() {
  return (
    <>
      <BackLink text="Grup Ders Oluştur" mb="20px" path="/" />

      <Row>
        <Col lg={6}>
          <GroupLeftSelections />
        </Col>

        <Col lg={6}>
          <GroupRightSelections />
        </Col>
      </Row>
    </>
  );
}
