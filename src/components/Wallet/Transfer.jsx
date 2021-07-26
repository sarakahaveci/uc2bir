import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { Col, Container, Row } from 'react-bootstrap';
import { AddBankAccount } from 'components';
import { Title, Text } from 'components';
import image from '../../assets/my-wallet.jpg';
import styled from 'styled-components/macro';
import {
  addBankAccount,
  getWallet,
} from 'actions/userProfileActions/walletActions';

const Transfer = ({ setPage }) => {
  const [cardName, setCardName] = useState(null);
  const [cardNo, setCardNo] = useState(null);
  const [saveName, setSaveName] = useState(null);

  const { balance } = useSelector((state) => state?.userProfile?.wallet.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWallet());
  }, []);

  const handleSubmit = () => {
    dispatch(
      addBankAccount(
        {
          username: cardName,
          iban_no: cardNo,
          bank_title: saveName,
          default: 0,
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
    setPage('TransferInfo');
  };

  const handleFailure = () => {
    toast.error('Girdiğiniz kart bilgileri hatalı veya eksik.', {
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
          <Col lg={4}>
            <ImageBanner src={image} />
          </Col>
          <Col lg={7}>
            <>
              <Title
                style={{ cursor: 'pointer' }}
                fontSize="12pt"
                textAlign="left"
                onClick={() => setPage('TransferInfo')} ŞİMDİLİK KAPATILDI
              >
                {`< Hesap Hareketlerim`}
              </Title>
              <Text fontSize="10pt" fontWeight="400">
                Lütfen hesap bilgilerini doğru ve eksiksiz bir biçimde giriniz.
              </Text>
           <Explanation>
                  <Col> 
                  <Title textAlign="left">Cüzdanımdaki Toplam Tutar: </Title>
                </Col>
                <Col>
                  <TitleWrapper>
                    <Title textAlign="right" style={{ display: 'flex' }}>
                      {parseFloat(balance).toFixed(2)}₺
                    </Title>
                  </TitleWrapper>
                </Col>
              </Explanation>
            </>
            <AddBankAccount
              setCardName={setCardName}
              setCardNo={setCardNo}
              setSaveName={setSaveName}
              handleSubmit={handleSubmit}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Transfer;

const ImageBanner = styled.section`
  width: 100%;
  height: 285px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-image: url('${(props) => props.src}');
  background-size: cover;
  background-repeat: no-repeat;
`;
const Explanation = styled.section`
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  padding: 15px;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &:before {
    content: '';
    background: var(--blue3);
    position: absolute;
    width: calc(100%);
    height: 100%;
    left: -15px;
    transform: matrix(1, 0, -0.4, 1, 0, 0);
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;
