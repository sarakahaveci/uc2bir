import React from 'react';
import { Container, Row } from 'react-bootstrap';

import Place from './Place';
import { Tab, Title, Main, ProfileBanner } from 'components';
import ProfileCertificate from './ProfileCertificate';
import Branch from './Branch';
import profileImg from '../../assets/pt-groups/item-1/04.jpg';

export default function Profile({ match }) {
  const trainerData = [
    {
      eventKey: 'branch',
      title: 'Branşlar',
      component: <Branch />,
    },
    {
      eventKey: 'certificate',
      title: 'Sertifika',
      component: <ProfileCertificate userId={match?.params?.id} />,
    },
    {
      eventKey: 'workPlace',
      title: 'Çalıştığı Yerler',
      component: <Place />,
    },
    {
      eventKey: 'calendar',
      title: 'Takvim',
      component: (
        <Title variant={'h4'} component={'h4'} textLeft lineDisable>
          Takvim
        </Title>
      ),
    },
    {
      eventKey: 'comment',
      title: 'Yorumlar',
      component: (
        <Title variant={'h4'} component={'h4'} textLeft lineDisable>
          Yorumlar
        </Title>
      ),
    },
    {
      eventKey: 'gallery',
      title: 'Galeri',
      component: (
        <Title variant={'h4'} component={'h4'} textLeft lineDisable>
          Galeri
        </Title>
      ),
    },
    {
      eventKey: 'blog',
      title: 'Blog',
      component: (
        <Title variant={'h4'} component={'h4'} textLeft lineDisable>
          Blog
        </Title>
      ),
    },
  ];

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
                text: 'Plates',
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
          tabData={trainerData}
          defaultActiveKey={match?.params?.activeTabKey}
        />
      </div>
    </Main>
  );
}
