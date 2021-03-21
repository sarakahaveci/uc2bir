import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import Place from '../../components/Profile/Place';
import { Tab, Title, Main, ProfileBanner } from 'components';
import ProfileCertificate from '../../components/Profile/ProfileCertificate';
import Branch from '../../components/Profile/Branch';
import profileImg from '../../assets/pt-groups/item-1/04.jpg';
import MyCalendar from 'components/Profile/MyCalendar/MyCalendar';
import { WORK_PLACE, PERSONAL_TRAINER } from '../../constants';

export default function Profile({ match }) {
  const user = useSelector((state) => state.auth.user);

  const trainerTabs = [
    {
      eventKey: 'branch',
      title: 'BRANŞLAR',
      component: <Branch />,
    },
    {
      eventKey: 'certificate',
      title: 'SERTİFİKA',
      component: <ProfileCertificate userId={match?.params?.id} />,
    },
    {
      eventKey: 'workplace',
      title: 'ÇALIŞTIĞI YERLER',
      component: <Place />,
    },
    {
      eventKey: 'calendar',
      title: 'TAKVİM',
      component: <MyCalendar />,
    },
    {
      eventKey: 'comments',
      title: 'YORUMLAR',
      component: (
        <Title variant={'h4'} component={'h4'} textLeft lineDisable>
          Yorumlar
        </Title>
      ),
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
      component: (
        <Title variant={'h4'} component={'h4'} textLeft lineDisable>
          Blog
        </Title>
      ),
    },
  ];

  const workPlaceTabs = [
    {
      eventKey: 'facility',
      title: 'OLANAKLAR',
      component: (
        <Title variant={'h4'} component={'h4'} textLeft lineDisable>
          Olanaklar
        </Title>
      ),
    },
    {
      eventKey: 'certificate',
      title: 'SERTİFİKALAR',
      component: <ProfileCertificate userId={match?.params?.id} />,
    },
    {
      eventKey: 'workplace',
      title: 'SINIFLAR',
      component: <Place />,
    },

    {
      eventKey: 'trainers',
      title: 'EĞİTMEN BUL',
      component: (
        <Title variant={'h4'} component={'h4'} textLeft lineDisable>
          Yorumlar
        </Title>
      ),
    },
    {
      eventKey: 'calendar',
      title: 'TAKVİM',
      component: <MyCalendar />,
    },
    {
      eventKey: 'comments',
      title: 'YORUMLAR',
      component: (
        <Title variant={'h4'} component={'h4'} textLeft lineDisable>
          Yorumlar
        </Title>
      ),
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
      <div className="col-md-8 col-sm-12 mx-auto tab-wrapper">
        <Tab
          baseUrl="/profile/"
          tabData={tabData}
          defaultActiveKey={match?.params?.activeTabKey}
        />
      </div>
    </Main>
  );
}
