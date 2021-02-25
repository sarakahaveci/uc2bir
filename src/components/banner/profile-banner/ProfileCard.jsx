// @ts-nocheck
import React from 'react';

import styled from 'styled-components/macro';
import { Button, Svg } from 'components';
import { Link } from 'react-router-dom';

import Card, {CardFooter} from './Card';

const ProfileCard = ({ img, comment, reservationAction }) => {
  return (
    <Card img={img}>
      <span className="span background">
        <Svg.Camera />
      </span>
      <CardFooter>
        <Comment to={comment} className="list">
          <Svg.Comment />
        </Comment>
        <Button
          onClick={() => reservationAction}
          text="Rezervasyon Yap"
          className="blue list"
          style={{ fontSize: '9pt' }}
        ></Button>
      </CardFooter>
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

export default ProfileCard;

/*
  * example
  * <ProfileCard
      img={img}
      comment="/"
      reservationAction=""
  />
*/
