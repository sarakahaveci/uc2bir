import {
  HTTP_REQUEST,
  SET_PROFILE_UPDATE,
  GET_PROFILE_UPDATE,
  SET_PASSWORD_UPDATE,
  GET_ACTIVITY_LIST,
  UPDATE_ACTIVITY,
  GET_ALL_ACTIVITY_LIST,
  ADD_NEW_ACTIVITY,
  GET_PT_BRANCH,
  GET_PT_ALL_BRANCH,
  ADD_NEW_PT_BRANCH,
  UPDATE_PT_BRANCH,
  GET_MY_GALLERIES,
  GET_VKI,
  SET_VKI,
  GET_TEST,
  GET_MY_BLOGS,
} from '../constants';
import { information } from './authActions';

export const getMyGalleries = () => async (dispatch, getState) => {
  const url = `/user/gallery/index/me`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_MY_GALLERIES,
      transfomrData: (data) => data.data,
    },
  });
};

export const getMyBlogs = () => async (dispatch, getState) => {
  const url = `/cms/blog/mine`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_MY_BLOGS,
      transfomrData: (data) => data.data,
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
      callBack: () => {
        dispatch(information());
        return successCallback();
      },
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

export const getTest = (successCallback, errorCallback) => async (
  dispatch,
  getState
) => {
  const url = `/user/profile/completed-survey`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_TEST,
      transformData: (data) => data.data,
      callBack: () => successCallback(),
      errorHandler: () => errorCallback(),
    },
  });
};

export const getVKI = (successCallback, errorCallback) => async (
  dispatch,
  getState
) => {
  const url = `/user/profile/vki`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_VKI,
      transformData: (data) => data.data,
      callBack: () => successCallback(),
      errorHandler: () => errorCallback(),
    },
  });
};

export const setVKI = (
  { ...data },
  successCallback,
  errorCallback
) => async (dispatch) => {
  const url = '/user/profile/vki';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: SET_VKI,
      body: { ...data },
      transformData: (data) => data.data,
      callBack: () => successCallback(),
      errorHandler: (error) => errorCallback(error.message),
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
  { capacity, price, id, branch },
  successCallback,
  errorCallback
) => async (dispatch, getState) => {
  const url = `/user/my-class/${id}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'PUT',
      url,
      body: { capacity, price, branch },
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

export const getAllPTBranchList = () => async (dispatch, getState) => {
  const url = `/cms/branch/all?type=pt&parent_id=0&status=active`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_PT_ALL_BRANCH,
      transformData: (data) => data.data,
    },
  });
};

export const getUserPTBranchList = () => async (dispatch, getState) => {
  const url = `/user/pt-price`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_PT_BRANCH,
      transformData: (data) => data.data,
    },
  });
};

export const addNewPTBranch = (body, successCallback, errorCallback) => async (
  dispatch
) => {
  const url = '/user/pt-price/branch';

  let data = {};
  if (body.branch) {
    data.branch = body.branch;
  }
  if (body.branch_suggest) {
    data.branch_suggest = body.branch_suggest;
  }
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: ADD_NEW_PT_BRANCH,
      body: data,
      callBack: () => {
        successCallback();
        getUserPTBranchList();
      },
      errorHandler: (error) => errorCallback(error.message),
    },
  });
};

export const updatePTBranch = (body, successCallback, errorCallback) => async (
  dispatch
) => {
  const url = '/user/pt-price';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: UPDATE_PT_BRANCH,
      body: { ...body },
      callBack: () => successCallback(),
      errorHandler: (error) => errorCallback(error.message),
    },
  });
};
