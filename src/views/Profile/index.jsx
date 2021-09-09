import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { WORK_PLACE, PERSONAL_TRAINER, DIETITIAN } from '../../constants';
import { useTranslation } from 'react-i18next';

import { getUserInfo } from 'actions';
import profileImg from 'assets/default-profile.jpg';
import profileBannerImg from 'assets/banner/slider-item-1.png';
import styled from 'styled-components/macro';

import { Tab, Main } from 'components';
import ProfileBanner from 'components/banner/profile-banner';
import Branch from 'components/Profile/Branch';
import ProfileCertificate from 'components/Profile/ProfileCertificate';
import Comment from 'components/Profile/Comment';
import Place from 'components/Profile/Place';
import DietitionPlace from 'components/Profile/Dietition/DietitionPlace';
import DietitionSpeciality from 'components/Profile/Dietition/DietitionSpeciality';
import Blog from 'components/Profile/Blog';
import FacilityList from 'components/Profile/Gym/FacilityList';
import GymLocation from 'components/Profile/Gym/Location';
import Classes from 'components/Profile/Gym/Classes/index';
import FindPt from 'components/Profile/Gym/FindPt';
import Galery from 'components/Profile/Galery';
import ProfileReservation from 'components/ProfileReservation';
import IndividualImprint from 'components/IndividualImprint';

import MyCalendar from 'components/Profile/MyCalendar/MyCalendar';

export default function Profile({ match }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const [page, setPage] = useState('Start');
  const { userInfo, isLoading } = useSelector(
    (state) => state.userProfile.userInfo
  );

  useEffect(() => {
    dispatch(getUserInfo(match?.params?.id));
  }, [match?.params?.id]);

  const trainerAndDitetionTabs = [
    {
      eventKey: 'branch',
      title: t('BRANCHES'),
      component:
        userInfo?.type_id === DIETITIAN ? (
          <DietitionSpeciality userId={match?.params?.id} />
        ) : (
          <Branch userId={match?.params?.id} />
        ),
    },
    {
      eventKey: 'certificate',
      title: t('CERTIFICATES'),
      component: <ProfileCertificate userId={match?.params?.id} />,
    },
    {
      eventKey: 'workplace',
      title: t('WORKING PLACES'),
      component:
        userInfo?.type_id === DIETITIAN ? (
          <DietitionPlace userId={match?.params?.id} />
        ) : (
          <Place userId={match?.params?.id} />
        ),
    },
    {
      eventKey: 'calendar',
      title: t('CALENDAR'),
      component: (
        <MyCalendar
          userId={match?.params?.id}
          typeId={userInfo?.type_id}
          setPage={setPage}
        />
      ),
    },
    {
      eventKey: 'comments',
      title: t('COMMENTS'),
      component: <Comment userId={match?.params?.id} />,
    },
    {
      eventKey: 'gallery',
      title: t('GALLERY'),
      component: <Galery userId={match?.params?.id} />,
    },
    {
      eventKey: 'blog',
      title: t('BLOG'),
      component: <Blog userId={match?.params?.id} userName={userInfo?.name} />,
    },
  ];

  const workPlaceTabs = [
    {
      eventKey: 'facility',
      title: t('FACILITIES'),
      component: <FacilityList userId={match?.params?.id} />,
    },
    /*{
      eventKey: 'certificate',
      title: t('CERTIFICATES'),,
      component: <ProfileCertificate userId={match?.params?.id} />,
    },*/
    {
      eventKey: 'workplace',
      title: t('CLASSES'),
      component: <Classes userId={match?.params?.id} />,
    },

    {
      eventKey: 'trainers',
      title: t('TRAINERS'),
      component: <FindPt userId={match?.params?.id} />,
    },
    {
      eventKey: 'calendar',
      title: t('CALENDAR'),
      component: (
        <MyCalendar
          userId={match?.params?.id}
          typeId={userInfo?.type_id}
          setPage={setPage}
        />
      ),
    },
    {
      eventKey: 'comments',
      title: t('COMMENTS'),
      component: <Comment userId={match?.params?.id} />,
    },
    {
      eventKey: 'gallery',
      title: t('GALLERY'),
      component: <Galery userId={match?.params?.id} />,
    },
    {
      eventKey: 'location',
      title: t('LOCATION'),
      component: <GymLocation />,
    },
  ];

  let tabData;

  switch (userInfo?.type_id) {
    case PERSONAL_TRAINER:
      tabData = trainerAndDitetionTabs;
      break;
    case WORK_PLACE:
      tabData = workPlaceTabs;
      break;
    case DIETITIAN:
      tabData = trainerAndDitetionTabs;
      break;
    default:
      break;
  }
  let content;
  switch (page) {
    case 'Start':
      content = (
        <>
          {' '}
          <Container>
            <Row>
              <ProfileBanner
                setPage={setPage}
                onBlockUser={() => {}}
                info={{
                  team: userInfo?.classification,
                  img: userInfo?.photo || profileImg,
                  name: userInfo?.name,
                  category: userInfo?.title,
                  price: userInfo?.price,
                  stars: userInfo?.rating,
                  location:
                    userInfo?.city || userInfo?.district
                      ? `${userInfo?.district},${userInfo?.city}`
                      : '',
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
              <Tab
                baseUrl={`/user/${match?.params?.id}/`}
                tabData={tabData}
                defaultActiveKey={
                  match?.params?.activeTabKey || tabData?.[0]?.eventKey
                }
              />
              {userInfo?.type_id == 1 && (
                <IndividualImprint userInfo={userInfo} />
              )}
            </TabContainers>
          </Container>
        </>
      );
      break;
    case 'Reservation':
      content = <ProfileReservation setPage={setPage} />;
      break;
  }
  return isLoading ? (
    <div>Yükleniyor</div>
  ) : (
    <Main>
      <img src={profileBannerImg} alt="" className="banner-image" />
      {content}
    </Main>
  );
}

const TabContainers = styled.div`
  min-height: 550px;
  padding: 30px;
`;
