import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { Tab, Title, Main } from 'components';
import { USER, PERSONAL_TRAINER, WORK_PLACE, DIETITIAN } from '../../constants';

import profileImg from '../../assets/banner/slider-item-1.png';

const regularUserTabs = [
  {
    eventKey: 'profile',
    title: 'Profilim',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Profilim
      </Title>
    ),
  },
  {
    eventKey: 'rezarvation',
    title: 'Rezarvasyonlarım',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Rezarvasyonlarım
      </Title>
    ),
  },
  {
    eventKey: 'packets',
    title: 'Paketlerim',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Paketlerim
      </Title>
    ),
  },
  {
    eventKey: 'wallet',
    title: 'Cüzdanım',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Cüzdanım
      </Title>
    ),
  },
  {
    eventKey: 'favorite',
    title: 'Favorilerim',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Favorilerim
      </Title>
    ),
  },
  {
    eventKey: 'notifications',
    title: 'Bildirimlerim',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Bildirimlerim
      </Title>
    ),
  },
  {
    eventKey: 'message',
    title: 'Mesajlarım',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Mesajlarım
      </Title>
    ),
  },
];

const workPlaceTabs = [
  {
    eventKey: 'profile',
    title: 'Profilim',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Profilim
      </Title>
    ),
  },
  {
    eventKey: 'rezarvation',
    title: 'Rezarvasyonlarım',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Rezarvasyonlarım
      </Title>
    ),
  },
  {
    eventKey: 'facility',
    title: 'Olanaklar',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Olanaklar
      </Title>
    ),
  },
  {
    eventKey: 'activity',
    title: 'Faaliyet Alanları',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Faaliyet Alanları
      </Title>
    ),
  },
  {
    eventKey: 'trainers',
    title: 'Eğitmenler',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Eğitmenler
      </Title>
    ),
  },
  {
    eventKey: 'wallet',
    title: 'Cüzdan',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Cüzdan
      </Title>
    ),
  },
  {
    eventKey: 'galery',
    title: 'Galeri',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Galeri
      </Title>
    ),
  },
];

const dietitianTabs = [
  {
    eventKey: 'profile',
    title: 'Profilim',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Profilim
      </Title>
    ),
  },
  {
    eventKey: 'rezarvation',
    title: 'Rezarvasyonlarım',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Rezarvasyonlarım
      </Title>
    ),
  },
  {
    eventKey: 'packets',
    title: 'Paketlerim',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Paketlerim
      </Title>
    ),
  },
  {
    eventKey: 'service',
    title: 'Hizmetlerim',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Hizmetlerim
      </Title>
    ),
  },
  {
    eventKey: 'location',
    title: 'Oturum Türleri & Çalıştığım yerler',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Oturum Türleri & Çalıştığım yerler
      </Title>
    ),
  },
  {
    eventKey: 'price',
    title: 'Ücretlerim',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Ücretlerim
      </Title>
    ),
  },
  {
    eventKey: 'specialties',
    title: 'Uzmanlıklarım',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Uzmanlıklarım
      </Title>
    ),
  },
  {
    eventKey: 'wallet',
    title: 'Cüzdanım',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Cüzdanım
      </Title>
    ),
  },
  {
    eventKey: 'galery',
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

const trainerTabs = [
  {
    eventKey: 'profile',
    title: 'Profilim',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Profilim
      </Title>
    ),
  },
  {
    eventKey: 'rezarvation',
    title: 'Rezarvasyonlarım',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Rezarvasyonlarım
      </Title>
    ),
  },
  {
    eventKey: 'packets',
    title: 'Paketlerim',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Paketlerim
      </Title>
    ),
  },

  {
    eventKey: 'location',
    title: 'Oturum Türleri & Çalıştığım yerler',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Oturum Türleri & Çalıştığım yerler
      </Title>
    ),
  },
  {
    eventKey: 'branch',
    title: 'Branşlarım & Ücretlerim',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Branşlarım & Ücretlerim
      </Title>
    ),
  },

  {
    eventKey: 'specialties',
    title: 'Uzmanlıklarım',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Uzmanlıklarım
      </Title>
    ),
  },
  {
    eventKey: 'wallet',
    title: 'Cüzdanım',
    component: (
      <Title variant={'h4'} component={'h4'} textLeft lineDisable>
        Cüzdanım
      </Title>
    ),
  },
  {
    eventKey: 'galery',
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

export default function Profile({ match }) {
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
          <Tab tabData={tabData} defaultActiveKey="profile" />
        </div>
      </Container>
    </Main>
  );
}
