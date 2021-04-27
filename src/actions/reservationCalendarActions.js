import {
  HTTP_REQUEST,
  GET_PT_RESERVATION_CALENDAR,
  SEND_RESERVATİON,
  GET_GYM_RESERVATION_CALENDAR,
  GET_PT_FOR_GYM,
  GET_AREA_FOR_PT,
} from '../constants';
import { toast } from 'react-toastify';
export const getAreaForPT = (id, date, hour, branch_id, session) => async (
  dispatch
) => {
  let url = `https://gateway.321.4alabs.com/appointment/pt-calendar/step-2/${id}`;
  let extras = '?';

  if (date) extras += `date=${date}&`;
  if (hour) extras += `hour=${hour}&`;
  if (branch_id) extras += `branch_id=${branch_id}&`;
  if (session) extras += `session=${session}&`;
  if (session) extras += `page=${pageXOffset}&`;

  url += extras;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_AREA_FOR_PT,
      transformData: (data) => data.data,
    },
  });
};
export const getPtReservationCalendar = (
  id,
  date,
  hour,
  branch_id,
  session
) => async (dispatch) => {
  let url = `https://gateway.321.4alabs.com/appointment/pt-calendar/step-1/${id}`;
  let extras = '?';

  if (date) extras += `date=${date}&`;
  if (hour) extras += `hour=${hour}&`;
  if (branch_id) extras += `branch_id=${branch_id}&`;
  if (session) extras += `session=${session}&`;
  url += extras;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_PT_RESERVATION_CALENDAR,
      transformData: (data) => data.data,
    },
  });
};
export const getDtReservationCalendar = (id, date, hour, session) => async (
  dispatch
) => {
  let url = `https://gateway.321.4alabs.com/appointment/dt-calendar/step-1/${id}`;
  let extras = '?';

  if (date) extras += `date=${date}&`;
  if (hour) extras += `hour=${hour}&`;
  if (session) extras += `session=${session}&`;
  url += extras;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_PT_RESERVATION_CALENDAR,
      transformData: (data) => data.data,
    },
  });
};
export const sendReservation = (type, body, successCallback) => async (
  dispatch
) => {
  const url = `/appointment/${type}-calendar`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      body: { ...body },
      label: SEND_RESERVATİON,
      callBack: () => successCallback(),
      errorHandler: () => {
        toast.error('Bilgilerinizi gözden geçiriniz.', {
          position: 'bottom-right',
          autoClose: 4000,
        });
      },

      transformData: (data) => data.data,
    },
  });
};

export const getGymReservationCalendar = (id, date, hour, branch_id) => async (
  dispatch
) => {
  let url = `https://gateway.321.4alabs.com/appointment/bs-calendar/step-1/${id}`;
  let extras = '?';

  if (date) extras += `date=${date}&`;
  if (hour) extras += `hour=${hour}&`;
  if (branch_id) extras += `branch_id=${branch_id}&`;
  url += extras;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_GYM_RESERVATION_CALENDAR,
      transformData: (data) => data.data,
    },
  });
};
export const getPtforGym = (id, date, hour, branch_id) => async (dispatch) => {
  let url = `https://gateway.321.4alabs.com/appointment/bs-calendar/step-2/${id}`;
  let extras = '?';

  if (date) extras += `date=${date}&`;
  if (hour) extras += `hour=${hour}&`;
  if (branch_id) extras += `branch_id=${branch_id}&`;
  url += extras;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_PT_FOR_GYM,
      transformData: (data) => data.data,
    },
  });
};
