import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { WORK_PLACE, PERSONAL_TRAINER, DIETITIAN } from '../../constants';

import { getUserInfo } from 'actions';
import profileImg from 'assets/pt-groups/item-1/04.jpg';
import { Tab, Main, ProfileBanner } from 'components';
import Branch from 'components/Profile/Branch';
import ProfileCertificate from 'components/Profile/ProfileCertificate';
// import Comment from 'components/Profile/Comment';
import Place from 'components/Profile/Place';
import DietitionPlace from 'components/Profile/Dietition/DietitionPlace';
import DietitionSpeciality from 'components/Profile/Dietition/DietitionSpeciality';
import Blog from 'components/Profile/Blog';
import FacilityList from 'components/Profile/Gym/FacilityList';
import GymLocation from 'components/Profile/Gym/Location';
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
      title: 'SERTİFİKA',
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
      component: <Place userId={match?.params?.id} />,
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
            }}
            categories={userInfo?.session || userInfo?.branch}
            about={userInfo?.about}
          />
        </Row>
      </Container>
      <div className="col-md-8 col-sm-12 mx-auto tab-wrapper tab-wrapper__shadow">
        <Tab
          baseUrl={`/user/${match?.params?.id}/`}
          tabData={tabData}
          defaultActiveKey={
            match?.params?.activeTabKey || tabData?.[0]?.eventKey
          }
        />
      </div>
    </Main>
  );
}
