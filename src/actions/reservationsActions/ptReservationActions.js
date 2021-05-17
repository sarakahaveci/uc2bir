import {
  HTTP_REQUEST,
  GET_PT_RESERVATION_STATE_DATA,
  PT_RESERVATION_FUNC,
  GET_PT_RESERVATION_PACKAGE
} from '../../constants';

export const getPtAwaitings = (date) => async (dispatch) => {
  let url = '/appointment/pt-calendar/pending';
  let extras = '?';
  if (date) extras += `date=${date}&`;
  url += extras;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_PT_RESERVATION_STATE_DATA,
      transformData: (data) => ((data.data.status = 'awaitings'), data.data),
    },
  });
};
export const PtAwaitingApprove = (id, successCallback = () => {}) => async (
  dispatch
) => {
  let url = `/appointment/pt-calendar/update/${id}`;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'PATCH',
      body: { type: 'approve' },
      url,
      label: PT_RESERVATION_FUNC,
      callBack: () => {
        successCallback();
      },
      transformData: (data) => data.data,
    },
  });
};
export const PtAwaitingReject = (
  id,
  status,
  successCallback = () => {}
) => async (dispatch) => {
  let url = `/appointment/pt-calendar/update/${id}`;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'PATCH',
      body: { type: 'reject', reject_status_id: status },
      url,
      label: PT_RESERVATION_FUNC,
      callBack: () => {
        successCallback();
      },
      transformData: (data) => data.data,
    },
  });
};
export const PtApproveCancelStepOne = (
  id,
  status,
  successCallback = () => {}
) => async (dispatch) => {
  let url = `/appointment/pt-calendar/update/${id}`;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'PATCH',
      body: { type: 'cancel' },
      url,
      label: PT_RESERVATION_FUNC,
      callBack: () => {
        successCallback();
      },
      transformData: (data) => data.data,
    },
  });
};
export const PtApproveCancelStepTwo = (
  id,
  successCallback = () => {}
) => async (dispatch) => {
  let url = `/appointment/pt-calendar/update/${id}`;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'PATCH',
      body: { type: 'cancel', accept_cancellation: true },
      url,
      label: PT_RESERVATION_FUNC,
      callBack: () => {
        successCallback();
      },
      transformData: (data) => data.data,
    },
  });
};
export const getPtRejects = (date) => async (dispatch) => {
  let url = '/appointment/pt-calendar/rejected';
  let extras = '?';
  if (date) extras += `date=${date}&`;
  url += extras;

  await dispatch({
    type: HTTP_REQUEST,
    status: 'rejects',
    payload: {
      method: 'GET',
      url,
      label: GET_PT_RESERVATION_STATE_DATA,
      transformData: (data) => ((data.data.status = 'rejecteds'), data.data),
    },
  });
};
export const getPtApproved = (date) => async (dispatch) => {
  let url = '/appointment/pt-calendar/approved';
  let extras = '?';
  if (date) extras += `date=${date}&`;
  url += extras;
  await dispatch({
    type: HTTP_REQUEST,
    status: 'approved',
    payload: {
      method: 'GET',
      url,
      label: GET_PT_RESERVATION_STATE_DATA,
      transformData: (data) => ((data.data.status = 'approved'), data.data),
    },
  });
};

export const getPtReservationDetail = (id) => async (dispatch) => {
  let url = `/appointment/pt-calendar/detail/${id}`;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_PT_RESERVATION_STATE_DATA,
      transformData: (data) => ((data.data.status = 'res_detail'), data.data),
    },
  });
};

export const getSessionHistorys = (date) => async (dispatch) => {
  let url = '/appointment/pt-calendar/completed';
  let extras = '?';
  if (date) extras += `date=${date}&`;
  url += extras;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_PT_RESERVATION_STATE_DATA,
      transformData: (data) => (
        (data.data.status = 'session_historys'), data.data
      ),
    },
  });
};

export const getPackage = () => async (dispatch) => {
  let url = '/appointment/pt-calendar/my-package';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_PT_RESERVATION_PACKAGE,
      transformData: (data) => data.data,
    },
  });
};

export const getPackageClass = (data) => async (dispatch) => {
  let url = '/user/pt-package/appointment-lesson';
  let extras = '?';
  if (data) extras += `package_uuid=${data.package_uuid}&appointment_id=${data.appointment_id}`;
  url += extras;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_PT_RESERVATION_PACKAGE,
      transformData: (data) => data.data,
    },
  });
};
