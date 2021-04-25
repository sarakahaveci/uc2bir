import { HTTP_REQUEST, GET_PT_RESERVATION_STATE_DATA } from '../../constants';

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
export const PtAwaitingApprove = (id) => async (dispatch) => {
  let url = `/appointment/pt-calendar/update/${id}`;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'PATCH',
      body: { type: 'approve' },
      url,
      label: GET_PT_RESERVATION_STATE_DATA,
      transformData: (data) => data.data,
    },
  });
};

export const getPtRejects = (date) => async (dispatch) => {
  let url = '/appointment/pt-calendar/rejected';
  let extras = '?';
  if (date) extras += `date=${date}&`;
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
