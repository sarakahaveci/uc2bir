import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import {
  Tab,
  Title,
  Main,
  MasonaryGallery,
  Wallet,
  SessionType,
  Blog,
  CancellationReason,
} from 'components';
import { USER, PERSONAL_TRAINER, WORK_PLACE, DIETITIAN } from '../../constants';
import Trainers from 'components/ProfileSettings/WorkPlace/Trainers/Trainers';
import profileImg from '../../assets/banner/slider-item-1.png';
import ProfileSettings from './ProfileSettings';
import WorkPlaceFacility from 'components/ProfileSettings/WorkPlace/WorkPlaceFacility/WorkPlaceFacility';
import WorkPlaceActivity from 'components/ProfileSettings/WorkPlace/WorkPlaceActivity/WorkPlaceActivity';
import Proficiency from 'components/ProfileSettings/Proficiency/Proficiency';
import PTBranch from 'components/ProfileSettings/PT/PTBranch';
import Favorites from 'components/ProfileSettings/Favorites/Favorites';
import DietitianPrice from 'components/ProfileSettings/Dietitian/DietitianPrice';
import DietitianProficiency from 'components/ProfileSettings/Dietitian/DietitianProficiency';
import MessageSidebar from 'components/ProfileSettings/MessagesSidebar/MessagesSidebar';
import RegularNotifications from 'views/ProfileSettings/RegularNotifications';

const regularUserTabs = [
  {
    eventKey: 'profile',
    title: 'Profilim',
    component: <ProfileSettings />,
  },

  /* {
    eventKey: 'reservation',
    title: 'Rezarvasyonlarım',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Rezarvasyonlarım
      </Title>
    ),
  }, */
  /* {
    eventKey: 'packets',
    title: 'Paketlerim',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Paketlerim
      </Title>
    ),
  }, */
  /*  {
    eventKey: 'wallet',
    title: 'Cüzdanım',
    component: <Wallet />,
  }, */
  {
    eventKey: 'favorite',
    title: 'Favorilerim',
    component: <Favorites />,
  },
  {
    eventKey: 'notifications',
    title: 'Bildirimlerim',
    component: <RegularNotifications />,
  },
  {
    eventKey: 'message',
    title: 'Mesajlarım',
    component: <MessageSidebar />,
  },
];

const workPlaceTabs = [
  {
    eventKey: 'profile',
    title: 'Profilim',
    component: <ProfileSettings />,
  },
  /* {
    eventKey: 'reservation',
    title: 'Rezarvasyonlarım',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Rezarvasyonlarım
      </Title>
    ),
  }, */
  {
    eventKey: 'facility',
    title: 'Olanaklar',
    component: <WorkPlaceFacility />,
  },
  {
    eventKey: 'activity',
    title: 'Faaliyet Alanları',
    component: <WorkPlaceActivity />,
  },
  {
    eventKey: 'trainers',
    title: 'Eğitmenler',
    component: <Trainers />,
  },
  /*   {
    eventKey: 'wallet',
    title: 'Cüzdan',
    component: <Wallet />,
  }, */
  {
    eventKey: 'gallery',
    title: 'Galeri',
    component: <MasonaryGallery />,
  },
];

const dietitianTabs = [
  {
    eventKey: 'profile',
    title: 'Profilim',
    component: <ProfileSettings />,
  },
  /* {
    eventKey: 'reservation',
    title: 'Rezarvasyonlarım',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Rezarvasyonlarım
      </Title>
    ),
  }, */
  /* {
    eventKey: 'packets',
    title: 'Paketlerim',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Paketlerim
      </Title>
    ),
  }, */
  /*  {
    eventKey: 'service',
    title: 'Hizmetlerim',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Hizmetlerim
      </Title>
    ),
  }, */
  {
    eventKey: 'location',
    title: 'Oturum Türleri & Çalıştığım yerler',
    component: <SessionType />,
  },
  {
    eventKey: 'price',
    title: 'Ücretlerim',
    component: <DietitianPrice />,
  },
  {
    eventKey: 'specialties',
    title: 'Uzmanlıklarım',
    component: <DietitianProficiency />,
  },
  /* TODO: Tab will active after BE ready
    {
    eventKey: 'wallet',
    title: 'Cüzdanım',
    component: <Wallet />,
  }, */
  {
    eventKey: 'gallery',
    title: 'Galeri',
    component: <MasonaryGallery />,
  },
  {
    eventKey: 'blog',
    title: 'Blog',
    component: <Blog />,
  },
];

const trainerTabs = [
  {
    eventKey: 'profile',
    title: 'Profilim',
    component: <ProfileSettings />,
  },
  /* {
    eventKey: 'reservation',
    title: 'Rezarvasyonlarım',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Rezarvasyonlarım
      </Title>
    ),
  }, */
  /* {
    eventKey: 'packets',
    title: 'Paketlerim',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Paketlerim
      </Title>
    ),
  }, */

  {
    eventKey: 'location',
    title: 'Oturum Türleri & Çalıştığım yerler',
    component: <SessionType />,
  },
  {
    eventKey: 'notifications',
    component: <ProfileSettings />,
  },
  {
    eventKey: 'cancel',
    component: <CancellationReason />,
  },
  {
    eventKey: 'branch',
    title: 'Branşlarım & Ücretlerim',
    component: <PTBranch />,
  },

  {
    eventKey: 'specialties',
    title: 'Uzmanlıklarım',
    component: <Proficiency />,
  },
  /*  {
    eventKey: 'wallet',
    title: 'Cüzdanım',
    component: <Wallet />,
  }, */
  {
    eventKey: 'gallery',
    title: 'Galeri',
    component: <MasonaryGallery />,
  },
  {
    eventKey: 'blog',
    title: 'Blog',
    component: <Blog />,
  },
];

export default function UserProfile({ match }) {
  const user = useSelector((state) => state.auth.user);

  let tabData;

  switch (user?.type_id) {
    case USER:
      tabData = regularUserTabs;
      break;
    case PERSONAL_TRAINER:
      tabData = trainerTabs;
      break;
    case WORK_PLACE:
      tabData = workPlaceTabs;
      break;
    case DIETITIAN:
      tabData = dietitianTabs;
      break;
    default:
      tabData = regularUserTabs;
      break;
  }

  return (
    <Main>
      <img src={profileImg} alt="" className="banner-image" />

      <Container>
        <div className="tab-wrapper">
          <Tab
            tabData={tabData}
            defaultActiveKey={match?.params?.activeTabKey || 'profile'}
          />
        </div>
      </Container>
    </Main>
  );
}
