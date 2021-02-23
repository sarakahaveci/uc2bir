// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';

import { colorGenerator } from 'utils';

import styled from 'styled-components/macro';
import { AwesomeIcon, Title, Text, IconLabel, Button, Svg } from 'components';

import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProfileCard = ({ className = null, img, comment, reservationAction }) => {
  return (
    <Containers className={className}>
      <Rows>
        <Card img={img}>
          <span className="camera">
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
      </Rows>
    </Containers>
  );
};

const Containers = styled(Container)`
  min-height: 340px;
  background: transparent;
`;

const Rows = styled(Row)`
  align-items: center;
  justify-content: center;
  min-height: 340px;
`;

const Card = styled(Col)`
  max-width: 375px;
  height: 285px;
  position: relative;
  background-image: url('${(props) => props.img}');
  background-repeat: no-repeat;
  background-size: cover;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

  span.camera {
    position: absolute;
    right: 30px;
    top: 30px;
    background: #fff;
    padding: 5px;
    border-radius: 5px; 

    svg {
      width: 25px;
      height: 25px;
    }
  }
`;

const CardFooter = styled.div`
  display: flex;
  position: absolute;
  bottom: -15px;
  width: 100%;
  justify-content: flex-end;
  padding-right: 30px;

  .list {
    margin-left: 7px;
    box-shadow: 5px 5px 10px -8px rgba(0, 0, 0, 0.75);
  }
`;

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
