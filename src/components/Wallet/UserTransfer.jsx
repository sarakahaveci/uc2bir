import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Title } from 'components';
import CashTransferUser from 'components/CashTransferUser';
import CashTransferConfirmUser from 'components/CashTransferConfirmUser';

const UserTransfer = ({ setPage }) => {
  const [amount, setAmount] = useState(null);
  const [defaultCardName] = useState(null);
  const [defaultSKT] = useState(null);
  const [defaultCardNo] = useState(null);
  const [defaultCVV] = useState(null);
  const onCardName = () => {};
  const onCardNo = () => {};
  const onSKT = () => {};
  const onCVV = () => {};

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
          <Col lg={12} xl={6}>
            <CashTransferUser
              setAmount={setAmount}
              defaultCardName={defaultCardName}
              defaultSKT={defaultSKT}
              defaultCardNo={defaultCardNo}
              defaultCVV={defaultCVV}
              onCardName={onCardName}
              onCardNo={onCardNo}
              onSKT={onSKT}
              onCVV={onCVV}
            />
          </Col>
          <Col lg={12} xl={6}>
            <CashTransferConfirmUser amount={amount} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserTransfer;
