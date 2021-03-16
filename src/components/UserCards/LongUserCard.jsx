import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components/macro';
import { useDispatch } from 'react-redux';

import MockImage from 'assets/default-profile.jpg';
import { addFavoriteUser, removeFavoriteUser } from 'actions';
import { Title, AwesomeIcon, Span, Svg, Stars } from 'components';

const LongUserCard = ({ data, showHeartBg, favoritedUser }) => {
  const [showProfileNavigator, setShowProfileNavigator] = useState(false);
  const [isFavorited, setIsFavorited] = useState(favoritedUser);

  const dispatch = useDispatch();

  const favoriteClickHandler = () => {
    if (isFavorited) {
      dispatch(removeFavoriteUser(data.favorite_id));
      setIsFavorited(false);
    } else {
      dispatch(addFavoriteUser(data.favorite_id));
      setIsFavorited(true);
    }
  };

  return (
    <div
      className="long-user-card"
      onMouseEnter={() => setShowProfileNavigator(true)}
      onMouseLeave={() => setShowProfileNavigator(false)}
    >
      <Stars rating={data.rating} position="top" />

      <div className="long-user-card__img-wrapper">
        {isFavorited ? (
          <ActiveHeart
            onClick={favoriteClickHandler}
            showHeartBg={showHeartBg}
          />
        ) : (
          <Heart onClick={favoriteClickHandler} showHeartBg={showHeartBg} />
        )}

        <img
          className="long-user-card__img"
          src={data.photo ? data.photo : MockImage}
        />

        {showProfileNavigator && (
          <Link className="long-user-card__profile-navigator" to="/">
            Profile Git
          </Link>
        )}
      </div>

      <div className="long-user-card__body">
        <Title textAlign="left" component="h5">
          {data.name}
        </Title>

        <Span underline>{data.title}</Span>

        <div className="long-user-card__location-wrapper">
          <div className="long-user-card__location-text">
            <Svg.LocationIcon /> {data.city}, {data.district}
          </div>

          <div className="long-user-card__fee">
            {data.price} <AwesomeIcon.Tl />
          </div>
        </div>
      </div>

      {data.classification && (
        <div className="long-user-card__classification">
          {data.classification}
        </div>
      )}
    </div>
  );
};

export default LongUserCard;

const heart = css`
  ${(p) =>
    p.showHeartBg &&
    css`
      padding: 8px;
      background-color: white;
      border-radius: 50%;
    `}

  cursor: pointer;
  position: absolute;
  right: 17px;
  top: 15px;
`;

const ActiveHeart = styled(Svg.ActiveHeartIcon)`
  ${heart}
`;

const Heart = styled(Svg.Heart)`
  ${heart}
`;
