import {
  HTTP_REQUEST,
  GET_PT_RESERVATION_CALENDAR,
  SEND_RESERVATİON,
} from '../constants';

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
export const sendReservation = (body, successCallback, errorCallback) => async (
  dispatch
) => {
  const url = `/appointment/pt-calendar`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      body: { ...body },
      label: SEND_RESERVATİON,
      callBack: () => successCallback(),
      errorHandler: (error) => errorCallback(error?.message),
      transformData: (data) => data.data,
    },
  });
};
