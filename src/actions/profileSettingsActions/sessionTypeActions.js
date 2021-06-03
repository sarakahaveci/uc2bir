/* eslint-disable no-unused-vars */

import {
  HTTP_REQUEST,
  ADD_TYPE_CREATE,
  GET_TYPES,
  SESSIONTYPE_ADD_ADDRESS,
  SESSIONTYPE_GET_ADDRESS,
  ADD_TYPE_ADDRESS_DELETE,
  SESSIONTYPE_GET_GYM_LIST,
  SESSIONTYPE_ADD_GYM,
  REMOVE_GTM_FROM_PT,
  SEARCH_GYM_FOR_PT,
  ADD_GTM_FROM_PT,
  SEARCH_PROFESSIONAL,
} from '../../constants';
import { toast } from 'react-toastify';

export const getSessionTypes = () => async (dispatch, getState) => {
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
  successCallback = () => { },
  errorCallback = () => { }
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

export const deleteAddressList = (id, successCallback, errorCallback) => async (
  dispatch,
  getState
) => {
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

export const getGymList = () => async (dispatch, getState) => {
  const url = `/user/working-area/gym`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: SESSIONTYPE_GET_GYM_LIST,

      transformData: (data) => data.data,
    },
  });
};

export const addGym = ({ ...data }, successCallback, errorCallback) => async (
  dispatch,
  getState
) => {
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

export const removeGymFromPt = (data) => async (dispatch, getState) => {
  const url = `/user/address/remove-working-gym`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      body: { gym: data },
      label: REMOVE_GTM_FROM_PT,
      callBack: () => {
        toast.success('Spor alanı başarı ile kaldırıldı.', {
          position: 'bottom-right',
          delay: 2500,
        });
        dispatch(getGymList());
      },
      errorHandler: (error) =>
        toast.error(error.message, { position: 'bottom-right', delay: 2500 }),
    },
  });
};

export const addGymFromPt = (id, successCallback) => async (
  dispatch,
  getState
) => {
  const url = `/user/address/add-working-gym`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      body: { gym: [id] },
      label: ADD_GTM_FROM_PT,
      callBack: () => {
        toast.success('Spor alanı başarı ile eklendi', {
          position: 'bottom-right',
          delay: 2500,
        });
        successCallback();
      },
      errorHandler: (error) =>
        toast.error(error.message, { position: 'bottom-right', delay: 2500 }),
    },
  });
};

export const searchGymForPt = (title = false, page,location,branch) => async (dispatch) => {
  let url = `/user/address/search-gym`;
  let extras = '?';
  if (title) extras += `title=${title}&`;
  if (page) extras += `page=${page}&`;
  if (location) extras += `location=${location}&`;
  if (branch) extras += `branch=${branch}&`;

  url += extras;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url: url,
      label: SEARCH_GYM_FOR_PT,
      transformData: (data) => data.data,
      errorHandler: (error) =>
        toast.error(error.message, { position: 'bottom-right', delay: 2500 }),
    },
  });
};

export const searchGymWithDetail = (
  title = false,
  page = 0,
  location = false,
  branch = false
) => async (dispatch) => {
  //const urlForAllGymList = `/user/address/search-gym?page=${page}`;
  let url = '/user/address/detail-search-gym';
  let extras = '?';
  if (title) extras += `title=${title}&`;
  if (location) extras += `location=${location}&`;
  if (branch) extras += `branch=${branch}&`;
  url += extras;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url: url,
      label: SEARCH_PROFESSIONAL,
      transformData: (data) => data.data,
      errorHandler: (error) =>
        toast.error(error.message, { position: 'bottom-right', delay: 2500 }),
    },
  });
};
