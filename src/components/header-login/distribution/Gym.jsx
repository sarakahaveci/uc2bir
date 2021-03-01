// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';

import Svg from 'components/statics/svg';
import List from '../List';
import Item from '../Item';

import { useDispatch } from 'react-redux';
import { logOut } from 'actions';
import ROLE from 'constants/role';

const Gym = ({ user_name, user_id, user_img = null }) => {
  const dispatch = useDispatch();

  const logOutAction = () => {
    dispatch(logOut());
  };

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
      link: ROLE.GYM.link,
    },
    {
      name: 'Olanaklar',
      icon: <Svg.TickTick />,
      link: `/profile/${user_id}`,
    },
    {
      name: 'Branşlarım & Ücretlerim',
      icon: <Svg.PtHome />,
      link: `/profile/${user_id}`,
    },
    {
      name: 'Sınıf & Kontenjan',
      icon: <Svg.UsersGym />,
      link: `/profile/${user_id}`,
    },
    {
      name: 'Eğitmenler',
      icon: <Svg.PeopleGroups />,
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
