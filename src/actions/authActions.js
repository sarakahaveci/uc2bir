import {
  HTTP_REQUEST,
  LOGIN,
  FORGOT_PASSWORD,
  USER_DETAILS_SET_FROM_STORAGE,
  SOCIAL_LOGIN,
  LOGOUT,
  RESET_PASSWORD,
  USER_INFORMATION,
} from '../constants';
import { localStorage } from 'utils';

export const login = (
  { email, password },
  successCallback,
  errorCallback
) => async (dispatch) => {
  const url = '/login';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: LOGIN,
      body: {
        email,
        password,
      },
      transformData: (data) => data.data,
      callBack: () => successCallback(),
      errorHandler: () => errorCallback(),
    },
  });
};

export const logOut = () => (dispatch, getState) => dispatch({type: LOGOUT});

export const forgotPassword = (
  { email },
  successCallback,
  errorCallback
) => async (dispatch) => {
  const url = '/forgot-password';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: FORGOT_PASSWORD,
      body: {
        email,
      },
      transformData: (data) => data.data,
      callBack: () => successCallback(),
      errorHandler: () => errorCallback(),
    },
  });
};

export const resetPassword = (
  { email, code, password, password_retry },
  successCallback,
  errorCallback
) => async (dispatch) => {
  const url = '/password-reset';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: RESET_PASSWORD,
      body: {
        email,
        code,
        password,
        password_retry,
      },
      transformData: (data) => data.data,
      callBack: () => successCallback(),
      errorHandler: () => errorCallback(),
    },
  });
};

export const information = () => async (
  dispatch
) => {
  const url = '/user/profile/information';
  const { accessToken, refreshToken } = localStorage.get('auth') || {};

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: USER_INFORMATION,
      transformData: (data) => {
        return {
          user: data.data,
          token: accessToken,
          refresh_token: refreshToken,
          type_id: data.data?.type?.id,
        };
      },
    },
  });
};

export const setUserDetailsFromStorage = () => (dispatch, getState) => {
  const { user, accessToken, refreshToken } = localStorage.get('auth') || {};

  if (user) {
    dispatch({
      type: USER_DETAILS_SET_FROM_STORAGE,
      payload: {
        user,
        accessToken,
        refreshToken,
      },
    });
  }
};

export const socialLogin = (user, successCallback) => async (
  dispatch,
  getState
) => {
  const url = '/social-login';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: SOCIAL_LOGIN,
      transformData: (data) => data.data,
      callBack: () => successCallback(),
      body: user,
    },
  });
};
