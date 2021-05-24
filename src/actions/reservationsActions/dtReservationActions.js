import {
  HTTP_REQUEST,
  GET_DT_RESERVATION_STATE_DATA,
  DT_RESERVATION_FUNC,
  GET_DT_RESERVATION_PACKAGE
} from '../../constants';

export const getDtAwaitings = (date) => async (dispatch) => {
  let url = '/appointment/dt-calendar/pending';
  let extras = '?';
  if (date) extras += `date=${date}&`;
  url += extras;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_DT_RESERVATION_STATE_DATA,
      transformData: (data) => ((data.data.status = 'awaitings'), data.data),
    },
  });
};
export const getPackageDt = () => async (dispatch) => {
  let url = '/user/package-seance-list';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_DT_RESERVATION_PACKAGE,
      transformData: (data) => data.data,
    },
  });
};
export const DtAwaitingApprove = (id, successCallback = () => {}) => async (
  dispatch
) => {
  let url = `/appointment/dt-calendar/update/${id}`;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'PATCH',
      body: { type: 'approve' },
      url,
      label: DT_RESERVATION_FUNC,
      callBack: () => {
        successCallback();
      },
      transformData: (data) => data.data,
    },
  });
};
export const DtAwaitingReject = (
  id,
  status,
  successCallback = () => {}
) => async (dispatch) => {
  let url = `/appointment/dt-calendar/update/${id}`;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'PATCH',
      body: { type: 'reject', reject_status_id: status },
      url,
      label: DT_RESERVATION_FUNC,
      callBack: () => {
        successCallback();
      },
      transformData: (data) => data.data,
    },
  });
};
export const DtApproveCancelStepOne = (
  id,
  status,
  successCallback = () => {}
) => async (dispatch) => {
  let url = `/appointment/dt-calendar/update/${id}`;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'PATCH',
      body: { type: 'cancel' },
      url,
      label: DT_RESERVATION_FUNC,
      callBack: () => {
        successCallback();
      },
      transformData: (data) => data.data,
    },
  });
};
export const DtApproveCancelStepTwo = (
  id,
  successCallback = () => {}
) => async (dispatch) => {
  let url = `/appointment/dt-calendar/update/${id}`;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'PATCH',
      body: { type: 'cancel', accept_cancellation: true },
      url,
      label: DT_RESERVATION_FUNC,
      callBack: () => {
        successCallback();
      },
      transformData: (data) => data.data,
    },
  });
};
export const getDtRejects = (date) => async (dispatch) => {
  let url = '/appointment/dt-calendar/rejected';
  let extras = '?';
  if (date) extras += `date=${date}&`;
  url += extras;

  await dispatch({
    type: HTTP_REQUEST,
    status: 'rejects',
    payload: {
      method: 'GET',
      url,
      label: GET_DT_RESERVATION_STATE_DATA,
      transformData: (data) => ((data.data.status = 'rejecteds'), data.data),
    },
  });
};
export const getDtApproved = (date) => async (dispatch) => {
  let url = '/appointment/dt-calendar/approved';
  let extras = '?';
  if (date) extras += `date=${date}&`;
  url += extras;
  await dispatch({
    type: HTTP_REQUEST,
    status: 'approved',
    payload: {
      method: 'GET',
      url,
      label: GET_DT_RESERVATION_STATE_DATA,
      transformData: (data) => ((data.data.status = 'approved'), data.data),
    },
  });
};

export const getDtReservationDetail = (id) => async (dispatch) => {
  let url = `/appointment/dt-calendar/detail/${id}`;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_DT_RESERVATION_STATE_DATA,
      transformData: (data) => ((data.data.status = 'res_detail'), data.data),
    },
  });
};

export const getDtSessionHistorys = (date) => async (dispatch) => {
  let url = '/appointment/dt-calendar/completed';
  let extras = '?';
  if (date) extras += `date=${date}&`;
  url += extras;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_DT_RESERVATION_STATE_DATA,
      transformData: (data) => (
        (data.data.status = 'session_historys'), data.data
      ),
    },
  });
};
