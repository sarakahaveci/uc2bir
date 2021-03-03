import {
  HTTP_REQUEST,
  GET_MY_PROFILE_FILES,
  SET_PROFILE_UPDATE,
  GET_PROFILE_UPDATE,
  UPDATE_FILE,
  SET_PASSWORD_UPDATE,
  GET_ACTIVITY_LIST,
  UPDATE_ACTIVITY,
  GET_ALL_ACTIVITY_LIST,
  ADD_NEW_ACTIVITY,
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
  { ...data },
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
        ...data,
      },
      transformData: (data) => data.data,
      callBack: () => successCallback(),
      errorHandler: (error) => errorCallback(error.message),
    },
  });
};

export const setPassword = (
  { password, new_password, new_password_confirmation },
  successCallback,
  errorCallback
) => async (dispatch) => {
  const url = '/user/profile/password';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: SET_PASSWORD_UPDATE,
      body: {
        password,
        new_password,
        new_password_confirmation,
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

export const getWorkPlaceActivityList = () => async (dispatch, getState) => {
  const url = `/user/my-class`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_ACTIVITY_LIST,
      transformData: (data) => data.data,
    },
  });
};

export const getAllActivityList = () => async (dispatch, getState) => {
  const url = `/cms/activity-field/all`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_ALL_ACTIVITY_LIST,
      transformData: (data) => data.data,
    },
  });
};

export const updateWorkPlaceActivity = (
  { capacity, price, id },
  successCallback,
  errorCallback
) => async (dispatch, getState) => {
  const url = `/user/my-class/${id}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'PUT',
      url,
      body: { capacity, price, branch: [id] },
      label: UPDATE_ACTIVITY,
      transformData: (data) => data.data,
      callBack: () => {
        successCallback();
        getWorkPlaceActivityList();
      },
      errorHandler: (error) => errorCallback(error.message),
    },
  });
};

export const addWorkPlaceActivity = (
  { activityIds },
  successCallback,
  errorCallback
) => async (dispatch) => {
  const url = '/user/my-class';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: ADD_NEW_ACTIVITY,
      body: { activity_field: activityIds },
      callBack: () => successCallback(),
      errorHandler: (error) => errorCallback(error.message),
    },
  });
};
