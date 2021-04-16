import React from 'react';

import styled from 'styled-components/macro';
import { Text, Button, Svg, Stars } from 'components';

import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Card, { CardFooter, CardInfo } from './Card';

const ProfileBanner = ({
  className = null,
  info,
  categories = [],
  about,
  setPage = () => {},
}) => {
  let jobType;
  if (info?.type_id) {
    if (info?.type_id == 1) {
      jobType == 'Diyetisten';
    } else if (info?.type_id == 2) {
      jobType == 'Spor Eğitmeni';
    } else if (info?.type_id == 2) {
      jobType == 'Spor Alanı';
    }
  }
  return (
    <Containers className={className}>
      <Rows>
        <Cols lg={4}>
          <Card img={info.img}>
            <span className="team">{info.team}</span>
            <span className="span">
              <Svg.Heart />
            </span>

            <Stars rating={info.stars} position="bottom" />

            <CardFooter>
              <Comment to={info.comment} className="list">
                <Svg.Comment />
              </Comment>
              <Button
                onClick={() => {
                  setPage('Reservation');
                }}
                text="Rezervasyon Yap"
                className="blue list"
                style={{ fontSize: '9pt' }}
              ></Button>
            </CardFooter>
          </Card>
        </Cols>
        <Cols lg={4} padding="0 30px">
          <CardInfo
            name={info.name}
            category={info.category}
            price={info.price || '300'}
            categories={categories}
            jobType="Fitness Eğitmeni"
            location="İstanbul / Beşiktaş"
          />
        </Cols>
        <Cols lg={4}>
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
`;

/*const Line = styled.div`
  max-width: 1px;
  height: 285px;
  background: #e5e5e5;
  margin-left: 5px;
  margin-right: 5px;
  flex: 1 1 100%;
`;*/

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
