// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';

import Svg from 'components/statics/svg';
import List from '../List';
import Item from '../Item';

import { useDispatch } from 'react-redux';
import { logOut } from 'actions';

const Individual = ({ user_name, user_img = null }) => {
  const dispatch = useDispatch();

  const logOutAction = () => {
    dispatch(logOut());
  };

  const menu = [
    {
      name: 'Profilim',
      icon: <Svg.UsernameIcon />,
    },
    {
      name: 'Rezervasyonlarım',
      icon: <Svg.Date />,
      tabs: [
        {
          name: 'Tab 1',
        },
        {
          name: 'Tab 2',
          tabs: [
            {
              name: 'Tab 1',
            },
            {
              name: 'Tab 2',
            },
          ],
        },
        {
          name: 'Tab 3',
        },
      ],
    },
    {
      name: 'Paketlerim',
      icon: <Svg.Packet />,
    },
    {
      name: 'Cüzdanım',
      icon: <Svg.Wallet />,
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
      notify: [],
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
      drop: [],
      menu: [...menu],
    },
  ];

  return (
    <>
      {list.map((val, key) => {
        return (
          <List key={key} className="header-login" dropDown={val?.menu}>
            <Item icon={val.icon} span={val.name} notify={val.notify?.length} />
          </List>
        );
      })}
    </>
  );
};

Individual.propTypes = {
  user_name: PropTypes.string,
};

export default Individual;
