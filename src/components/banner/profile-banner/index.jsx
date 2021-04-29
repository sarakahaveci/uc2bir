import React, { useState } from 'react';

import styled, { css } from 'styled-components/macro';
import { Text, Button, Svg, Stars } from 'components';

import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Card, { CardFooter, CardInfo } from './Card';
import {
  addFavoriteUser,
  removeFavoriteUser,
  setReservation,
} from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { USER } from '../../../constants';

const ProfileBanner = ({
  className = null,
  info,
  categories = [],
  about,
  setPage = () => {},
  isUserDetail=false
}) => {

  const [isFavorited, setIsFavorited] = useState(info.has_favorite === 1);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const favoriteClickHandler = () => {
    if (isFavorited) {
      dispatch(removeFavoriteUser(info.id));
      setIsFavorited(false);
    } else {
      dispatch(addFavoriteUser(info.id));
      setIsFavorited(true);
    }
  };

  return (
    <Containers className={className}>
      <Rows>
        <Cols lg={4}>
          <Card img={info.img}>
            <span className="team">{info.team}</span>
            <span className="span">
              {user?.type_id === USER &&
               (isFavorited ? (
                  <ActiveHeart
                    onClick={favoriteClickHandler}
                    showHeartBg={false}
                  />
                ) : (
                  <Heart onClick={favoriteClickHandler} showHeartBg={true} />
                ))}
              {isUserDetail && <Link to="/myprofile/settings/profile"> <Setting onClick={favoriteClickHandler} showHeartBg={true} /> </Link>}

            </span>

           <Stars rating={info.stars} position="bottom" />

            {!isUserDetail&&
              <CardFooter>
                <Comment to={info.comment} className="list">
                  <Svg.Comment />
                </Comment>
                <Button
                  onClick={() => {
                    dispatch(setReservation({ isSelected: false }));
                    setPage('Reservation');
                  }}
                  text="Rezervasyon Yap"
                  className="blue list"
                  style={{ fontSize: '9pt' }}
                />
              </CardFooter>}

          </Card>
        </Cols>

        <Cols lg={4} padding="0 30px">
          <CardInfo
            name={info.name}
            price={info.price || '300'}
            categories={categories}
            jobType={info.category}
            location={info.location}
          />
        </Cols>

        <Cols lg={1}>
          <Line />
        </Cols>
        <Cols lg={3}>
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

const Line = styled.div`
  max-width: 1px;
  height: 285px;
  background: #e5e5e5;
  margin-left: 5px;
  margin-right: 5px;
  flex: 1 1 100%;
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

const heart = css`
  padding: 8px;
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  right: 17px;
  top: 15px;
`;

const ActiveHeart = styled(Svg.ActiveHeartIcon)`
  ${heart}
`;

const Setting = styled(Svg.Setting)`
  ${heart}
`;

const Heart = styled(Svg.Heart)`
  ${heart}
`;
export default ProfileBanner;
