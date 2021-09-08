import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Title } from 'components';
import CashTransferUser from 'components/CashTransferUser';
import CashTransferConfirmUser from 'components/CashTransferConfirmUser';
import { useTranslation } from 'react-i18next';

const UserTransfer = ({ setPage }) => {
  const { t } = useTranslation();

  const [amount, setAmount] = useState(null);
  const [defaultCardName] = useState(null);
  const [defaultSKT] = useState(null);
  const [defaultCardNo] = useState(null);
  const [defaultCVV] = useState(null);
  const [cardName, setCardName] = useState(null);
  const [cardNo, setCardNo] = useState(null);
  const [sktMM, setSktMM] = useState(null);
  const [sktYY, setSktYY] = useState(null);
  const [CVV, setCVV] = useState(null);

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
            {t('< Top Up My Wallet')}
          </Title>
          <Col lg={12} xl={6}>
            <CashTransferUser
              setAmount={setAmount}
              defaultCardName={defaultCardName}
              defaultSKT={defaultSKT}
              defaultCardNo={defaultCardNo}
              defaultCVV={defaultCVV}
              setCardName={setCardName}
              setCardNo={setCardNo}
              setSktMM={setSktMM}
              setSktYY={setSktYY}
              setCVV={setCVV}
            />
          </Col>
          <Col lg={12} xl={6}>
            <CashTransferConfirmUser
              amount={amount}
              setAmount={setAmount}
              defaultCardName={defaultCardName}
              defaultSKT={defaultSKT}
              defaultCardNo={defaultCardNo}
              defaultCVV={defaultCVV}
              cardName={cardName}
              cardNo={cardNo}
              sktMM={sktMM}
              sktYY={sktYY}
              CVV={CVV}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserTransfer;
