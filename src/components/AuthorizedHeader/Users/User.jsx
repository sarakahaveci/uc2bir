import React from 'react';

import Svg from 'components/statics/svg';
import List from '../HeaderList';
import Item from '../HeaderItem';
import TABS from 'constants/tabUri';

const User = ({ user_name, user_img = null, logoutHandler }) => {
  const userDependentMenu = [
    {
      name: 'Profilim',
      icon: <Svg.UsernameIcon />,
      // It will be updated
      link: TABS.profilePath,
      pulse: true,
    },
    /*   {
      name: 'Rezervasyonlarım',
      icon: <Svg.Date />,
      link: TABS.reservationsPath,
    }, */
    /*   {
      name: 'Paketlerim',
      icon: <Svg.Packet />,
      link: TABS.profilePath,
    }, */
    /*    {
      name: 'Cüzdanım',
      icon: <Svg.Wallet />,
      link: TABS.walletPath,
    }, */
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
      notify: [],
      linkPath: TABS.notificationPath,
    },
    {
      name: 'Mesajlarım',
      icon: <Svg.CommentBlack />,
      notify: [],
      pulse: true,
      linkPath: TABS.messagePath,
    },
    {
      name: 'Favorilerim',
      icon: <Svg.Heart />,
      notify: [],
    },
    {
      name: user_name,
      icon: user_img || <Svg.UsernameIcon />,
      menu: userDependentMenu,
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
            <Item icon={val.icon} text={val.name} notify={val.notify?.length} />
          </List>
        );
      })}
    </>
  );
};

export default User;
