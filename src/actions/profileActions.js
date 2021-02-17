import { HTTP_REQUEST, PROFILE, GET_USER_CERTIFICATE } from '../constants';

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

export const getUserCertificate = (
  profileId,
  successCallback,
  errorCallback
) => async (dispatch, getState) => {
  const url = `/user/view/certificate/${profileId}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_USER_CERTIFICATE,
      transformData: (data) => data.data,
      callBack: () => successCallback(),
      errorHandler: () => errorCallback(),
    },
  });
};
