// @ts-nocheck
import React from 'react';

import styled from 'styled-components/macro';
import { Button, Svg } from 'components';
import { Link } from 'react-router-dom';

import Card, { CardFooter, CardInfo } from './Card';
import { Col } from 'react-bootstrap';

const ProfileCard = ({ img, user = false, name = null, location = null, children }) => {
  const reservationAction = () => {};
  const changeProfilePhoto = () => {};
  const comment = () => {};
  return (
    <Card img={img} user={user}>
      <span onClick={changeProfilePhoto} className="span background camera">
        <Svg.Camera />
      </span>
      {!user && (
        <CardFooter>
          <Comment onClick={comment} className="list">
            <Svg.Comment />
          </Comment>
          <Button
            onClick={reservationAction}
            text="Rezervasyon Yap"
            className="blue list"
            style={{ fontSize: '9pt' }}
          ></Button>
        </CardFooter>
      )}
      <Cols>
        <CardInfo name={name} location={location} info={children} />
      </Cols>
    </Card>
  );
};

const Comment = styled(Link)`
  background: #fff;
  display: flex;
  min-width: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  svg {
    width: 25px;
    height: 25px;
  }
`;

const Cols = styled(Col)`
  height: auto;
  padding: 15px 30px;
  margin-left: 130px;
`;

export default ProfileCard;

/*
  * example
  * <ProfileCard
      img={img}
  />

  * <ProfileCard
      img={img}
      name="Efe Parlak"
      location="İstanbul Beşiktaş"
      user
  />
*/
