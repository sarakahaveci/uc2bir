import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CashTransfer, CashTransferConfirm } from 'components';
import { Title } from 'components';

const Transfer = ({ setPage }) => {
  return (
    <>
      <Container>
        <Row>
          <Title
            style={{ cursor: 'pointer', marginLeft: '20px' }}
            fontSize="12pt"
            textAlign="left"
            onClick={() => setPage('home')}
          >
            {`< Hesap Hareketlerim`}
          </Title>
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
