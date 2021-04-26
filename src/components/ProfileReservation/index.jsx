import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { Title } from 'components';
import { setReservation, clearReservation } from 'actions';
import Pt from './PT';
import Gym from './Gym';
import Dietitian from './Dietitian';

import * as KEYS from '../../constants/userKeys';

const ProfileReservation = ({ setPage = () => {} }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userProfile.userInfo);
  const reservation = useSelector((state) => state.reservation);

  const {
    userKeys: { data: userKeys, isSuccess },
  } = useSelector((state) => state.registerData);

  const [type, setType] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setType(userKeys.filter((f) => f.id === userInfo?.type_id));
    }
  }, [isSuccess]);

  function clearPaymentInfo() {
    dispatch(
      setReservation({
        payment_type: undefined,
        is_contracts_accepted: undefined,
        holder_name: undefined,
        card_number: undefined,
        expiration_month: undefined,
        expiration_year: undefined,
        cvc: undefined,
      })
    );
  }
  useEffect(() => {
    if (!reservation?.data?.isSelected) {
      dispatch(clearReservation());
    }
  }, []);

  let content;

  switch (type[0]?.key) {
    case KEYS.DIETIAN:
      content = <Dietitian />;
      break;

    case KEYS.PT:
      content = <Pt />;
      break;
    case KEYS.GYM:
      content = <Gym />;
      break;
    default:
      content = <></>;
      break;
  }

  return (
    <div>
      <Container>
        <Row>
          {reservation?.data?.payment_type ? (
            <Title
              fontSize="14pt"
              style={{ margin: '20px 40px', cursor: 'pointer' }}
              textAlign="left"
              onClick={() => {
                clearPaymentInfo();
              }}
            >
              {'< Ödeme İşlemleri'}
            </Title>
          ) : (
            <Title
              fontSize="14pt"
              style={{ margin: '20px 40px', cursor: 'pointer' }}
              textAlign="left"
              onClick={() => {
                setPage('Start');
              }}
            >
              {'< Rezervasyon Oluştur'}
            </Title>
          )}
        </Row>
        <Row style={{ padding: '30px' }}>{content}</Row>
      </Container>
    </div>
  );
};

export default ProfileReservation;
