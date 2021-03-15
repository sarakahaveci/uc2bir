// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';

import Svg from 'components/statics/svg';
import List from '../List';
import Item from '../Item';
import ROLE from 'constants/role';
import TABS from 'constants/tabUri';

const Gym = ({ user_name, user_id, user_img = null, logOutAction }) => {
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
      link: ROLE.GYM.link,
    },
    {
      name: 'Olanaklar',
      icon: <Svg.TickTick />,
      link: `${ROLE.PT.link.pathname}${TABS.possibilities}`,
    },
    {
      name: 'Branşlarım & Ücretlerim',
      icon: <Svg.PtHome />,
      link: `${ROLE.PT.link.pathname}${TABS.wages}`,
    },
    {
      name: 'Sınıf & Kontenjan',
      icon: <Svg.UsersGym />,
      link: `${ROLE.PT.link.pathname}${TABS.class}`,
    },
    {
      name: 'Eğitmenler',
      icon: <Svg.PeopleGroups />,
      link: `${ROLE.PT.link.pathname}${TABS.groups}`,
    },
    {
      name: 'Cüzdanım',
      icon: <Svg.Wallet />,
      link: `${ROLE.PT.link.pathname}${TABS.wallet}`,
    },
    {
      name: 'Galeri',
      icon: <Svg.Gallery />,
      link: `${ROLE.PT.link.pathname}${TABS.gallery}`,
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

Gym.propTypes = {
  user_name: PropTypes.string,
  user_id: PropTypes.number,
};

export default Gym;
