import {
  HTTP_REQUEST,
  GET_ALL_FACILITY,
  GET_USET_FACILITY,
  ADD_FACILITY,
} from '../../constants';

export const getMyProfileFacilities = () => async (dispatch, getState) => {
  const url = `/user/gym/facility`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_USET_FACILITY,
      transformData: (data) => data.data,
    },
  });
};

export const getAllFacilities = () => async (dispatch, getState) => {
  const url = `/user/gym/facility-list`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_ALL_FACILITY,
      transformData: (data) => data.data,
    },
  });
};

export const addNewFacility = (body, successCallback, errorCallback) => async (
  dispatch,
  getState
) => {
  const url = `/user/gym/facility`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      body,
      url,
      label: ADD_FACILITY,
      callBack: successCallback,
      errorHandler: (error) => errorCallback(error?.message),
    },
  });
};
