import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { Title } from 'components';
import Pt from './PT';
import DIETITIAN from './DIETITIAN';
import GYM from './GYM';

import * as KEYS from '../../../constants/userKeys';

const Reservations = () => {
  const type_id = useSelector((state) => state.auth)?.user?.type_id;

  const {
    userKeys: { data: userKeys, isSuccess },
  } = useSelector((state) => state.registerData);

  const [type, setType] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setType(userKeys.filter((f) => f.id === type_id));
    }
  }, [isSuccess]);


  let content;

  switch (type[0]?.key) {
    case KEYS.DIETIAN:
      content = <DIETITIAN />;
      break;

    case KEYS.PT:
      content = <Pt />;
      break;
    case KEYS.GYM:
      content = <GYM />;
      break;

    default:
      content = <></>;
      break;
  }

  return (
    <div>
      <Container>
        <Row>
          <Col lg="12">
            <Title fontSize="14pt" style={{ padding: 15 }} textAlign="left">
              Rezervasyon
            </Title>
          </Col>
          {content}
        </Row>
      </Container>
    </div>
  );
};

export default Reservations;
