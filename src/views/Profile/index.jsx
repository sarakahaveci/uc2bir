import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { WORK_PLACE, PERSONAL_TRAINER, DIETITIAN } from '../../constants';

import { getUserInfo } from 'actions';
import profileImg from 'assets/pt-groups/item-1/04.jpg';
import profileBannerImg from 'assets/banner/slider-item-1.png';
import styled from 'styled-components/macro';

import { Tab, Main } from 'components';
import ProfileBanner from 'components/banner/profile-banner';
import Branch from 'components/Profile/Branch';
import ProfileCertificate from 'components/Profile/ProfileCertificate';
// import Comment from 'components/Profile/Comment';
import Place from 'components/Profile/Place';
import DietitionPlace from 'components/Profile/Dietition/DietitionPlace';
import DietitionSpeciality from 'components/Profile/Dietition/DietitionSpeciality';
import Blog from 'components/Profile/Blog';
import FacilityList from 'components/Profile/Gym/FacilityList';
import GymLocation from 'components/Profile/Gym/Location';
import Classes from 'components/Profile/Gym/Classes/index';
import FindPt from 'components/Profile/Gym/FindPt';
import Galery from 'components/Profile/Galery';
// import MyCalendar from 'components/Profile/MyCalendar/MyCalendar';

export default function Profile({ match }) {
  const dispatch = useDispatch();
  const { userInfo, isLoading } = useSelector(
    (state) => state.userProfile.userInfo
  );

  useEffect(() => {
    dispatch(getUserInfo(match?.params?.id));
  }, [match?.params?.id]);

  const trainerAndDitetionTabs = [
    {
      eventKey: 'branch',
      title: 'BRANŞLAR',
      component:
        userInfo?.type_id === DIETITIAN ? (
          <DietitionSpeciality userId={match?.params?.id} />
        ) : (
          <Branch userId={match?.params?.id} />
        ),
    },
    {
      eventKey: 'certificate',
      title: 'SERTİFİKALAR',
      component: <ProfileCertificate userId={match?.params?.id} />,
    },
    {
      eventKey: 'workplace',
      title: 'ÇALIŞTIĞI YERLER',
      component:
        userInfo?.type_id === DIETITIAN ? (
          <DietitionPlace userId={match?.params?.id} />
        ) : (
          <Place userId={match?.params?.id} />
        ),
    },
    /*   {
      eventKey: 'calendar',
      title: 'TAKVİM',
      component: <MyCalendar userId={match?.params?.id} />,
    }, */
    /*  {
      eventKey: 'comments',
      title: 'YORUMLAR',
      component: <Comment userId={match?.params?.id} />,
    }, */
    {
      eventKey: 'gallery',
      title: 'GALERİ',
      component: <Galery userId={match?.params?.id} />,
    },
    {
      eventKey: 'blog',
      title: 'BLOG',
      component: <Blog userId={match?.params?.id} />,
    },
  ];

  const workPlaceTabs = [
    {
      eventKey: 'facility',
      title: 'OLANAKLAR',
      component: <FacilityList userId={match?.params?.id} />,
    },
    {
      eventKey: 'certificate',
      title: 'SERTİFİKALAR',
      component: <ProfileCertificate userId={match?.params?.id} />,
    },
    {
      eventKey: 'workplace',
      title: 'SINIFLAR',
      component: <Classes userId={match?.params?.id} />,
    },

    {
      eventKey: 'trainers',
      title: 'EĞİTMEN BUL',
      component: <FindPt userId={match?.params?.id} />,
    },
    /*  {
      eventKey: 'calendar',
      title: 'TAKVİM',
      component: <MyCalendar userId={match?.params?.id} />,
    }, */
    /*   {
      eventKey: 'comments',
      title: 'YORUMLAR',
      component: <Comment userId={match?.params?.id} />,
    }, */
    {
      eventKey: 'gallery',
      title: 'GALERİ',
      component: <Galery userId={match?.params?.id} />,
    },
    {
      eventKey: 'location',
      title: 'KONUM',
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

  return isLoading ? (
    <div>Yükleniyor</div>
  ) : (
    <Main>
      <img src={profileBannerImg} alt="" className="banner-image" />

      <Container>
        <Row>
          <ProfileBanner
            info={{
              team: userInfo?.classification,
              img: userInfo?.photo || profileImg,
              name: userInfo?.name,
              category: userInfo?.title,
              price: userInfo?.price,
              stars: userInfo?.rating,
              location: `${userInfo?.district},${userInfo?.city}`,
              comment: '/',
              type_id: userInfo?.type_id,
            }}
            categories={userInfo?.session || userInfo?.branch}
            about={
              userInfo?.about ||
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum. dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.”'
            }
          />
        </Row>
      </Container>
      <TabContainers>
        <Tab
          baseUrl={`/user/${match?.params?.id}/`}
          tabData={tabData}
          defaultActiveKey={
            match?.params?.activeTabKey || tabData?.[0]?.eventKey
          }
        />
      </TabContainers>
    </Main>
  );
}

const TabContainers = styled.div`
  min-height: 350px;
  padding: 30px;
`;
