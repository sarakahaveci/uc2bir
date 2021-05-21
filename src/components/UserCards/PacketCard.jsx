import React from 'react';

import MockImage from 'assets/default-profile.jpg';
import { Title, AwesomeIcon, Span } from 'components';
import { useHistory } from 'react-router-dom';

const PacketCard = ({
  data,
  district,
  hoverText = 'Pakete Git',
  isGym,
  subType,
  onClickHover = () => {},
  selected = false,
  type,
}) => {
  const history = useHistory();

  const navigateToPacket = () => {
    const userId = data?.id || data?.user_id;
    history.push(`/packets/${subType}/detail/` + userId);
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
          {data?.name || data?.title}
        </Title>

        <Span underline>{data?.dt?.name}</Span>

        <div className="long-user-card__location-wrapper">
          <div className="long-user-card__location-text">
            {data?.district || district}
          </div>

          <div className="long-user-card__fee">
            {data?.price || 0} <AwesomeIcon.Tl />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PacketCard;
