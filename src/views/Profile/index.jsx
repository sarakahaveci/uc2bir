import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { WORK_PLACE, PERSONAL_TRAINER } from '../../constants';

import { Tab, Title, Main, ProfileBanner } from 'components';
import Branch from 'components/Profile/Branch';
import ProfileCertificate from 'components/Profile/ProfileCertificate';
import Comment from 'components/Profile/Comment';
import Place from 'components/Profile/Place';
import Blog from 'components/Profile/Blog';
import FacilityList from 'components/Profile/Gym/FacilityList';
import FindPt from 'components/Profile/Gym/FindPt';
import MyCalendar from 'components/Profile/MyCalendar/MyCalendar';
import profileImg from 'assets/pt-groups/item-1/04.jpg';

export default function Profile({ match }) {
  const user = useSelector((state) => state.auth.user);

  const trainerTabs = [
    {
      eventKey: 'branch',
      title: 'BRANŞLAR',
      component: <Branch userId={match?.params?.id} />,
    },
    {
      eventKey: 'certificate',
      title: 'SERTİFİKA',
      component: <ProfileCertificate userId={match?.params?.id} />,
    },
    {
      eventKey: 'workplace',
      title: 'ÇALIŞTIĞI YERLER',
      component: <Place userId={match?.params?.id} />,
    },
    {
      eventKey: 'calendar',
      title: 'TAKVİM',
      component: <MyCalendar userId={match?.params?.id} />,
    },
    {
      eventKey: 'comments',
      title: 'YORUMLAR',
      component: <Comment userId={match?.params?.id} />,
    },
    {
      eventKey: 'gallery',
      title: 'GALERİ',
      component: (
        <Title variant={'h4'} component={'h4'} textLeft lineDisable>
          Galeri
        </Title>
      ),
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
    {
      eventKey: 'calendar',
      title: 'TAKVİM',
      component: <MyCalendar userId={match?.params?.id} />,
    },
    {
      eventKey: 'comments',
      title: 'YORUMLAR',
      component: <Comment userId={match?.params?.id} />,
    },
    {
      eventKey: 'gallery',
      title: 'GALERİ',
      component: (
        <Title variant={'h4'} component={'h4'} textLeft lineDisable>
          Galeri
        </Title>
      ),
    },
    {
      eventKey: 'location',
      title: 'KONUM',
      component: (
        <Title variant={'h4'} component={'h4'} textLeft lineDisable>
          KONUM
        </Title>
      ),
    },
  ];

  let tabData;

  switch (user?.type_id) {
    // case USER:
    //   tabData = regularUserTabs;
    //   break;
    case PERSONAL_TRAINER:
      tabData = trainerTabs;
      break;
    case WORK_PLACE:
      tabData = workPlaceTabs;
      break;
      // case DIETITIAN:
      //   tabData = dietitianTabs;
      //   break;
      // default:
      //   tabData = regularUserTabs;
      break;
  }

  return (
    <Main>
      <Container>
        <Row>
          <ProfileBanner
            info={{
              team: 'A',
              img: profileImg,
              name: 'Efe Parlak',
              category: 'Fitnes Eğitmeni',
              price: '100',
              stars: '3',
              location: 'İstanbul, Beşiktaş',
              comment: '/',
            }}
            categories={[
              {
                text: 'Meditasyon',
                link: '/',
              },
              {
                text: 'Pilates',
                link: '/',
              },
              {
                text: 'Fitnes',
                link: '/',
              },
            ]}
            about={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum. dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.”`}
          />
        </Row>
      </Container>
      <div className="col-md-8 col-sm-12 mx-auto tab-wrapper tab-wrapper__shadow">
        <Tab
          baseUrl={`/user/${match?.params?.id}/`}
          tabData={tabData}
          defaultActiveKey={match?.params?.activeTabKey}
        />
      </div>
    </Main>
  );
}
