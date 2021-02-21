// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';

import { colorGenerator } from 'utils';

import styled from 'styled-components/macro';
import { AwesomeIcon, Title, Text, IconLabel, Button, Svg } from 'components';

import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProfileBanner = ({
  className = null,
  info,
  categories = [],
  about,
  reservationAction,
}) => {
  return (
    <Containers className={className}>
      <Rows>
        <Card img={info.img}>
          <span className="team">{info.team}</span>
          <span className="heart">
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
              onClick={() => reservationAction}
              text="Rezervasyon Yap"
              className="blue list"
              style={{ fontSize: '9pt' }}
            ></Button>
          </CardFooter>
        </Card>
        <Cols lg={'auto'} padding="0 30px">
          <Title
            variant={'h5'}
            component={'h5'}
            textAlign="left"
            fontWeight="normal"
            margin="0"
            lineDisable
          >
            {info.name}
          </Title>
          <Title
            variant={'h6'}
            component={'h6'}
            textAlign="left"
            fontWeight="normal"
            lineDisable
          >
            {info.category}
          </Title>
          <Title textAlign="left" variant="h5" component="h5">
            {info.price} <AwesomeIcon.Tl />
          </Title>
          {categories.length > 0 && (
            <Categories>
              {categories.map((val) => (
                <List>
                  <A to={val.link}>{val.text}</A>
                </List>
              ))}
            </Categories>
          )}
          <IconLabel
            text={info.location}
            icon={AwesomeIcon.Map}
            style={{ marginTop: 30, display: 'block' }}
          />
        </Cols>
        <Line />
        <Cols lg>
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

const Card = styled(Col)`
  max-width: 375px;
  height: 285px;
  position: relative;
  background-image: url('${(props) => props.img}');
  background-repeat: no-repeat;
  background-size: cover;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

  span.team {
    position: absolute;
    left: 0;
    top: 0;
    padding: 7px 15px;
    color: #00b2a9;
    font-weight: bold;
    font-size: 1.2rem;
    background: rgba(255, 255, 255, 0.5);
    border-top-left-radius: 30px;
  }

  span.heart {
    position: absolute;
    right: 30px;
    top: 30px;

    svg {
      width: 25px;
      height: 25px;
    }
  }
`;

const Cols = styled(Col)`
  height: auto;
  padding: ${(props) => props.padding && props.padding};
`;

const Line = styled.div`
  max-width: 1px;
  height: 285px;
  background: #e5e5e5;
  margin-left: 5px;
  margin-right: 5px;
  flex: 1 1 100%;
`;

const Categories = styled.ul`
  display: flex;
  margin-left: -5px;
  margin-right: -5px;
`;

const List = styled.li`
  border: 1px solid #707070;
  border-radius: 15px;
  margin: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const A = styled(Link)`
  padding: 5px 10px;
  display: flex;
  flex: 1 1 100%;
  font-size: 8pt;
  color: ${colorGenerator('black')};
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

ProfileBanner.propTypes = {
  info: PropTypes.object.isRequired,
  about: PropTypes.string,
};

export default ProfileBanner;

/*
  * example
  * <ProfileBanner
      className?,
      info={{
        team: 'A',
        img: i1,
        name: 'Efe Parlak',
        category: 'Fitnes Eğitmeni',
        price: '100',
        stars: '3',
        location: "İstanbul, Beşiktaş",
        comment: "/"
      }}
      categories={[
        {
          text: "Meditasyon",
          link: "/"
        },
        {
          text: "Plates",
          link: "/"
        },
        {
          text: "Fitnes",
          link: "/"
        },
      ]}
      about={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
      ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum. dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
      culpa qui officia deserunt mollit anim id est laborum.”`}
      reservationAction={''}
    />
*/