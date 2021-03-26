// @ts-nocheck
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import User from './distribution/User';
import Pt from './distribution/Pt';
import Gym from './distribution/Gym';
import Dietitian from './distribution/Dietitian';
import NoUser from './distribution/NoUser';

import * as KEYS from '../../constants/userKeys';

import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { getUserKeys, logOut } from 'actions';

import { useHistory } from 'react-router-dom';

const HeaderLogin = ({ type_id, user }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    userKeys: { data: userKeys, isSuccess }
  } = useSelector((state) => state.registerData);

  const [type, setType] = useState([]);

  useEffect(() => {
    if ( isSuccess ) {
      setType(userKeys.filter((f) => f.id === type_id ));
    }
  },[isSuccess]);

  const actionRegisterData = () => {
    dispatch(getUserKeys());
  };
  
  useEffect(() => {
    actionRegisterData();
  },[]);

  const logOutAction = async () => {
    await dispatch(logOut());
    if ( !localStorage.getItem("user") ) {
      history.push("/login");
    }
  };

  switch (type[0]?.key) {
    case KEYS.USER:
      return (
        <Section>
          <User
            user_id={user.id}
            user_name={user.name}
            user_img={user.img}
            logOutAction={logOutAction}
          />
        </Section>
      );

    case KEYS.PT:
      return (
        <Section>
          <Pt
            user_id={user.id}
            user_name={user.name}
            user_img={user.img}
            logOutAction={logOutAction}
          />
        </Section>
      );

    case KEYS.GYM:
      return (
        <Section>
          <Gym
            user_id={user.id}
            user_name={user.name}
            user_img={user.img}
            logOutAction={logOutAction}
          />
        </Section>
      );

    case KEYS.DIETIAN:
      return (
        <Section>
          <Dietitian
            user_id={user.id}
            user_name={user.name}
            user_img={user.img}
            logOutAction={logOutAction}
          />
        </Section>
      );

    default:
      return (
        <Section>
          <NoUser
            user_id={user.id}
            user_name={user.name}
            user_img={user.img}
            logOutAction={logOutAction}
          />
        </Section>
      );
  }
};

const Section = styled.section`
  display: flex;
  padding: 0;
  width: 100%;
  flex-wrap: wrap;
  transition: all 0.5s cubic-bezier(1, 0, 0, 0.99);
`;

HeaderLogin.propTypes = {
  info: PropTypes.object.isRequired,
  type_id: PropTypes.number,
};

export default HeaderLogin;
