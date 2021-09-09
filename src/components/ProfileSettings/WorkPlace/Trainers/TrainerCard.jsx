import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Title, AwesomeIcon, Span } from 'components';
import Item1 from 'assets/dietitians/item-1/01.jpg';
import DefaultProfileImage from 'assets/default-profile.jpg';

const TrainerCard = ({ data }) => {
  const [showProfileNavigator, setShowProfileNavigator] = useState(false);

  return (
    <div
      className="trainer-card"
      onMouseEnter={() => setShowProfileNavigator(true)}
      onMouseLeave={() => setShowProfileNavigator(false)}
    >
      <div className="trainer-card__img-wrapper">
        <img
          className="trainer-card__img"
          url={data.photo || DefaultProfileImage}
          src={Item1}
        />

        {showProfileNavigator && (
          <Link
            className="trainer-card__profile-navigator"
            to={`/user/${data.user_id}`}
          >
            {t('Go to profile')}
          </Link>
        )}
      </div>

      <div className="trainer-card__body">
        <Title textAlign="left" component="h5">
          {data.name}
        </Title>

        <Span underline>{data.title}</Span>

        <div className="trainer-card__location-wrapper">
          <div className="trainer-card__location-text">
            <AwesomeIcon.Map /> {data.city}, {data.district}
          </div>

          <div className="trainer-card__fee">
            {data.price} <AwesomeIcon.Tl />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;
