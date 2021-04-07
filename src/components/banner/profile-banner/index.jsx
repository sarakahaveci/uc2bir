import React from 'react';

import styled from 'styled-components/macro';
import { AwesomeIcon, Text, Button, Svg } from 'components';

import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { device } from 'utils';

import Card, { CardFooter, CardInfo } from './Card';

import defaultImg from '../../../assets/default-profile.jpg';

const ProfileBanner = ({
  className = null,
  info,
  categories = [],
  about,
  children,
}) => {
  const reservationAction = () => {};
  return (
    <Containers className={className}>
      <Rows>
        <Card img={defaultImg}>
          <span className="team">{info.team}</span>
          <span className="span">
            <Svg.Heart />
          </span>
          <Stars>
            <Star className={`${info.stars > 0 ? 'active' : ''}`}>
              <AwesomeIcon.StarSolid />
            </Star>
            <Star className={`${info.stars > 1 ? 'active' : ''}`}>
              <AwesomeIcon.StarSolid />
            </Star>
            <Star className={`${info.stars > 2 ? 'active' : ''}`}>
              <AwesomeIcon.StarSolid />
            </Star>
            <Star className={`${info.stars > 3 ? 'active' : ''}`}>
              <AwesomeIcon.StarSolid />
            </Star>
            <Star className={`${info.stars > 4 ? 'active' : ''}`}>
              <AwesomeIcon.StarSolid />
            </Star>
          </Stars>
          <CardFooter>
            <Comment to={info.comment} className="list">
              <Svg.Comment />
            </Comment>
            <Button
              onClick={reservationAction}
              text="Rezervasyon Yap"
              className="blue list"
              style={{ fontSize: '9pt' }}
            ></Button>
          </CardFooter>
        </Card>
        <Cols padding="0 30px">
          <CardInfo
            name={info.name}
            category={info.category}
            price={info.price}
            location={info.location}
            categories={categories}
            info={children}
          />
        </Cols>
        <Line />
        <Cols>
          <Text>{about}</Text>
        </Cols>
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

const Cols = styled(Col)`
  height: auto;
  word-wrap: break-word;
  width: 50px;
  padding: ${(props) => props.padding && props.padding};

  @media ${device.sm} {
    margin-top: 15px;
    width: auto;
  }
`;

const Line = styled.div`
  max-width: 1px;
  height: 285px;
  background: #e5e5e5;
  margin-left: 5px;
  margin-right: 5px;
  flex: 1 1 100%;
`;

const Stars = styled.ul`
  display: flex;
  position: absolute;
  bottom: 0px;
  left: 0px;
  padding: 5px 15px;
  background: radial-gradient(rgb(122 122 122), rgb(47 47 47 / 53%));
  opacity: 0.7;
  border-top-right-radius: 30x;
`;

const Star = styled.li`
  margin: 2px;
  cursor: pointer;

  svg {
    color: #ccc;
    font-size: 9pt;

    @media (max-width: 1200px) {
      font-size: 5pt;
    }
  }

  &.active {
    svg {
      color: #ffba00;
    }
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

export default ProfileBanner;
