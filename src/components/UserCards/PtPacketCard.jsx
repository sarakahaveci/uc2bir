import React from 'react';

import MockImage from 'assets/default-profile.jpg';
import { Title, AwesomeIcon, Span } from 'components';
import { useHistory } from 'react-router-dom';

const PtPacketCard = ({
  data, 
  hoverText = 'Pakete Git',
  isGym,
  onClickHover = () => {},
  selected = false,
  type,
}) => {
  const history = useHistory();

  const navigateToPacket = () => {
    const userId = data?.id || data?.user_id;
    history.push('/packets/detail/' + userId);
  };

  return (
    <div className={selected ? 'long-user-card scale-t' : 'long-user-card'}>
      <div className="long-user-card__img-wrapper">
        <img
          className="long-user-card__img"
          src={data?.photo ? data?.photo : MockImage}
        />

        <div className="long-user-card__navigator-wrapper">
          {!isGym && !(type == 'selection') ? (
            <div
              className="long-user-card__profile-navigator"
              onClick={navigateToPacket}
            >
              {hoverText}
            </div>
          ) : (
            <div
              className="long-user-card__profile-navigator"
              onClick={() => onClickHover(data)}
            >
              {hoverText}
            </div>
          )}
        </div>
      </div>

      <div className="long-user-card__body">
        <Title textAlign="left" component="h5">
          {data?.name}
        </Title>

        <Span underline>{data?.branch}</Span>

        <div className="long-user-card__location-wrapper">
          <div className="long-user-card__location-text">
            Min. Ders Ücreti: {data?.lesson_amount}
          </div>

          <div className="long-user-card__fee">
            {data?.price_c || data?.price_b || data?.price_a } <AwesomeIcon.Tl />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PtPacketCard;
