/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import {
  Tab,
  Title,
  Main,
  MasonaryGallery,
  Wallet,
  SessionType,
  Packets,
  Blog,
  CancellationReason,
} from 'components';
import { getProfileDetails } from 'actions';
import { USER, PERSONAL_TRAINER, WORK_PLACE, DIETITIAN } from '../../constants';
import Trainers from 'components/ProfileSettings/WorkPlace/Trainers/Trainers';
import profileImg from '../../assets/banner/slider-item-1.png';
import ProfileSettingsList from '../../components/ProfileSettings/ProfileSettingsList';
import WorkPlaceFacility from 'components/ProfileSettings/WorkPlace/WorkPlaceFacility/WorkPlaceFacility';
import WorkPlaceActivity from 'components/ProfileSettings/WorkPlace/WorkPlaceActivity/WorkPlaceActivity';
import Proficiency from 'components/ProfileSettings/Proficiency/Proficiency';
import PTBranch from 'components/ProfileSettings/PT/PTBranch';
import Favorites from 'components/ProfileSettings/Favorites/Favorites';
import DietitianPrice from 'components/ProfileSettings/Dietitian/DietitianPrice';
import DietitianProficiency from 'components/ProfileSettings/Dietitian/DietitianProficiency';
import Message from 'components/ProfileSettings/Message';
import RegularNotifications from 'components/ProfileSettings/RegularNotifications';
import GroupSlot from 'components/ProfileSettings/Reservations/GroupSlot/GroupSlot';
import Reservations from 'components/ProfileSettings/Reservations';
import ProfileDetail from 'components/ProfileSettings/ProfileDetail/ProfileDetail';
import Services from 'components/ProfileSettings/Services';

const regularUserTabs = [
  {
    eventKey: 'profile',
    title: 'Profilim',
    component: <ProfileSettingsList />,
  },

  {
    eventKey: 'reservation',
    title: 'Rezervasyonlarım',
    component: <Reservations />,
  },
  {
    eventKey: 'packets',
    title: 'Paketlerim',
    component: <Packets />,
  },
  {
    eventKey: 'wallet',
    title: 'Cüzdanım',
    component: <Wallet />,
  },
  {
    eventKey: 'favorites',
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
    component: <Message />,
  },
  {
    eventKey: 'cancel',
    component: <CancellationReason />,
  },
];

const workPlaceTabs = [
  {
    eventKey: 'profileDetail',
    title: 'Profilim',
    component: <ProfileDetail />,
  },
  {
    eventKey: 'profile',
    component: <ProfileSettingsList />,
  },
  {
    eventKey: 'favorites',
    title: 'Favorilerim',
    component: <Favorites />,
  },
  {
    eventKey: 'reservation',
    title: 'Rezervasyonlarım',
    component: <Reservations />,
  },
  {
    eventKey: 'notifications',
    component: <ProfileSettingsList />,
  },
  {
    eventKey: 'cancel',
    component: <CancellationReason />,
  },

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

  {
    eventKey: 'wallet',
    title: 'Cüzdan',
    component: <Wallet />,
  },
  {
    eventKey: 'gallery',
    title: 'Galeri',
    component: <MasonaryGallery />,
  },
];

const dietitianTabs = [
  {
    eventKey: 'profileDetail',
    title: 'Profilim',
    component: <ProfileDetail />,
  },
  {
    eventKey: 'profile',
    component: <ProfileSettingsList />,
  },
  {
    eventKey: 'notifications',
    component: <ProfileSettingsList />,
  },
  {
    eventKey: 'cancel',
    component: <CancellationReason />,
  },
  {
    eventKey: 'reservation',
    title: 'Rezervasyonlarım',
    component: <Reservations />,
  },
   {
    eventKey: 'packets',
    title: 'Paketlerim',
    component: <Packets />,
  }, 
  {
    eventKey: 'service',
    title: 'Danışanlar',
    component: <Services />,
  },
  {
    eventKey: 'location',
    title: 'Oturum Türleri & Çalıştığım Yerler',
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
  // TODO: Tab will active after BE ready
  {
    eventKey: 'wallet',
    title: 'Cüzdanım',
    component: <Wallet />,
  },
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
    eventKey: 'profileDetail',
    title: 'Profilim',
    component: <ProfileDetail />,
  },
  {
    eventKey: 'profile',
    component: <ProfileSettingsList />,
  },
  {
    eventKey: 'notifications',
    component: <ProfileSettingsList />,
  },
  {
    eventKey: 'reservation',
    title: 'Rezervasyonlarım',
    component: <Reservations />,
  },
  {
    eventKey: 'packets',
    title: 'Paketlerim',
    component: <Packets />,
  },

  {
    eventKey: 'location',
    title: 'Oturum Türleri & Çalıştığım Yerler',
    component: <SessionType />,
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
  {
    eventKey: 'wallet',
    title: 'Cüzdanım',
    component: <Wallet />,
  },
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
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getProfileDetails());
  }, []);

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
            defaultActiveKey={match?.params?.activeTabKey || 'profileDetail'}
            baseUrl="/myprofile/settings/"
          />
        </div>
      </Container>
    </Main>
  );
}
