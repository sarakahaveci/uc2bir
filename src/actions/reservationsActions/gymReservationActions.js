import {
  HTTP_REQUEST,
  GET_GYM_RESERVATION_STATE_DATA,
  GYM_RESERVATION_FUNC,
} from '../../constants';

export const getGymAwaitings = (date) => async (dispatch) => {
  let url = '/appointment/bs-calendar/pending';
  let extras = '?';
  if (date) extras += `date=${date}&`;
  url += extras;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_GYM_RESERVATION_STATE_DATA,
      transformData: (data) => ((data.data.status = 'awaitings'), data.data),
    },
  });
};
export const GymAwaitingApprove = (id, successCallback = () => {}) => async (
  dispatch
) => {
  let url = `/appointment/bs-calendar/update/${id}`;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'PATCH',
      body: { type: 'approve' },
      url,
      label: GYM_RESERVATION_FUNC,
      callBack: () => {
        successCallback();
      },
      transformData: (data) => data.data,
    },
  });
};
export const GymAwaitingReject = (
  id,
  status,
  successCallback = () => {}
) => async (dispatch) => {
  let url = `/appointment/bs-calendar/update/${id}`;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'PATCH',
      body: { type: 'reject', reject_status_id: status },
      url,
      label: GYM_RESERVATION_FUNC,
      callBack: () => {
        successCallback();
      },
      transformData: (data) => data.data,
    },
  });
};
export const GymApproveCancelStepOne = (
  id,
  status,
  successCallback = () => {}
) => async (dispatch) => {
  let url = `/appointment/bs-calendar/update/${id}`;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'PATCH',
      body: { type: 'cancel' },
      url,
      label: GYM_RESERVATION_FUNC,
      callBack: () => {
        successCallback();
      },
      transformData: (data) => data.data,
    },
  });
};
export const GymApproveCancelStepTwo = (
  id,
  successCallback = () => {}
) => async (dispatch) => {
  let url = `/appointment/bs-calendar/update/${id}`;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'PATCH',
      body: { type: 'cancel', accept_cancellation: true },
      url,
      label: GYM_RESERVATION_FUNC,
      callBack: () => {
        successCallback();
      },
      transformData: (data) => data.data,
    },
  });
};
export const getGymRejects = (date) => async (dispatch) => {
  let url = '/appointment/bs-calendar/rejected';
  let extras = '?';
  if (date) extras += `date=${date}&`;
  url += extras;

  await dispatch({
    type: HTTP_REQUEST,
    status: 'rejects',
    payload: {
      method: 'GET',
      url,
      label: GET_GYM_RESERVATION_STATE_DATA,
      transformData: (data) => ((data.data.status = 'rejecteds'), data.data),
    },
  });
};
export const getGymApproved = (date) => async (dispatch) => {
  let url = '/appointment/bs-calendar/approved';
  let extras = '?';
  if (date) extras += `date=${date}&`;
  url += extras;
  await dispatch({
    type: HTTP_REQUEST,
    status: 'approved',
    payload: {
      method: 'GET',
      url,
      label: GET_GYM_RESERVATION_STATE_DATA,
      transformData: (data) => ((data.data.status = 'approved'), data.data),
    },
  });
};

export const getGymReservationDetail = (id) => async (dispatch) => {
  let url = `/appointment/bs-calendar/detail/${id}`;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_GYM_RESERVATION_STATE_DATA,
      transformData: (data) => ((data.data.status = 'res_detail'), data.data),
    },
  });
};

export const getGymSessionHistorys = (date) => async (dispatch) => {
  let url = '/appointment/bs-calendar/completed';
  let extras = '?';
  if (date) extras += `date=${date}&`;
  url += extras;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_GYM_RESERVATION_STATE_DATA,
      transformData: (data) => (
        (data.data.status = 'session_historys'), data.data
      ),
    },
  });
};
