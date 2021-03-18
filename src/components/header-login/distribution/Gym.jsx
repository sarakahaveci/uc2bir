// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';

import Svg from 'components/statics/svg';
import List from '../List';
import Item from '../Item';
import TABS from 'constants/tabUri';

const Gym = ({ user_name, user_img = null, logOutAction }) => {
  const notification = [
    {
      name: '1. Bildirim',
      link: TABS.notificationPath,
    },
    {
      name: '2. Bildirim',
      link: TABS.notificationPath,
    },
    {
      name: '3. Bildirim',
      link: TABS.notificationPath,
    },
  ];

  const menu = [
    {
      name: 'Profilim',
      icon: <Svg.UsernameIcon />,
      link: TABS.profilePath,
    },
    {
      name: 'Olanaklar',
      icon: <Svg.TickTick />,
      link: TABS.facilityPath,
    },
    {
      name: 'Branşlarım & Ücretlerim',
      icon: <Svg.PtHome />,
      link: TABS.branchPath,
    },
    {
      name: 'Eğitmenler',
      icon: <Svg.PeopleGroups />,
      link: TABS.trainersPath,
    },
    {
      name: 'Cüzdanım',
      icon: <Svg.Wallet />,
      link: TABS.walletPath,
    },
    {
      name: 'Galeri',
      icon: <Svg.Gallery />,
      link: TABS.galleryPath,
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
      linkPath: TABS.proMessagesPath,
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
            linkPath={val?.linkPath}
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
