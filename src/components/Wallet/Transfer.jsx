import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Col, Container, Row } from 'react-bootstrap';
import { CashTransfer } from 'components';
import { Title, Text } from 'components';
import image from '../../assets/my-wallet.jpg';
import styled from 'styled-components/macro';
import { getWallet } from 'actions/userProfileActions/walletActions';

const Transfer = ({ setPage }) => {
  const { balance } = useSelector((state) => state?.userProfile?.wallet.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWallet());
  }, []);
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
                onClick={() => setPage('TransferInfo')}
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
                      {balance}₺
                    </Title>
                  </TitleWrapper>
                </Col>
              </Explanation>
            </>
            <CashTransfer></CashTransfer>
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
