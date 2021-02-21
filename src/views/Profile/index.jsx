import React from 'react';

import { Tab, Title, Main } from 'components';
import ProfileCertificate from './ProfileCertificate';
import Branch from './Branch';
import WorkPlace from './WorkPlace';

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
      eventKey: 'location',
      title: 'Konum',
      component: (
        <Title variant={'h4'} component={'h4'} textLeft lineDisable>
          Konum
        </Title>
      ),
    },
    {
      eventKey: 'workPlace',
      title: 'Çalıştığı Yerler',
      component: <WorkPlace />,
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
      eventKey: 'galary',
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
      <div className="col-md-8 col-sm-12 mx-auto">
        <div>Efe Tainer </div>
        <Tab tabData={trainerData} defaultActiveKey="branch" />
      </div>
    </Main>
  );
}
