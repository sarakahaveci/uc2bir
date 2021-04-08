import axios from 'axios';

import { HTTP_REQUEST } from '../constants';

const baseUrl = process.env.REACT_APP_API_URL;

export default ({ getState }) => (next) => async ({ payload = {}, type }) => {
  const {
    body = null,
    headers = {
      'Accept-Language': navigator.language || navigator.userLanguage,
    },
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

  const { isAuthenticated, accessToken } = getState().auth || {};

  if (isAuthenticated) {
    headers.Authorization = `Bearer ${accessToken}`;
    //Accept-Language = tr
  }

  next({
    type: `${label}_REQUEST`,
  });

  try {
    const options = {
      url,
      baseURL: baseUrl,
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
    const enhancedError = {
      ...error?.response?.data,
      message: error?.response?.data?.message,
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
