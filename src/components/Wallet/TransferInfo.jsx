import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Title, Button } from 'components';
import { useSelector } from 'react-redux';
import Accounts from './Accounts';
import styled from 'styled-components/macro';
import image from '../../assets/my-wallet.jpg';

const TransferInfo = ({ setPage }) => {
  const { user } = useSelector((state) => state.auth);

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

            <Accounts />

            <Col xs={{ span: 7, offset: 5 }}>
              <Row
                style={{ marginTop: 50, marginBottom: 40 }}
                className="justify-content-end"
              >
                {user.type_id !== 1 && (
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
