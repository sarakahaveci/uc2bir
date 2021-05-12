import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getRooms, getUserKeys, logout } from 'actions';
import User from './Users/User';
import Pt from './Users/Pt';
import Gym from './Users/Gym';
import Dietitian from './Users/Dietitian';
import { DIETITIAN, WORK_PLACE, USER, PERSONAL_TRAINER } from '../../constants';

const HeaderLogin = ({ type_id, user }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const actionRegisterData = () => {
    dispatch(getUserKeys());
  };

  useEffect(() => {
    const isFirstTime = true;

    dispatch(getRooms(isFirstTime));
    actionRegisterData();
  }, []);

  const logoutHandler = () => {
    dispatch(logout());

    history.push('/login');
  };

  switch (type_id) {
    case USER:
      return (
        <Section>
          <User
            user_id={user.id}
            user_name={user.name}
            user_img={user.img}
            logoutHandler={logoutHandler}
          />
        </Section>
      );

    case PERSONAL_TRAINER:
      return (
        <Section>
          <Pt
            user_id={user.id}
            user_name={user.name}
            user_img={user.img}
            logoutHandler={logoutHandler}
          />
        </Section>
      );

    case WORK_PLACE:
      return (
        <Section>
          <Gym
            user_id={user.id}
            user_name={user.name}
            user_img={user.img}
            logoutHandler={logoutHandler}
          />
        </Section>
      );

    case DIETITIAN:
      return (
        <Section>
          <Dietitian
            user_id={user.id}
            user_name={user.name}
            user_img={user.img}
            logoutHandler={logoutHandler}
          />
        </Section>
      );

    default:
      return <> </>;
  }
};

const Section = styled.section`
  display: flex;
  padding: 0;
  width: 100%;
  flex-wrap: wrap;
  transition: all 0.5s cubic-bezier(1, 0, 0, 0.99);
`;

export default HeaderLogin;
