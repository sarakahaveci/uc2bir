/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

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
import MyTrainers from 'components/ProfileSettings/WorkPlace/Trainers/MyTrainers';

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
import Blocked from 'components/ProfileSettings/Blocked';

export default function UserProfile({ match }) {
  const { t } = useTranslation();

  const regularUserTabs = [
    {
      eventKey: 'profile',
      title: t('my profile'),
      component: <ProfileSettingsList />,
    },

    {
      eventKey: 'reservation',
      title: t('my reservations'),
      component: <Reservations />,
    },
    {
      eventKey: 'packets',
      title: t('my packages'),
      component: <Packets />,
    },
    {
      eventKey: 'wallet',
      title: t('Account Activities'),
      component: <Wallet />,
    },
    {
      eventKey: 'favorites',
      title: t('my favorites'),
      component: <Favorites />,
    },
    {
      eventKey: 'notifications',
      title: t('my notifications'),
      component: <RegularNotifications />,
    },
    {
      eventKey: 'message',
      title: t('My Messages'),
      component: <Message />,
    },
    {
      eventKey: 'cancel',
      component: <CancellationReason />,
    },
    {
      eventKey: 'blocked',
      title: t('Blocked'),
      component: <Blocked />,
      hidden: true,
    },
  ];

  const workPlaceTabs = [
    {
      eventKey: 'profileDetail',
      title: t('my profile'),
      component: <ProfileDetail />,
    },
    {
      eventKey: 'profile',
      component: <ProfileSettingsList />,
    },
    {
      eventKey: 'favorites',
      title: t('my favorites'),
      component: <Favorites />,
    },
    {
      eventKey: 'reservation',
      title: t('my reservations'),
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
      title: t('Facilities'),
      component: <WorkPlaceFacility />,
    },
    {
      eventKey: 'activity',
      title: t('Fields of Activity'),
      component: <WorkPlaceActivity />,
    },
    {
      eventKey: 'trainers',
      title: t('trainers'),
      component: <MyTrainers />,
    },
    {
      eventKey: 'message',
      title: t('My Messages'),
      component: <Message />,
    },

    {
      eventKey: 'wallet',
      title: t('my wallet'),
      component: <Wallet />,
    },
    {
      eventKey: 'gallery',
      title: t('Gallery'),
      component: <MasonaryGallery />,
    },
    {
      eventKey: 'blocked',
      title: t('Blocked'),
      component: <Blocked />,
      hidden: true,
    },
  ];

  const dietitianTabs = [
    {
      eventKey: 'profileDetail',
      title: t('my profile'),
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
      title: t('my reservations'),
      component: <Reservations />,
    },
    {
      eventKey: 'packets',
      title: t('my packages'),
      component: <Packets />,
    },
    {
      eventKey: 'service',
      title: t('Clients'),
      component: <Services />,
    },
    {
      eventKey: 'location',
      title: t('Session Types & Where I Work'),
      component: <SessionType />,
    },
    {
      eventKey: 'price',
      title: t('my fees'),
      component: <DietitianPrice />,
    },
    {
      eventKey: 'specialties',
      title: t('my specialties'),
      component: <DietitianProficiency />,
    },
    // TODO: Tab will active after BE ready
    {
      eventKey: 'wallet',
      title: t('my wallet'),
      component: <Wallet />,
    },
    {
      eventKey: 'gallery',
      title: t('Gallery'),
      component: <MasonaryGallery />,
    },
    {
      eventKey: 'blog',
      title: t('Blog'),
      component: <Blog />,
    },
    {
      eventKey: 'blocked',
      title: t('Blocked'),
      component: <Blocked />,
      hidden: true,
    },
    {
      eventKey: 'message',
      title: t('My Messages'),
      component: <Message />,
    },
  ];

  const trainerTabs = [
    {
      eventKey: 'profileDetail',
      title: t('my profile'),
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
      title: t('my reservations'),
      component: <Reservations />,
    },
    {
      eventKey: 'packets',
      title: t('my packages'),
      component: <Packets />,
    },

    {
      eventKey: 'location',
      title: t('Session Types & Where I Work'),
      component: <SessionType />,
    },
    {
      eventKey: 'cancel',
      component: <CancellationReason />,
    },
    {
      eventKey: 'branch',
      title: t('My Branches & Fees'),
      component: <PTBranch />,
    },

    {
      eventKey: 'specialties',
      title: t('my specialties'),
      component: <Proficiency />,
    },
    {
      eventKey: 'wallet',
      title: t('my wallet'),
      component: <Wallet />,
    },
    {
      eventKey: 'gallery',
      title: t('Gallery'),
      component: <MasonaryGallery />,
    },
    {
      eventKey: 'blog',
      title: t('Blog'),
      component: <Blog />,
    },
    {
      eventKey: 'blocked',
      title: t('Blocked'),
      component: <Blocked />,
      hidden: true,
    },
    {
      eventKey: 'message',
      title: t('My Messages'),
      component: <Message />,
    },
  ];
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
