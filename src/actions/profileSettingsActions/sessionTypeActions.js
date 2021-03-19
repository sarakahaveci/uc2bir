import {
  HTTP_REQUEST,
  ADD_TYPE_CREATE,
  GET_TYPES,
  SESSIONTYPE_ADD_ADDRESS,
  SESSIONTYPE_GET_ADDRESS,
  ADD_TYPE_ADDRESS_DELETE,
  SESSIONTYPE_GET_GYM_LIST,
  SESSIONTYPE_ADD_GYM,
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

export const deleteAddressList = (
  id,
  successCallback,
  errorCallback
) => async (dispatch, getState) => {
  const url = `/user/address/${id}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'DELETE',
      url,
      label: ADD_TYPE_ADDRESS_DELETE,
      callBack: () => successCallback(),
      errorHandler: (error) => errorCallback(error?.message),
      transformData: (data) => data.data,
    },
  });
};

export const getGymList = (
  successCallback,
  errorCallback
) => async (dispatch, getState) => {
  const url = `/user/working-area/gym/2`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: SESSIONTYPE_GET_GYM_LIST,
      callBack: () => successCallback(),
      errorHandler: (error) => errorCallback(error?.message),
      transformData: (data) => data.data,
    },
  });
};

export const addGym = (
  { ...data },
  successCallback,
  errorCallback
) => async (dispatch, getState) => {
  const url = `/user/address/add-working-gym`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      body: { ...data },
      label: SESSIONTYPE_ADD_GYM,
      callBack: () => successCallback(),
      errorHandler: (error) => errorCallback(error?.message),
      transformData: (data) => data.data,
    },
  });
};