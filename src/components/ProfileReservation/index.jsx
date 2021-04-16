import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';

import { Text, Title, Svg } from 'components';
import { getUserKeys } from 'actions';
import Pt from './PT';
import * as KEYS from '../../constants/userKeys';
import Dietitian from './Dietitian';
import image from '../../assets/session-type.jpg';

const SessionType = () => {
  const dispatch = useDispatch();
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

  const actionRegisterData = () => {
    dispatch(getUserKeys());
  };

  useEffect(() => {
    actionRegisterData();
  }, []);

  let icons = [];

  let content;

  switch (type[0]?.key) {
    case KEYS.DIETIAN:
      content = <></>;
      break;

    case KEYS.PT:
      content = <></>;
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
              Oturum Türleri & Çalıştığım Yerler
            </Title>
          </Col>
          {content}
        </Row>
      </Container>
    </div>
  );
};

export default SessionType;
