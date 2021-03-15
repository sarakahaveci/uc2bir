// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';

import Svg from 'components/statics/svg';
import List from '../List';
import Item from '../Item';
import ROLE from 'constants/role';
import TABS from 'constants/tabUri';

const User = ({ user_name, user_id, user_img = null, logOutAction }) => {
  const notification = [
    {
      name: '1. Bildirim',
      link: `${ROLE.PT.link.pathname}${TABS.notification}`,
    },
    {
      name: '2. Bildirim',
      link: `${ROLE.PT.link.pathname}${TABS.notification}`,
    },
    {
      name: '3. Bildirim',
      link: `${ROLE.PT.link.pathname}${TABS.notification}`,
    },
  ];

  const menu = [
    {
      name: 'Profilim',
      icon: <Svg.UsernameIcon />,
      // It will be updated
      link: ROLE.USER.link,
    },
    {
      name: 'Rezervasyonlarım',
      icon: <Svg.Date />,
      link: `${ROLE.USER.link.pathname}${TABS.reservations}`,
    },
    {
      name: 'Paketlerim',
      icon: <Svg.Packet />,
      link: `${ROLE.USER.link.pathname}${TABS.packets}`,
    },
    {
      name: 'Cüzdanım',
      icon: <Svg.Wallet />,
      link: `${ROLE.USER.link.pathname}${TABS.wallet}`,
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
    },
    {
      name: 'Mesajlarım',
      icon: <Svg.CommentBlack />,
      notify: [],
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

  return (
    <>
      {list.map((val, key) => {
        return (
          <List
            key={key}
            className="header-login"
            dropDown={val.menu || val.notify}
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
