import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Title } from 'components';
import CashTransferUser from 'components/CashTransferUser';
import CashTransferConfirmUser from 'components/CashTransferConfirmUser';

const UserTransfer = ({ setPage }) => {
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
            {`< Cüzdanıma Bakiye Yükle`}
          </Title>
          <Col lg={6}>
            <CashTransferUser />
          </Col>
          <Col lg={6}>
            <CashTransferConfirmUser />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserTransfer;
