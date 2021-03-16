// @ts-nocheck
import React, { useState, useEffect } from 'react';

import Pt from './PT';
import Dietitian from './Dietitian';

import * as KEYS from '../../constants/userKeys';

import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { getUserKeys } from 'actions';

import image from '../../assets/session-type.jpg';
import { Container, Row, Col } from 'react-bootstrap';
import { Text, Title, Svg } from 'components';

const SessionType = () => {
  const dispatch = useDispatch();
  const type_id = useSelector((state) => state.auth)?.user?.type_id;
  const [bannerActive, setBannerActive] = useState(true);

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

  switch (type[0]?.key) {
    case KEYS.DIETIAN:
      icons = [
        {
          id: 'online',
          name: 'Online',
          active: false,
          icon: <Svg.SessionType.Online />,
        },
        {
          id: 'clinic',
          name: 'Klinik',
          active: false,
          icon: <Svg.SessionType.Clinic />,
        },
      ];
      return (
        <Container>
          <Row>
            <Col lg="12">
              <Title fontSize="14pt" style={{ padding: 15 }} textAlign="left">
                Oturum Türleri & Çalıştığım Yerler
              </Title>
            </Col>
            <Col lg="4" style={{ display: bannerActive ? '' : 'none' }}>
              <ImageBanner src={image} />
              <IconGroup>
                {icons.map((val) => (
                  <Icons active={val.active}>{val.icon}</Icons>
                ))}
              </IconGroup>
            </Col>
            <Col lg={bannerActive ? 7 : 12}>
              <Title fontSize="12pt" textAlign="left">
                Oturum Türleri
              </Title>
              <Text fontSize="10pt">
                {'Hizmet vereceğiniz oturum türlerini seçin.'}
              </Text>
              <Dietitian icons={icons} setBannerActive={setBannerActive} />
            </Col>
          </Row>
        </Container>
      );

    case KEYS.GYM:
      return <></>;

    case KEYS.PT:
      icons = [
        {
          id: 'online',
          name: 'Online',
          active: false,
          icon: <Svg.SessionType.Online />,
        },
        {
          id: 'gym',
          name: 'Spor Alanı',
          active: false,
          icon: <Svg.SessionType.Gym />,
          create: {
            key: 'gym',
            action: 'gym',
            name: 'Spor Alanı Ekle +',
            subPage: 'gym-edit',
          },
        },
        {
          id: 'home_park',
          name: 'Ev / Park',
          active: false,
          icon: <Svg.SessionType.Park />,
          create: {
            key: 'home_park',
            action: 'home_park',
            name: 'Adres Ekle +',
            subPage: 'home-park-edit',
          },
        },
      ];
      return (
        <Container>
          <Row>
            <Col lg="12">
              <Title fontSize="14pt" style={{ padding: 15 }} textAlign="left">
                Oturum Türleri & Çalıştığım Yerler
              </Title>
            </Col>
            <Col lg="4" style={{ display: bannerActive ? '' : 'none' }}>
              <ImageBanner src={image} />
              <IconGroup>
                {icons.map((val) => (
                  <Icons active={val.active}>{val.icon}</Icons>
                ))}
              </IconGroup>
            </Col>
            <Col lg={bannerActive ? 7 : 12}>
              <Title fontSize="12pt" textAlign="left">
                Oturum Türleri
              </Title>
              <Text fontSize="10pt">
                {'Ders vereceğiniz oturum türlerini seçin.'}
              </Text>
              <Pt icons={icons} setBannerActive={setBannerActive} />
            </Col>
          </Row>
        </Container>
      );

    default:
      return <></>;
  }
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

const IconGroup = styled.ul`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Icons = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 5px;
  border-bottom: ${(props) =>
    props.active ? '1px solid var(--blue)' : 'none'};
`;

export default SessionType;
