// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';

import Svg from 'components/statics/svg';
import List from '../List';
import Item from '../Item';
import TABS from 'constants/tabUri';

const User = ({ user_name, user_img = null, logOutAction }) => {
  const notification = [];

  const menu = [
    {
      name: 'Profilim',
      icon: <Svg.UsernameIcon />,
      // It will be updated
      link: TABS.profilePath,
    },
    {
      name: 'Rezervasyonlarım',
      icon: <Svg.Date />,
      link: TABS.reservationsPath,
    },
    {
      name: 'Paketlerim',
      icon: <Svg.Packet />,
      link: TABS.profilePath,
    },
    {
      name: 'Cüzdanım',
      icon: <Svg.Wallet />,
      link: TABS.walletPath,
    },
    {
      name: 'Çıkış Yap',
      icon: <Svg.Closed />,
      onClick: logOutAction,
    },
  ];

  const list = [
    {
      name: 'Bildirimler',
      icon: <Svg.Notification />,
      notify: [...notification],
      linkPath: TABS.notificationPath,
    },
    {
      name: 'Mesajlarım',
      icon: <Svg.CommentBlack />,
      notify: [],
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
      menu: [...menu],
    },
  ];

  // eslint-disable-next-line no-console
  console.log(list);

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
            <Item icon={val.icon} span={val.name} notify={val.notify?.length} />
          </List>
        );
      })}
    </>
  );
};

User.propTypes = {
  user_name: PropTypes.string,
  user_id: PropTypes.number,
};

export default User;
