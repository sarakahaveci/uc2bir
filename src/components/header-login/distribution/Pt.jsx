// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';

import Svg from 'components/statics/svg';
import List from '../List';
import Item from '../Item';
import ROLE from 'constants/role';
import TABS from 'constants/tabUri';

const Pt = ({ user_name, user_id, user_img = null, logOutAction }) => {
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
      link: ROLE.PT.link,
    },
    {
      name: 'Paketlerim',
      icon: <Svg.Packet />,
      link: `${ROLE.PT.link.pathname}${TABS.packets}`,
    },
    {
      name: 'Oturum Türleri & Çalıştığım Yerler',
      icon: <Svg.PtHome />,
      link: `${ROLE.PT.link.pathname}${TABS.sessiontype}`,
    },
    {
      name: 'Branşlarım & Ücretlerim',
      icon: <Svg.PtBranch />,
      link: `${ROLE.PT.link.pathname}${TABS.branch}`,
    },
    {
      name: 'Uzmanlıklarım',
      icon: <Svg.Expert />,
      link: `${ROLE.PT.link.pathname}${TABS.expert}`,
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
      name: 'Blog',
      icon: <Svg.Blog />,
      link: `${ROLE.PT.link.pathname}${TABS.blog}`,
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

Pt.propTypes = {
  user_name: PropTypes.string,
  user_id: PropTypes.number,
};

export default Pt;
