import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Title, AwesomeIcon, Span } from 'components';
import Item1 from 'assets/dietitians/item-1/01.jpg';

const TrainerCard = ({ fullName, description, location, fee }) => {
  const [showProfileNavigator, setShowProfileNavigator] = useState(false);

  return (
    <div
      className="trainer-card"
      onMouseEnter={() => setShowProfileNavigator(true)}
      onMouseLeave={() => setShowProfileNavigator(false)}
    >
      <div className="trainer-card__img-wrapper">
        <img className="trainer-card__img" src={Item1} />

        {showProfileNavigator && (
          <Link className="trainer-card__profile-navigator" to="/">
            Profile Git
          </Link>
        )}
      </div>

      <div className="trainer-card__body">
        <Title textAlign="left" component="h5">
          {fullName}
        </Title>

        <Span underline>{description}</Span>

        <div className="trainer-card__location-wrapper">
          <div className="trainer-card__location-text">
            <AwesomeIcon.Map /> {location}
          </div>

          <div className="trainer-card__fee">
            {fee} <AwesomeIcon.Tl />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;
