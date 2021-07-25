import React, { useState } from 'react';

import styled, { css } from 'styled-components/macro';
import { Button, Svg, Stars } from 'components';

import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BlockUserModal } from 'components'
import Card, { CardFooter, CardInfo } from './Card';
import {
  addFavoriteUser,
  removeFavoriteUser,
  setReservation,
  setNewMessageRoom,
} from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { USER } from '../../../constants';

const ProfileBanner = ({
  className = null,
  info,
  categories = [],
  about,
  setPage = () => { },
  isUserDetail = false,
}) => {
  const [isFavorited, setIsFavorited] = useState(info.has_favorite === 1);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [openApprove, setOpenApprove] = useState(false)
  const favoriteClickHandler = () => {
    if (isFavorited) {
      dispatch(removeFavoriteUser(info.id));
      setIsFavorited(false);
    } else {
      dispatch(addFavoriteUser(info.id));
      setIsFavorited(true);
    }
  };
  function openBlockModal() {

    setOpenApprove(true)
  }
  return (
    <Containers className={className}>
      <BlockUserModal
        isBlocked={info?.isBlocked} //Burası değişcek
        open={openApprove}
        approve={() => {
          setOpenApprove(false);
        }}
        cancel={() => {
          setOpenApprove(false);
        }}
      />
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
              {isUserDetail && (
                <Link to="/myprofile/settings/profile">
                  {' '}
                  <Setting
                    onClick={favoriteClickHandler}
                    showHeartBg={true}
                  />{' '}
                </Link>
              )}
            </span>

            <Stars rating={info.stars} position="bottom" />

            {!isUserDetail ? (
              user?.type_id === USER && (
                <CardFooter>
                  <Comment
                    to={'/myprofile/settings/message'}
                    className="list"
                    onClick={() => dispatch(setNewMessageRoom(info))}
                  >
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
                </CardFooter>
              )
            ) : (
              <CardFooter>
                <Link to={'/myprofile/settings/reservation'}>
                  <Button
                    onClick={() => {
                      dispatch(setReservation({ isSelected: false }));
                      setPage('Reservation');
                    }}
                    text="Takvim Oluştur"
                    className="blue list"
                    style={{ fontSize: '9pt' }}
                  />
                </Link>
              </CardFooter>
            )}
          </Card>
        </Cols>

        <Cols lg={3}>
          <CardInfo
            name={info.name}
            price={info.price}
            categories={categories}
            jobType={info.category}
            location={info.location}
          />

        </Cols>
        {/* <Cols lg={1}>
          <Line />
        </Cols> */}

        <Cols lg={4} style={{ borderLeft: 'ridge' }}>
          {about && <TitleWrapper>Hakkımda</TitleWrapper>}
          <TextWrapper>{about}</TextWrapper>

        </Cols>

      </Rows>
      {!isUserDetail && <BlockContainer>
        <BlockUser onClick={() => { openBlockModal() }}>{info?.isBlocked ? "Engeli kaldır" : "Kullanıcıyı Engelle"}</BlockUser>

      </BlockContainer>}
    </Containers>
  );
};
const TextWrapper = styled.div`
  text-align: justify;
`;
const TitleWrapper = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #00b2a9;
`;
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

// const Line = styled.div`
//   max-width: 1px;
//   height: 285px;
//   background: #e5e5e5;
// `;

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
const BlockContainer = styled.div`
  padding: 0 60px;
`
const BlockUser = styled.text`
  color:red;
  cursor:pointer;

`
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
