import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Text, Title, Accordion, Button } from 'components';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components/macro';
import image from '../../assets/my-wallet.jpg';
import Svg from 'components/statics/svg';
import Wrapper from './Wrapper';
import { getWallet } from 'actions/userProfileActions/walletActions';

const Home = ({ setPage }) => {
  const payment = [
    {
      id: 1,
      title: 'Paket Ödemeleri',
      name: 'Aylin',
      packageName: 'Diet',
      dersBedeli: 100,
      komisyon: 20,
      kdv: 5,
      stopaj: 1,
      sonHareket: ' 15 - 04 - 2021',
    },
    {
      id: 2,
      title: 'Grup Ders Ödemeleri',
      name: 'Batu',
      packageName: 'Diet',
      dersBedeli: 100,
      komisyon: 20,
      stopaj: 1,
      sonHareket: ' 1 - 04 - 2021',
    },
    {
      id: 3,
      name: 'Sedat',
      packageName: 'Full-Body',
      dersBedeli: 400,
      komisyon: 20,
      stopaj: 1,
      sonHareket: ' 5 - 03 - 2021',
    },
    {
      id: 4,
      title: 'Banka Hesabına Transfer',
      sonHareket: ' 5 - 03 - 2021',
      transferToBank: 500,
    },
  ];

  const wallet = useSelector((state) => state?.userProfile?.wallet);
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
          <Col lg="4">
            <ImageBanner src={image} />
          </Col>
          <Col lg="7">
            <Title fontSize="12pt" textAlign="left">
              Cüzdanım
            </Title>

            <>
              <Text fontSize="10pt">
                Hesabınızda bulunan tutarı ve hesap hareketlerinizi
                görüntüleyebilir, bankanıza TL aktarabilirsiniz.
              </Text>
              <Explanation>
                <Col>
                  <Title textAlign="left">Cüzdanımdaki Toplam Tutar:</Title>
                </Col>
                <Col>
                  <TitleWrapper>
                    <Title textAlign="right" style={{ display: 'flex' }}>
                      {wallet?.data?.balance}
                    </Title>
                    <Svg.Tl />
                  </TitleWrapper>
                </Col>
              </Explanation>
              <Accordion>
                {payment &&
                  payment.map((item, index) => (
                    <Wrapper item={item} key={index} />
                  ))}
              </Accordion>
              <Button
                style={{ textDecoration: 'underline' }}
                fontWeight="bold"
                color="blue"
                text="Hesap hareketlerime git >"
                onClick={() => setPage('activities')}
              />
              <Col xs={{ span: 7, offset: 5 }}>
                <Row
                  style={{ marginTop: 50, marginBottom: 40 }}
                  className="justify-content-end"
                >
                  <Button
                    style={{ width: '100%', padding: '20px' }}
                    className="blue"
                    text="Hesabıma Aktar"
                    onClick={() => setPage('transfer')}
                  />
                  <Text textAlign="right" color="red">
                    Hesaba para aktarma işlemi yalnızca her ayın 15. ve
                    20.günleri arasında yapılır.
                  </Text>
                </Row>
              </Col>
            </>
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
  svg {
    width: 12px;
    height: 12px;
    margin-bottom: 8px;
  }
`;
export default Home;
