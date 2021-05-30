import React, { useEffect, useState } from 'react';

import Svg from 'components/statics/svg';
import List from '../HeaderList';
import Item from '../HeaderItem';
import TABS from 'constants/tabUri';
import { useSelector } from 'react-redux';

const User = ({ user_name, user_img = null, logoutHandler }) => {
  const { data: allRooms } = useSelector(
    (state) => state.profileSettings2.messages.rooms
  );
  const { message_count,notification_count } = useSelector(
    (state) => state.profileSettings2.notifications
  );
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(allRooms?.filter((value) => value.unread_messages === 1).length);
  }, [allRooms]);
  const userDependentMenu = [
    {
      name: 'Profilim',
      icon: <Svg.UsernameIcon />,
      // It will be updated
      link: TABS.profilePath,
      pulse: true,
    },
    {
      name: 'Rezervasyonlarım',
      icon: <Svg.Date />,
      link: TABS.reservationsPath,
    },
    {
      name: 'Paketlerim',
      icon: <Svg.Packet />,
      link: TABS.packetsPath,
    },
    {
      name: 'Cüzdanım',
      icon: <Svg.Wallet />,
      link: TABS.walletPath,
    },
    {
      name: 'Çıkış Yap',
      icon: <Svg.Closed />,
      onClick: logoutHandler,
    },
  ];

  const list = [
    {
      name: 'Bildirimler',
      icon: <Svg.Notification />,
      notify: notification_count,
      pulse: true,
      linkPath: TABS.notificationPath,
    },
    {
      name: 'Mesajlarım',
      icon: <Svg.CommentBlack />,
      notify: message_count,
      pulse: true,
      linkPath: TABS.messagePath,
    },
    {
      name: 'Favorilerim',
      icon: <Svg.Heart />,
      notify: [],
      linkPath: TABS.favoritesPath,
    },
    {
      name: user_name,
      icon: user_img || <Svg.UsernameIcon />,
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
            <Item icon={val.icon} text={val.name} notify={val.notify} />
          </List>
        );
      })}
    </>
  );
};

export default User;
