import {
  HTTP_REQUEST,
  GET_USER_RESERVATION_STATE_DATA,
  USER_RESERVATION_FUNC,
} from '../../constants';

export const getUserAwaitings = (date) => async (dispatch) => {
  let url = '/appointment/calendar/pending';
  let extras = '?';
  if (date) extras += `date=${date}&`;
  url += extras;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_USER_RESERVATION_STATE_DATA,
      transformData: (data) => ((data.data.status = 'awaitings'), data.data),
    },
  });
};
export const UserAwaitingApprove = (id, successCallback = () => {}) => async (
  dispatch
) => {
  let url = `/appointment/calendar/update/${id}`;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'PATCH',
      body: { type: 'approve' },
      url,
      label: USER_RESERVATION_FUNC,
      callBack: () => {
        successCallback();
      },
      transformData: (data) => data.data,
    },
  });
};
export const UserAwaitingReject = (
  id,
  status,
  successCallback = () => {}
) => async (dispatch) => {
  let url = `/appointment/calendar/update/${id}`;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'PATCH',
      body: { type: 'reject', reject_status_id: status },
      url,
      label: USER_RESERVATION_FUNC,
      callBack: () => {
        successCallback();
      },
      transformData: (data) => data.data,
    },
  });
};
export const UserApproveCancelStepOne = (
  id,
  status,
  successCallback = () => {}
) => async (dispatch) => {
  let url = `/appointment/calendar/update/${id}`;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'PATCH',
      body: { type: 'cancel' },
      url,
      label: USER_RESERVATION_FUNC,
      callBack: () => {
        successCallback();
      },
      transformData: (data) => data.data,
    },
  });
};
export const UserApproveCancelStepTwo = (
  id,
  successCallback = () => {}
) => async (dispatch) => {
  let url = `/appointment/calendar/update/${id}`;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'PATCH',
      body: { type: 'cancel', accept_cancellation: true },
      url,
      label: USER_RESERVATION_FUNC,
      callBack: () => {
        successCallback();
      },
      transformData: (data) => data.data,
    },
  });
};
export const getUserRejects = (date) => async (dispatch) => {
  let url = '/appointment/calendar/rejected';
  let extras = '?';
  if (date) extras += `date=${date}&`;
  url += extras;

  await dispatch({
    type: HTTP_REQUEST,
    status: 'rejects',
    payload: {
      method: 'GET',
      url,
      label: GET_USER_RESERVATION_STATE_DATA,
      transformData: (data) => ((data.data.status = 'rejecteds'), data.data),
    },
  });
};
export const getUserApproved = () => async (dispatch) => {
  let url = '/appointment/calendar/approved';
  await dispatch({
    type: HTTP_REQUEST,
    status: 'approved',
    payload: {
      method: 'GET',
      url,
      label: GET_USER_RESERVATION_STATE_DATA,
      transformData: (data) => ((data.data.status = 'approved'), data.data),
    },
  });
};

export const getReservationDetail = (id) => async (dispatch) => {
  let url = `/appointment/calendar/detail/${id}`;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_USER_RESERVATION_STATE_DATA,
      transformData: (data) => ((data.data.status = 'res_detail'), data.data),
    },
  });
};

export const getSessionHistorys = (date) => async (dispatch) => {
  let url = '/appointment/calendar/completed';
  let extras = '?';
  if (date) extras += `date=${date}&`;
  url += extras;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_USER_RESERVATION_STATE_DATA,
      transformData: (data) => (
        (data.data.status = 'session_historys'), data.data
      ),
    },
  });
};
