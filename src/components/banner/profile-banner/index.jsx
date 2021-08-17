import React, { useState } from 'react';

import styled, { css } from 'styled-components/macro';
import { Button, Svg, Stars } from 'components';

import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BlockUserModal } from 'components';
import Card, { CardFooter, CardInfo } from './Card';
import {
  addFavoriteUser,
  removeFavoriteUser,
  setReservation,
  setNewMessageRoom,
  blockUser,
} from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { USER } from '../../../constants';
const ProfileBanner = ({
  className = null,
  info,
  categories = [],
  about,
  setPage = () => {},
  isUserDetail = false,
}) => {
  const [isFavorited, setIsFavorited] = useState(info.has_favorite === 1);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [openApprove, setOpenApprove] = useState(false);
  const [showOthers, setShowOthers] = useState(false);

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
    setOpenApprove(true);
  }
  return (
    <Containers
      onClick={() => {
        if (showOthers) setShowOthers(false);
      }}
      className={className}
    >
      {(info?.type_id && (
        <>
          <BlockUserModal
            isBlocked={info?.isBlocked} //Burası değişcek
            open={openApprove}
            approve={() => {
              setOpenApprove(false);
              dispatch(blockUser(info?.id));
            }}
            cancel={() => {
              setOpenApprove(false);
            }}
          />
          <Rows>
            <Cols lg={4}>
              <Card img={info.img}>
                <span className="team">{info.team}</span>
                <span
                  style={{ display: 'flex', alignItems: 'center' }}
                  className="span"
                >
                  {user?.type_id === USER &&
                    (isFavorited ? (
                      <ActiveHeart
                        onClick={favoriteClickHandler}
                        showHeartBg={false}
                      />
                    ) : (
                      <Heart
                        onClick={favoriteClickHandler}
                        showHeartBg={true}
                      />
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
                  <Dropdown>
                    <DropdownButton
                      className="list"
                      onClick={() => {
                        setShowOthers(!showOthers);
                      }}
                    >
                      <text style={{ color: 'white', fontSize: '7px' }}>
                        ⬤⬤⬤
                      </text>
                    </DropdownButton>
                    <DropdownContent show={showOthers}>
                      <Wrapper>
                        <BlockContainer>
                          <Svg.BlackBlock
                            style={{ marginRight: '10px' }}
                          ></Svg.BlackBlock>
                          <BlockUser
                            onClick={() => {
                              openBlockModal();
                            }}
                          >
                            {info?.isBlocked
                              ? 'Engeli kaldır'
                              : 'Kullanıcıyı Engelle'}
                          </BlockUser>
                        </BlockContainer>
                      </Wrapper>
                    </DropdownContent>
                  </Dropdown>
                </span>

                <Stars rating={info.stars} position="bottom" />

                {!isUserDetail ? (
                  (user?.type_id === USER && (
                    <CardFooter>
                      <Wrapper>
                        <Comment
                          to={'/myprofile/settings/message'}
                          onClick={() => dispatch(setNewMessageRoom(info))}
                        >
                          <Svg.Comment></Svg.Comment>
                        </Comment>
                      </Wrapper>

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
                  )) || (
                    <CardFooter>
                      <Wrapper>
                        <Comment
                          to={'/myprofile/settings/message'}
                          onClick={() => dispatch(setNewMessageRoom(info))}
                        >
                          <Svg.Comment></Svg.Comment>
                        </Comment>
                      </Wrapper>
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
        </>
      )) || (
        <div style={{ margin: '50px' }}>
          <text style={{ fontSize: '25px', fontWeight: 'bold' }}>
            Profil bulunamamaktadır
          </text>
        </div>
      )}
    </Containers>
  );
};
const TextWrapper = styled.div`
  text-align: justify;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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
  display: flex;
  align-items: center;
  background: white;
  height: 50px;
  width: 50px;
  border-radius: 3px;
  justify-content: center;
  -webkit-box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  svg {
    width: 25px;
    height: 25px;
  }
`;

const Dropdown = styled.div`
  position: relative;
`;
const DropdownContent = styled.div`
  display: ${(p) => (p.show ? 'flex' : 'none')};

  flex-direction: column;
  background: white;
  width: 231px;
  position: absolute;
  margin-left: 5px;
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
  -webkit-box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  z-index: 99999999999999;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
`;
const DropdownButton = styled(Link)`
  display: flex;
  min-width: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 16px;
`;
const BlockContainer = styled.div`
  display: flex;
  align-items: center;
`;
const BlockUser = styled.text`
  cursor: pointer;
`;
const heart = css`
  display: flex;
  padding: 8px;
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
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
