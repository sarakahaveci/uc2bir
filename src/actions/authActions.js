import { HTTP_REQUEST, LOGIN, FORGOT_PASSWORD } from '../constants';

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

export const forgot_password = (
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

export const reset_password = (
  {
    email,
    code,
    password,
    password_retry
  },
  successCallback,
  errorCallback
) => async (dispatch) => {
  const url = '/password-reset';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: FORGOT_PASSWORD,
      body: {
        email,
        code,
        password,
        password_retry
      },
      transformData: (data) => data.data,
      callBack: () => successCallback(),
      errorHandler: () => errorCallback(),
    },
  });
};