// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';

import Svg from 'components/statics/svg';
import List from '../List';
import Item from '../Item';
import ROLE from 'constants/role';

const Dietitian = ({ user_name, user_id, user_img = null, logOutAction }) => {
  const notification = [
    {
      name: '1. Bildirim',
      link: `/profile/${user_id}`,
    },
    {
      name: '2. Bildirim',
      link: `/profile/${user_id}`,
    },
    {
      name: '3. Bildirim',
      link: `/profile/${user_id}`,
    },
  ];

  const menu = [
    {
      name: 'Profilim',
      icon: <Svg.UsernameIcon />,
      link: ROLE.DIETIAN.link,
    },
    {
      name: 'Paketlerim',
      icon: <Svg.Packet />,
      link: `/profile/${user_id}`,
    },
    {
      name: 'Oturum Türleri & Çalıştığım Yerler',
      icon: <Svg.PtHome />,
      link: `/profile/${user_id}`,
    },
    {
      name: 'Ücretlerim',
      icon: <Svg.Monies />,
      link: `/profile/${user_id}`,
    },
    {
      name: 'Uzmanlıklarım',
      icon: <Svg.Expert />,
      link: `/profile/${user_id}`,
    },
    {
      name: 'Cüzdanım',
      icon: <Svg.Wallet />,
      link: `/profile/${user_id}`,
    },
    {
      name: 'Galeri',
      icon: <Svg.Gallery />,
      link: `/profile/${user_id}`,
    },
    {
      name: 'Blog',
      icon: <Svg.Blog />,
      link: `/profile/${user_id}`,
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
      name: 'Rezervasyonlarım',
      icon: <Svg.Date />,
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

Dietitian.propTypes = {
  user_name: PropTypes.string,
  user_id: PropTypes.number,
};

export default Dietitian;
