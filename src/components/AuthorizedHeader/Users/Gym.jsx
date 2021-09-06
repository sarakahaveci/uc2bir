import React, { useEffect, useState } from 'react';

import Svg from 'components/statics/svg';
import List from '../HeaderList';
import Item from '../HeaderItem';
import TABS from 'constants/tabUri';
import { useSelector } from 'react-redux';
import defaultImage from '../../../assets/default-profile.jpg';
import { useTranslation } from 'react-i18next';

const Gym = ({ user_name, user_img = null, logoutHandler }) => {
  const { data: allRooms } = useSelector(
    (state) => state.profileSettings2.messages.rooms
  );
  const { t } = useTranslation();

  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(allRooms?.filter((value) => value.unread_messages === 1).length);
  }, [allRooms]);

  const userDependentMenu = [
    {
      name: t('my profile'),
      icon: <Svg.UsernameIcon />,
      link: TABS.profileDetailPath,
      pulse: true,
    },
    {
      name: t('Facilities'),
      icon: <Svg.TickTick />,
      link: TABS.facilityPath,
    },
    {
      name: t('Fields of Activity'),
      icon: <Svg.PtHome />,
      link: TABS.activityPath,
    },
    {
      name: t('Trainers'),
      icon: <Svg.PeopleGroups />,
      link: TABS.trainersPath,
    },
    {
      name: t('my wallet'),
      icon: <Svg.Wallet />,
      link: TABS.walletPath,
    },
    {
      name: t('Gallery'),
      icon: <Svg.Gallery />,
      link: TABS.galleryPath,
    },
    {
      name: t('logout'),
      icon: <Svg.Closed />,
      onClick: logoutHandler,
    },
  ];

  const list = [
    {
      name: t('notifications'),
      icon: <Svg.Notification />,
      notify: [],
      linkPath: TABS.notificationPath,
    },
    {
      name: t('messages'),
      icon: <Svg.CommentBlack />,
      pulse: true,
      notify: count,
      linkPath: TABS.proMessagesPath,
    },
    {
      name: t('reservations'),
      icon: <Svg.Date />,
      notify: [],
      linkPath: TABS.reservationsPath,
    },
    {
      name: user_name,
      icon: user_img ? (
        <img style={{ objectFit: 'cover' }} src={user_img} />
      ) : (
        <img style={{ objectFit: 'cover' }} src={defaultImage} />
      ),
      menu: userDependentMenu,
      pulse: true,
      isUserMenu: true,
    },
  ];

  return (
    <>
      {list.map((val, key) => {
        return (
          <List
            key={key}
            className="header-login"
            dropDown={val.menu || val.notify}
            linkPath={val?.linkPath}
          >
            <Item
              icon={val.icon}
              text={val.name}
              notify={val.notify}
              pulse={val.pulse}
              isUserMenu={val?.isUserMenu}
            />
          </List>
        );
      })}
    </>
  );
};

export default Gym;
