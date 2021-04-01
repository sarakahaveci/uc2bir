// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';

import Svg from 'components/statics/svg';
import List from '../List';
import Item from '../Item';
import TABS from 'constants/tabUri';

const Dietitian = ({ user_name, user_img = null, logOutAction }) => {
  const notification = [];

  const menu = [
    {
      name: 'Profilim',
      icon: <Svg.UsernameIcon />,
      link: TABS.profilePath,
    },
    /*    {
      name: 'Paketlerim',
      icon: <Svg.Packet />,
      link: TABS.packetsPath,
    }, */
    {
      name: 'Oturum Türleri & Çalıştığım Yerler',
      icon: <Svg.PtHome />,
      link: TABS.sessiontypePath,
    },
    {
      name: 'Ücretlerim',
      icon: <Svg.Monies />,
      link: TABS.pricePath,
    },
    {
      name: 'Uzmanlıklarım',
      icon: <Svg.Expert />,
      link: TABS.specialtiesPath,
    },
    /*    {
      name: 'Cüzdanım',
      icon: <Svg.Wallet />,
      link: TABS.walletPath,
    }, */
    {
      name: 'Galeri',
      icon: <Svg.Gallery />,
      link: TABS.galleryPath,
    },
    {
      name: 'Blog',
      icon: <Svg.Blog />,
      link: TABS.blogPath,
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
      linkPath: TABS.proMessagesPath,
    },
    /*    {
      name: 'Rezervasyonlarım',
      icon: <Svg.Date />,
      notify: [],
      linkPath: TABS.reservationsPath,
    }, */
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
            <Item icon={val.icon} text={val.name} notify={val.notify?.length} />
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
