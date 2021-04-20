import { HTTP_REQUEST, GET_PT_RESERVATION_CALENDAR } from '../constants';

export const getPtReservationCalendar = (
  id,
  date,
  hour,
  branch_id,
  session
) => async (dispatch) => {
  const url = `https://gateway.321.4alabs.com/appointment/pt-calendar/step-1/${id}?`;
  date && url + `date=${date}&`;
  hour && url + `hour=${hour}&`;
  branch_id && url + `branch_id=${branch_id}&`;
  session && url + `session=${session}&`;
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
