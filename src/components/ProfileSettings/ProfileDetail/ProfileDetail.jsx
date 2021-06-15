import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { DIETITIAN, WORK_PLACE } from '../../../constants';

import { getUserInfo } from 'actions';
import profileImg from 'assets/default-profile.jpg';
import styled from 'styled-components/macro';

import { Tabbar } from 'components';
import ProfileBanner from 'components/banner/profile-banner';
import Branch from 'components/Profile/Branch';
import ProfileCertificate from 'components/Profile/ProfileCertificate';
import Comment from 'components/Profile/Comment';
import Place from 'components/Profile/Place';
import DietitionPlace from 'components/Profile/Dietition/DietitionPlace';
import DietitionSpeciality from 'components/Profile/Dietition/DietitionSpeciality';
import Blog from 'components/Profile/Blog';
import Galery from 'components/Profile/Galery';
import ProfileReservation from 'components/ProfileReservation';
import FacilityList from 'components/Profile/Gym/FacilityList';
import Classes from 'components/Profile/Gym/Classes/index';
import FindPt from 'components/Profile/Gym/FindPt';
import GymLocation from 'components/Profile/Gym/Location';
import MyCalendar from 'components/Profile/MyCalendar/MyCalendar';

export default function Profile() {
  const dispatch = useDispatch();
  const [page, setPage] = useState('Start');

  const { userInfo, isLoading } = useSelector(
    (state) => state.userProfile.userInfo
  );
  const { user } = useSelector((state) => state.auth);
  const [tab, setTab] = useState();
  const { id: id } = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getUserInfo(id));
  }, [id]);

  useEffect(() => {
    setTab(userInfo.type_id !== WORK_PLACE ? 'Branches' : 'Facility');
  }, [userInfo]);

  let content;
  if (userInfo?.type_id !== WORK_PLACE) {
    switch (tab) {
      case 'Branches':
        content =
          userInfo?.type_id === DIETITIAN ? (
            <DietitionSpeciality userId={id} />
          ) : (
            <Branch userId={id} />
          );
        break;
      case 'Certificates':
        content = <ProfileCertificate userId={id} />;
        break;
      case 'WorkPlace':
        content =
          userInfo?.type_id === DIETITIAN ? (
            <DietitionPlace userId={id} />
          ) : (
            <Place userId={id} />
          );
        break;
      case 'Calendar':
        content = (
          <MyCalendar
            userId={id}
            typeId={userInfo?.type_id}
            setPage={setPage}
            isUserDetail={true}
          />
        );
        break;
      case 'Comments':
        content = <Comment userId={id} />;
        break;
      case 'Gallery':
        content = <Galery userId={id} />;
        break;
      case 'Blog':
        content = <Blog userId={id} userName={userInfo?.name} />;
        break;
      default:
        return <></>;
    }
  } else {
    switch (tab) {
      case 'Facility':
        content = <FacilityList userId={id} />;
        break;
      case 'Certificates':
        content = <ProfileCertificate userId={id} />;
        break;
      case 'WorkPlace':
        content = <Classes userId={id} />;
        break;
      case 'Trainers':
        content = <FindPt userId={id} />;
        break;
      case 'Calendar':
        content = (
          <MyCalendar
            userId={id}
            typeId={userInfo?.type_id}
            isUserDetail={true}
          />
        );
        break;
      case 'Comments':
        content = <Comment userId={id} />;
        break;
      case 'Gallery':
        content = <Galery userId={id} />;
        break;
      case 'Location':
        content = <GymLocation />;
        break;
      default:
        return <></>;
    }
  }

  switch (page) {
    case 'Start':
      content = (
        <>
          {' '}
          <Container>
            <Row>
              <ProfileBanner
                isUserDetail={true}
                setPage={setPage}
                info={{
                  team: userInfo?.classification,
                  img: userInfo?.photo || profileImg,
                  name: userInfo?.name,
                  category: userInfo?.title,
                  price: userInfo?.price,
                  stars: userInfo?.rating,
                  location: `${userInfo?.district || user?.district},${
                    userInfo?.city || user?.city
                  }`,
                  comment: '/',
                  type_id: userInfo?.type_id,
                  id: userInfo?.id,
                  has_favorite: userInfo?.has_favorite,
                }}
                categories={userInfo?.session || userInfo?.branch}
                about={userInfo?.about}
              />
            </Row>
            <TabContainers>
              <>
                {userInfo.type_id !== WORK_PLACE ? (
                  <Tabbar
                    defaultSelected="Branches"
                    onSelect={(value) => {
                      setTab(value);
                    }}
                    tabs={[
                      { text: 'BRANŞLAR', value: 'Branches' },
                      { text: 'SERTİFİKALAR', value: 'Certificates' },
                      { text: 'ÇALIŞTIĞI YERLER', value: 'WorkPlace' },
                      { text: 'TAKVİM', value: 'Calendar' },
                      { text: 'YORUMLAR', value: 'Comments' },
                      { text: 'GALERİ', value: 'Gallery' },
                      { text: 'BLOG', value: 'Blog' },
                    ]}
                  />
                ) : (
                  <Tabbar
                    defaultSelected="Facility"
                    onSelect={(value) => {
                      setTab(value);
                    }}
                    tabs={[
                      { text: 'OLANAKLAR', value: 'Facility' },
                      { text: 'SERTİFİKALAR', value: 'Certificates' },
                      { text: 'SINIFLAR', value: 'WorkPlace' },
                      { text: 'EĞİTMENLER', value: 'Trainers' },
                      { text: 'TAKVİM', value: 'Calendar' },
                      { text: 'YORUMLAR', value: 'Comments' },
                      { text: 'GALERİ', value: 'Gallery' },
                      { text: 'KONUM', value: 'Location' },
                    ]}
                  />
                )}

                {content}
              </>
            </TabContainers>
          </Container>
        </>
      );
      break;
    case 'Reservation':
      content = <ProfileReservation setPage={setPage} />;
      break;
  }
  return isLoading ? <div>Yükleniyor</div> : <>{content}</>;
}

const TabContainers = styled.div`
  min-height: 550px;
  padding: 30px;
`;
