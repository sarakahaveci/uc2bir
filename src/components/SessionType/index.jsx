import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import styled from 'styled-components/macro';
import image from '../../assets/session-type.jpg';

import { Text, Title, Button } from 'components';

const SessionType = () => {
  return (
    <>
      <Container>
        <Row>
          <Col lg="12">
            <Title fontSize="14pt" style={{ padding: 15 }} textAlign="left">
              Oturum Türleri & Çalıştığım Yerler
            </Title>
          </Col>
          <Col lg="4">
            <ImageBanner src={image} />
          </Col>
          <Col lg="7">
            <Title fontSize="12pt" textAlign="left">
              Oturum Türleri
            </Title>
            <Text fontSize="10pt">
              Ders vereceğiniz oturum türlerini seçin.
            </Text>
            <SelectButtonGroup>
              <Button text="Online" onClick={() => console.log('click')} />
              <Button text="Ev / Park" onClick={() => console.log('click')} />
              <Button text="Spor Alanı" onClick={() => console.log('click')} />
            </SelectButtonGroup>
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

const SelectButtonGroup = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  margin-right: -15px;
  margin-left: -15px;


  button {
    border: 1px solid var(--blue);
    margin: 15px;
    padding: 10px 30px;
    border-radius: 30px;
    box-shadow: 2px 1px 7px 1px rgba(0,0,0,0.19);
  }
`;

export default SessionType;
