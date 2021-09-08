import React, { useState } from 'react';
import styled, { css } from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import MockImage from 'assets/default-profile.jpg';
import { addFavoriteUser, removeFavoriteUser } from 'actions';
import { Title, AwesomeIcon, Span, Svg, Stars } from 'components';

const GroupLessonCard = ({
  data,
  showHeartBg,
  favoritedUser,
  city,
  district,
  hoverText = 'Grup Dersine Git',
  isGym,
  onClickHover = () => {},
  selected = false,
  type,
  favoriteId,
}) => {
  const { t } = useTranslation();

  const [isFavorited, setIsFavorited] = useState(favoritedUser);

  const dispatch = useDispatch();

  const history = useHistory();

  const favoriteClickHandler = () => {
    if (isFavorited) {
      dispatch(removeFavoriteUser(favoriteId));
      setIsFavorited(false);
    } else {
      dispatch(addFavoriteUser(favoriteId));
      setIsFavorited(true);
    }
  };
  const navigateToUser = () => {
    //const userId = data?.id || data?.user_id || favoriteId; Şimdilik el ile verildi
    history.push('/group-lessons/detail/' + data?.id);
  };

  return (
    <div className={selected ? 'long-user-card scale-t' : 'long-user-card'}>
      <Stars rating={data?.rating} position="top" />

      <div className="long-user-card__img-wrapper">
        {isFavorited ? (
          <ActiveHeart
            onClick={favoriteClickHandler}
            showHeartBg={showHeartBg}
          />
        ) : (
          <Heart onClick={favoriteClickHandler} showHeartBg={showHeartBg} />
        )}

        <img className="long-user-card__img" src={data?.photo || MockImage} />

        <div className="long-user-card__navigator-wrapper">
          {!isGym && !(type === 'selection') ? (
            <div
              className="long-user-card__profile-navigator"
              onClick={navigateToUser}
            >
              {hoverText}
            </div>
          ) : (
            !(data?.has_working_count > 0) && (
              <div
                className="long-user-card__profile-navigator"
                onClick={() => onClickHover(data)}
              >
                {hoverText}
              </div>
            )
          )}
        </div>
      </div>

      <div className="long-user-card__body">
        <Title textAlign="left" component="h5">
          {data?.title || data?.name}
        </Title>

        <Span underline>{data?.title}</Span>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '10px',
          }}
        >
          <div>
            {' '}
            <Title textAlign="left" component="h6">
              {data?.branch_name} {t('lesson')}
            </Title>
            <SubTitle textAlign="left" component="h6">
              {data?.date} / {data?.hour}
            </SubTitle>
          </div>

          <Title textAlign="end" component="h6" style={{ width: 'auto' }}>
            {data?.min_capacity} / {data?.max_capacity}
          </Title>
        </div>

        <div className="long-user-card__location-wrapper">
          <div className="long-user-card__location-text">
            {(data?.location?.district || district) && (
              <>
                <Svg.LocationIcon /> {data?.location?.city || city},{' '}
                {data?.location?.district || district}
              </>
            )}
          </div>

          <div className="long-user-card__fee">
            {data?.price || 0} <AwesomeIcon.Tl />
          </div>
        </div>
      </div>

      {data?.classification && (
        <div className="long-user-card__classification">
          {data?.classification}
        </div>
      )}
    </div>
  );
};

export default GroupLessonCard;

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

const SubTitle = styled.div`
  color: #00b2a9;
  font-size: 12px;
  font-weight: 400;
  font-style: italic;
`;
