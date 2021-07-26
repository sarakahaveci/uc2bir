import React, { useEffect, useState } from 'react';

import Svg from 'components/statics/svg';
import List from '../HeaderList';
import Item from '../HeaderItem';
import TABS from 'constants/tabUri';
import { useSelector } from 'react-redux';
import defaultImage from '../../../assets/default-profile.jpg'
const Dietitian = ({ user_name, user_img = null, logoutHandler }) => {
  const { data: allRooms } = useSelector(
    (state) => state.profileSettings2.messages.rooms
  );
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(allRooms?.filter(value => value.unread_messages === 1).length);

  }, [allRooms]);
  const userDependentMenu = [
    {
      name: 'Profilim',
      icon: <Svg.UsernameIcon />,
      link: TABS.profileDetailPath,
      pulse: true,
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
      notify: count,
      linkPath: TABS.proMessagesPath,
    },
    {
      name: 'Rezervasyonlarım',
      icon: <Svg.Date />,
      notify: [],
      linkPath: TABS.reservationsPath,
    },
    {
      pulse: true,
      name: user_name,
      icon: user_img ? <img style={{objectFit:'cover'}} src={user_img}/> : <img style={{objectFit:'cover'}}  src={defaultImage}/>,
      menu: userDependentMenu,
      isUserMenu:true

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
              notify={val.notify}
              pulse={val.pulse}
              isUserMenu={val?.isUserMenu}

            />
          </List>
        );
      })}
    </>
  );
};

export default Dietitian;
