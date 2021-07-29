import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Title, Button } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Accounts from './Accounts';
import styled from 'styled-components/macro';
import image from '../../assets/my-wallet.jpg';
import {
  updateBankAccount,
  getBankAccount,
  deleteBankAccount,
} from 'actions/userProfileActions/walletActions';

const TransferInfo = ({ setPage }) => {
  const [cardName, setCardName] = useState(null);
  const [cardNo, setCardNo] = useState(null);
  const [saveName, setSaveName] = useState(null);
  const [accountId, setAccountId] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.userProfile?.wallet?.bankAccounts);

  useEffect(() => {
    dispatch(getBankAccount());
  }, []);

  const handleSubmitUpdate = () => {
    dispatch(
      updateBankAccount(
        {
          username: cardName,
          iban_no: cardNo,
          bank_title: saveName,
          default: 0,
          id: accountId,
        },
        handleSuccess,
        handleFailure
      )
    );
  };

  const handleSuccess = () => {
    toast.success('Hesap bilgileriniz başarıyla güncellendi.', {
      position: 'bottom-right',
      autoClose: 1500,
    });
    setCardName(null);
    setCardNo(null);
    setSaveName(null);
    dispatch(getBankAccount());
  };

  const handleFailure = () => {
    toast.error('Girdiğiniz kart bilgileri hatalı veya eksik.', {
      position: 'bottom-right',
      autoClose: 7000,
    });
  };

  const handleSubmitDelete = (idParam) => {
    dispatch(
      deleteBankAccount(
        {
          id: idParam,
        },
        handleSuccessDelete,
        handleFailureDelete
      )
    );
  };

  const handleSuccessDelete = () => {
    toast.success('Hesabınız başarıyla silindi.', {
      position: 'bottom-right',
      autoClose: 1500,
    });
    dispatch(getBankAccount());
  };

  const handleFailureDelete = () => {
    toast.error('Bilgiler hatalı veya eksik.', {
      position: 'bottom-right',
      autoClose: 7000,
    });
  };

  return (
    <>
      <Container>
        <Row>
          <Col lg="12">
            <Title fontSize="13pt" style={{ padding: 15 }} textAlign="left">
              Cüzdanım
            </Title>
          </Col>
          <Col lg="4">
            <ImageBanner src={image} />
          </Col>
          <Col lg="7">
            <Title
              style={{ cursor: 'pointer' }}
              fontSize="12pt"
              textAlign="left"
              onClick={() => setPage('home')}
            >
              {`< Hesabımdaki Bakiyeyi Aktar`}
            </Title>
            <Title fontSize="12pt" textAlign="left" fontWeight="500">
              Hesaba para aktarma işlemi tarafımızca her ayın 15. ve 20. günleri
              arasında yapılır. Aktarım yapabilmemiz için lütfen hesap
              bilgilerinizi giriniz.
            </Title>
            {data &&
              data.map((item, index) => (
                <Accounts
                  item={item}
                  key={index}
                  setCardName={setCardName}
                  setCardNo={setCardNo}
                  setSaveName={setSaveName}
                  setAccountId={setAccountId}
                  handleSubmitUpdate={handleSubmitUpdate}
                  handleSubmitDelete={handleSubmitDelete}
                />
              ))}

            <Col xs={{ span: 7, offset: 5 }}>
              <Row
                style={{ marginTop: 50, marginBottom: 40 }}
                className="justify-content-end"
              >
                {user?.type_id !== 1 && (
                  <Button
                    style={{ width: '100%', padding: '20px' }}
                    className="blue"
                    text="Hesap Ekle"
                    onClick={() => setPage('transfer')}
                  />
                )}
              </Row>
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const ImageBanner = styled.section`
  width: 100%;
  height: 285px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-image: url('${(props) => props.src}');
  background-size: cover;
  background-repeat: no-repeat;
`;

export default TransferInfo;
