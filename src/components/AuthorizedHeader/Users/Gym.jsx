import React from 'react';

import Svg from 'components/statics/svg';
import List from '../HeaderList';
import Item from '../HeaderItem';
import TABS from 'constants/tabUri';

const Gym = ({ user_name, user_img = null, logoutHandler }) => {
  const userDependentMenu = [
    {
      name: 'Profilim',
      icon: <Svg.UsernameIcon />,
      link: TABS.profileDetailPath,
      pulse: true,
    },
    {
      name: 'Olanaklar',
      icon: <Svg.TickTick />,
      link: TABS.facilityPath,
    },
    {
      name: 'Faaliyet Alanları',
      icon: <Svg.PtHome />,
      link: TABS.activityPath,
    },
    {
      name: 'Eğitmenler',
      icon: <Svg.PeopleGroups />,
      link: TABS.trainersPath,
    },
    /*   {
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

export default Gym;
