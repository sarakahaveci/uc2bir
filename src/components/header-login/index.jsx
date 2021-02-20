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
import { getRegisterData } from '../../actions';

const HeaderLogin = ({ type_id, user }) => {
  const { data: registerData, isSuccess } = useSelector(
    (state) => state.registerData
  );

  const err = () => {
    console.log("err");
  };

  const actionRegisterData = () => {
    dispatch(getRegisterData(err));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    actionRegisterData();
  },[]);

  const [type, setType] = useState([]);
  useEffect(() => {
    if ( isSuccess ) {
      setType(registerData['user-type'].filter((f) => f.id === type_id ));
    }
  },[isSuccess]);

  switch (type[0]?.key) {
    case KEYS.USER:
      return (
        <Section>
          <User
            user_id={user.id}
            user_name={user.name}
            user_img={user.img}
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
          />
        </Section>
      );
  }
};

const Section = styled.section`
  display: flex;
  padding: 0;d
  width: 100%;
  flex-wrap: wrap;
  transition: all 0.5s cubic-bezier(1, 0, 0, 0.99);
`;

HeaderLogin.propTypes = {
  info: PropTypes.object.isRequired,
  type_id: PropTypes.number,
};

export default HeaderLogin;
