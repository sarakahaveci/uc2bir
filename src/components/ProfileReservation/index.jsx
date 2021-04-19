import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { Title } from 'components';
import { getUserKeys } from 'actions';
import Pt from './PT';
import * as KEYS from '../../constants/userKeys';
import Dietitian from './Dietitian';

const ProfileReservation = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userProfile.userInfo);

  const {
    userKeys: { data: userKeys, isSuccess },
  } = useSelector((state) => state.registerData);

  const [type, setType] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setType(userKeys.filter((f) => f.id === userInfo.type_id));
    }
  }, [isSuccess]);

  const actionRegisterData = () => {
    dispatch(getUserKeys());
  };

  useEffect(() => {
    actionRegisterData();
  }, []);

  let content;

  switch (type[0]?.key) {
    case KEYS.DIETIAN:
      content = <Dietitian />;
      break;

    case KEYS.PT:
      content = <Pt />;
      break;

    default:
      content = <></>;
      break;
  }

  return (
    <div>
      <Container>
        <Row>
          <Title fontSize="14pt" style={{ margin: '15px' }} textAlign="left">
            {'< Rezervasyon Oluştur'}
          </Title>
        </Row>
        <Row style={{ padding: '30px' }}>{content}</Row>
      </Container>
    </div>
  );
};

export default ProfileReservation;
