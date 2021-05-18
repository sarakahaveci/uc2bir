import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { refreshLogin } from 'actions';

export default function Interceptor({ children }) {
  const { refreshToken } = useSelector((state) => state.auth);

  let history = useHistory();

  const dispatch = useDispatch();

  const redirectToLogin = () => {
    if (history.location.pathname !== '/login') {
      history.push('/login');
    }
  };

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      if (
        error.response &&
        error.response.status === 401 &&
        !history.location.pathname.startsWith('/login')
      ) {
        if (!refreshToken) {
          redirectToLogin();

          return;
        }

        dispatch(refreshLogin(redirectToLogin));
      } else {
        return error.response;
      }
    }
  );

  return <>{children}</>;
}
