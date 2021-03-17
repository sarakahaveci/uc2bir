import {
  HTTP_REQUEST,
  ADD_TYPE_CREATE,
  GET_TYPES,
  SESSIONTYPE_ADD_ADDRESS,
  SESSIONTYPE_GET_ADDRESS,
} from '../../constants';

export const getTypes = () => async (dispatch, getState) => {
  const url = `user/profile/session-type`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_TYPES,
      transfomrData: (data) => data.data,
    },
  });
};

export const createTypes = (
  { ...data },
  successCallback,
  errorCallback
) => async (dispatch, getState) => {
  const url = `/user/profile/session-type`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      body: { ...data },
      label: ADD_TYPE_CREATE,
      callBack: () => successCallback(),
      errorHandler: (error) => errorCallback(error?.message),
      transformData: (data) => data.data,
    },
  });
};

export const addAddress = (
  { ...data },
  successCallback,
  errorCallback
) => async (dispatch, getState) => {
  const url = `/user/address`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      body: { ...data },
      label: SESSIONTYPE_ADD_ADDRESS,
      callBack: () => successCallback(),
      errorHandler: (error) => errorCallback(error?.message),
      transformData: (data) => data.data,
    },
  });
};

export const getAddressList = (
  successCallback,
  errorCallback
) => async (dispatch, getState) => {
  const url = `/user/address`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: SESSIONTYPE_GET_ADDRESS,
      callBack: () => successCallback(),
      errorHandler: (error) => errorCallback(error?.message),
      transformData: (data) => data.data,
    },
  });
};