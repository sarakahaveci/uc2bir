import React from 'react';

import Svg from 'components/statics/svg';
import List from '../HeaderList';
import Item from '../HeaderItem';
import TABS from 'constants/tabUri';

const Pt = ({ user_name, user_img = null, logoutHandler }) => {
  const userDependentMenu = [
    {
      name: 'Profilim',
      icon: <Svg.UsernameIcon />,
      link: TABS.profileDetailPath,
      pulse: true,
    },

       {
      name: 'Paketlerim',
      icon: <Svg.Packet />,
      link: TABS.packetsPath,
    },
    {
      name: 'Oturum Türleri & Çalıştığım Yerler',
      icon: <Svg.PtHome />,
      link: TABS.sessiontypePath,
    },
    {
      name: 'Branşlarım & Ücretlerim',
      icon: <Svg.PtBranch />,
      link: TABS.branchPath,
    },
    {
      name: 'Uzmanlıklarım',
      icon: <Svg.Expert />,
      link: TABS.specialtiesPath,
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
      name: 'Blog',
      icon: <Svg.Blog />,
      link: TABS.blogPath,
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
      notify: [],
      linkPath: TABS.notificationPath,
    },
    {
      name: 'Mesajlarım',
      icon: <Svg.CommentBlack />,
      pulse: true,
      notify: [],
      linkPath: TABS.proMessagesPath,
    },
    {
      name: 'Rezervasyonlarım',
      icon: <Svg.Date />,
      notify: [],
      linkPath: TABS.reservationsPath,
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
            <Item
              icon={val.icon}
              text={val.name}
              notify={val.notify?.length}
              pulse={val.pulse}
            />
          </List>
        );
      })}
    </>
  );
};

export default Pt;
