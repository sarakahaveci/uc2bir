import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ProfileCard } from 'components';

const mockData = {
  info: {
    team: 'A',
    img: require('../../../assets/pt-groups/item-1/04.jpg'),
    name: user.name,
    category: 'Fitnes Eğitmeni',
    price: '100',
    stars: '3',
    location: 'İstanbul, Beşiktaş',
    comment: '/',
  },
  categories: [
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
  ],
  about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat. Duis aute irure dolor in
  reprehenderit in voluptate velit esse cillum. dolore eu fugiat nulla
  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
  culpa qui officia deserunt mollit anim id est laborum.”`,
};

const ProfileBanner = (props) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [type, setType] = useState();
  const type_id = user.type_id;

  useEffect(() => {
    if (isAuthenticated) {
      switch (type_id) {
        case 1:
          return setType('USER');

        case 2:
          return setType('PERSONAL_TRAINER');

        case 3:
          return setType('WORK_PLACE');

        case 4:
          return setType('DIETITIAN');
      }
    }
  }, [isAuthenticated]);

  if (type === 'USER') {
    return (
      <ProfileCard
        img={mockData.info.img?.default}
        name={mockData.info.name}
        location={mockData.info.location}
        user
      >
        {props.children}
      </ProfileCard>
    );
  } else {
    return (
      <ProfileCard img={mockData.info.img.default}>
        {props.children}
      </ProfileCard>
    );
  }
};

export default ProfileBanner;
