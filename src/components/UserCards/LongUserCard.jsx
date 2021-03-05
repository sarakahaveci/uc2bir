import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components/macro';

import MockImage from 'assets/dietitians/item-1/01.jpg';
import { addFavoriteUser } from 'actions';
import { Title, AwesomeIcon, Span, Svg, Stars } from 'components';

const LongUserCard = ({ data, showHeartBg }) => {
  const [showProfileNavigator, setShowProfileNavigator] = useState(false);

  const addFavoriteHandler = () => addFavoriteUser(data.favorite_id);

  return (
    <div
      className="long-user-card"
      onMouseEnter={() => setShowProfileNavigator(true)}
      onMouseLeave={() => setShowProfileNavigator(false)}
    >
      <Stars rating={data.rating} position="top" />

      <div className="long-user-card__img-wrapper">
        <Heart onClick={addFavoriteHandler} showHeartBg={showHeartBg} />

        <img className="long-user-card__img" src={MockImage} />

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
            <AwesomeIcon.Map /> {data.city}, {data.district}
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

const Heart = styled(Svg.Heart)`
  ${(p) =>
    p.showHeartBg &&
    css`
      padding: 8px;
      background-color: white;
      border-radius: 50%;
    `}

  position: absolute;
  right: 17px;
  top: 15px;
`;
