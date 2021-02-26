import {
  HTTP_REQUEST,
  GET_MY_PROFILE_FILES,
  SET_PROFILE_UPDATE,
  GET_PROFILE_UPDATE,
  UPDATE_FILE,
} from '../constants';

export const getMyProfileFiles = () => async (dispatch, getState) => {
  const url = `/user/profile/my-files`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_MY_PROFILE_FILES,
      transformData: (data) => data.data,
    },
  });
};

export const updateFile = (fileId, fileName, successCallback) => async (
  dispatch,
  getState
) => {
  const url = `/user/profile/file-update`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      body: {
        id: fileId,
        name: fileName,
      },
      url,
      label: UPDATE_FILE,
      transformData: (data) => data.data,
      callBack: successCallback,
    },
  });
};

export const setProfile = (
  { name, title, birthday, genre, about },
  successCallback,
  errorCallback
) => async (dispatch) => {
  const url = '/user/profile/detail';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: SET_PROFILE_UPDATE,
      body: {
        name,
        title,
        birthday,
        genre,
        about,
      },
      transformData: (data) => data.data,
      callBack: () => successCallback(),
      errorHandler: (error) => errorCallback(error.message),
    },
  });
};

export const getProfile = (successCallback, errorCallback) => async (
  dispatch,
  getState
) => {
  const url = `/user/profile/detail`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_PROFILE_UPDATE,
      transformData: (data) => data.data,
      callBack: () => successCallback(),
      errorHandler: () => errorCallback(),
    },
  });
};
