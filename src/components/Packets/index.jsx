import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Title } from 'components';
import Pt from './PT';
import Dt from './DT';

import User from './USER';

import * as KEYS from '../../constants/userKeys';
import image from '../../assets/session-type.jpg';

const Packets = () => {
  const { t } = useTranslation();

  const type_id = useSelector((state) => state.auth)?.user?.type_id;
  const [bannerActive, setBannerActive] = useState(true);

  const {
    userKeys: { data: userKeys, isSuccess },
  } = useSelector((state) => state.registerData);

  const [type, setType] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setType(userKeys?.filter((f) => f.id === type_id));
    }
  }, [isSuccess]);

  let icons = [];

  let content;

  switch (type?.[0]?.key) {
    case KEYS.USER:
      content = (
        <>
          <Col lg="4" style={{ display: bannerActive ? '' : 'none' }}>
            <ImageBanner src={image} />
          </Col>
          <Col lg={bannerActive ? 7 : 12}>
            <User icons={icons} setBannerActive={setBannerActive} />
          </Col>
        </>
      );
      break;
    case KEYS.PT:
      content = (
        <>
          <Col lg="4" style={{ display: bannerActive ? '' : 'none' }}>
            <ImageBanner src={image} />
          </Col>
          <Col lg={bannerActive ? 8 : 12}>
            <Pt icons={icons} setBannerActive={setBannerActive} />
          </Col>
        </>
      );
      break;
    case KEYS.DIETIAN:
      content = (
        <>
          <Col lg="4" style={{ display: bannerActive ? '' : 'none' }}>
            <ImageBanner src={image} />
          </Col>
          <Col lg={bannerActive ? 8 : 12}>
            <Dt icons={icons} setBannerActive={setBannerActive} />
          </Col>
        </>
      );
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
              {t('my packages')}
            </Title>
          </Col>
          {content}
        </Row>
      </Container>
    </div>
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

export default Packets;
