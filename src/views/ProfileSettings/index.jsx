// @ts-nocheck
import React, { useEffect } from 'react';

import Profile from './Profile/Profile';
import ProfileBanner from '../../components/ProfileSettings/Profile/Profile';

import { useHistory } from 'react-router-dom';
import { Main } from 'components';

import styled from 'styled-components/macro';
import background from 'assets/banner/slider-item-1.png';
import { Container, Row, Col } from 'react-bootstrap';

const ProfileSettings = ({ history }) => {
  const location = useHistory();

  useEffect(() => {
    if (!history.location.state?.key && !history.location.state?.type) {
      location.push('/');
    }
  }, [history]);

  return (
    <Main>
      <Section>
        <Container>
          <Row>
            <Content>
              <Row>
                <Col xs="4">
                  <ProfileBanner />
                </Col>
                <Col xs="7">
                  <Profile />
                </Col>
              </Row>
            </Content>
          </Row>
        </Container>
      </Section>
    </Main>
  );
};

const Section = styled.section`
  visibility: visible;
  position: relative;

  ::before {
    content: '';
    background-image: url('${background}');
    background-size: cover;
    background-position: bottom center;
    width: 100%;
    height: 130px;
    display: block;
  }
`;

const Content = styled.div`
  width: 100%;
  height: auto;
  background: #fff;
  min-height: 150px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  margin-top: -30px;
  padding: 40px 15px 50px;
`;

export default ProfileSettings;
