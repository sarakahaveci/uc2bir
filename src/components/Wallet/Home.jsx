import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Text, Title, Accordion, Button } from 'components';

import styled from 'styled-components/macro';
import image from '../../assets/my-wallet.jpg';
import Svg from 'components/statics/svg';
import Wrapper from './Wrapper';

const Home = ({ setPage }) => {
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
                görüntüleyebilir, bankanıza tl aktarabilirsiniz.
              </Text>
              <Explanation>
                <Col>
                  <Title textAlign="left">Cüzdanımdaki Toplam Tutar:</Title>
                </Col>
                <Col>
                  <Title textAlign="right" style={{ display: 'flex' }}>
                    900,00 <Svg.Tl style={{ display: 'inline-flex' }} />
                  </Title>
                </Col>
              </Explanation>
              <Accordion>
                <Wrapper />
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

export default Home;
