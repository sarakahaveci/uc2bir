import React, { useEffect, useState } from 'react';

import Svg from 'components/statics/svg';
import List from '../HeaderList';
import Item from '../HeaderItem';
import TABS from 'constants/tabUri';
import { useSelector } from 'react-redux';
import defaultImage from '../../../assets/default-profile.jpg';
import { useTranslation } from 'react-i18next';
const Pt = ({ user_name, user_img = null, logoutHandler }) => {
  const { t } = useTranslation();

  const { data: allRooms } = useSelector(
    (state) => state.profileSettings2.messages.rooms
  );
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
      name: t('my packages'),
      icon: <Svg.Packet />,
      link: TABS.packetsPath,
    },
    {
      name: t('Session Types & Where I Work'),
      icon: <Svg.PtHome />,
      link: TABS.sessiontypePath,
    },
    {
      name: t('My Branches & Fees'),
      icon: <Svg.PtBranch />,
      link: TABS.branchPath,
    },
    {
      name: t('my specialties'),
      icon: <Svg.Expert />,
      link: TABS.specialtiesPath,
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
      name: 'Blog',
      icon: <Svg.Blog />,
      link: TABS.blogPath,
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
      isUserMenu: true,
      name: user_name,
      icon: user_img ? (
        <img style={{ objectFit: 'cover' }} src={user_img} />
      ) : (
        <img style={{ objectFit: 'cover' }} src={defaultImage} />
      ),
      menu: userDependentMenu,
      pulse: true,
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

export default Pt;
