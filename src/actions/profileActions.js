import {
  HTTP_REQUEST,
  PROFILE,
  GET_PROFILE_INFO,
  UPDATE_USER_ADDRESS,
} from '../constants';

export const profile = ({}, successCallback, errorCallback) => async (
  dispatch
) => {
  const url = '/user/profile';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: PROFILE,
      transformData: (data) => data.data,
      callBack: () => successCallback(),
      errorHandler: () => errorCallback(),
    },
  });
};

export const getProfileInformation = () => async (dispatch) => {
  const url = '/user/profile/information';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_PROFILE_INFO,
      transformData: (data) => data.data,
    },
  });
};

export const updateUserAdress = (
  profileId,
  body,
  successCallback,
  errorCallback
) => async (dispatch) => {
  const url = `/user/address/${profileId}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'PUT',
      url,
      body,
      label: UPDATE_USER_ADDRESS,
      callBack: () => successCallback(),
      errorHandler: () => errorCallback(),
      transformData: (data) => data.data,
    },
  });
};
