import axios from 'axios';

import { HTTP_REQUEST } from '../constants';

const baseUrl = 'http://gateway.ms.321.4alabs.com';

export default ({ getState }) => (next) => async ({ payload = {}, type }) => {
  const {
    body = null,
    headers = {},
    label,
    method,
    transformData = (data) => data,
    callBack,
    errorHandler,
    url,
  } = payload || {};

  next({ payload, type });

  if (type !== HTTP_REQUEST) {
    return;
  }

  const { isAuthenticated } = getState().auth || {};

  if (isAuthenticated) {
    const userData = getState().auth.data;
    headers.Authorization = `Bearer ${userData.accessToken}`;
  }

  next({
    type: `${label}_REQUEST`,
  });

  try {
    const options = {
      url,
      baseUrl,
      headers,
      method,
      data: body,
    };

    const res = await axios(options);

    const { data } = res;

    if (res.status >= 400) {
      // eslint-disable-next-line no-throw-literal
      throw { ...data, response: { status: res.status } };
    }

    // eslint-disable-next-line consistent-return
    next({
      type: `${label}_SUCCESS`,
      payload: transformData(data),
    });

    if (typeof callBack === 'function') {
      callBack(data);
    }
  } catch (error) {
    console.error('error', error?.message);

    if (error?.response?.status === 401) {
      // TODO: Set Authorization Process
      console.error('error', error?.message);
    }

    const enhancedError = {
      ...error,
      message: error.message,
    };

    if (typeof errorHandler === 'function') {
      errorHandler(enhancedError);
    }

    // eslint-disable-next-line consistent-return
    return next({
      type: `${label}_FAILURE`,
      payload: enhancedError,
    });
  }
};
