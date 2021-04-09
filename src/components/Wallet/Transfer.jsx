import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CashTransfer, CashTransferConfirm } from 'components';

const Transfer = ({}) => {
  return (
    <>
      <Container>
        <Row>
          <Col lg={6}>
            <CashTransfer></CashTransfer>
          </Col>
          <Col lg={6}>
            <CashTransferConfirm></CashTransferConfirm>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Transfer;
