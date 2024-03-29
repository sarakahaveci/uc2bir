import {
  HTTP_REQUEST,
  GET_PT_RESERVATION_CALENDAR,
  GET_GYM_RESERVATION_CALENDAR,
  GET_GYM_RESERVATION_DATA,
  GET_PT_FOR_GYM,
  GET_AREA_FOR_PT,
  CLEAR_RESERVATIONCALENDAR,
} from '../constants';
export const getAreaForPT =
  (id, date, hour, branch_id, session) => async (dispatch) => {
    let url = `/appointment/pt-calendar/${id}`;
    let extras = '?';

    if (date) extras += `date=${date}&`;
    if (hour) extras += `hour=${hour}&`;
    if (branch_id) extras += `branch_id=${branch_id}&`;
    if (session) extras += `session=${session}&`;
    if (page) extras += `page=${1}&`;

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
/*export const getPtReservationCalendar = (
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
};*/
export const getPtReservationCalendar =
  (id, date, hour, branch_id, session, location_id) => async (dispatch) => {
    let url = `/appointment/pt-calendar/step-x/${id}`;
    let extras = '?';

    if (date) extras += `date=${date}&`;
    if (hour) extras += `hour=${hour}&`;
    if (branch_id) extras += `branch_id=${branch_id}&`;
    if (session) extras += `session=${session}&`;
    if (location_id) extras += `location_id=${location_id}&`;

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
export const getDtReservationCalendar =
  (id, date, hour, session, location_id) => async (dispatch) => {
    let url = `/appointment/dt-calendar/step-x/${id}`;
    let extras = '?';

    if (date) extras += `date=${date}&`;
    if (hour) extras += `hour=${hour}&`;
    if (session) extras += `session=${session}&`;
    if (location_id) extras += `location_id=${location_id}&`;

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
export const getPacketPtReservationCalendar =
  (package_uuid, pt_id, date, hour, session, location_id) =>
  async (dispatch) => {
    let url = `/appointment/pt-calendar/package`;
    let extras = '?';
    if (package_uuid) extras += `package_uuid=${package_uuid}&`;
    if (pt_id) extras += `pt_id=${pt_id}&`;

    if (date) extras += `date=${date}&`;
    if (hour) extras += `hour=${hour}&`;
    if (session) extras += `session=${session}&`;
    if (location_id) extras += `location_id=${location_id}&`;

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

  export const getPacketDtReservationCalendar =
  (package_uuid, date, hour, session, location_id) =>
  async (dispatch) => {
    let url = `/appointment/dt-calendar/package`;
    let extras = '?';
    if (package_uuid) extras += `package_uuid=${package_uuid}&`;
    if (date) extras += `date=${date}&`;
    if (hour) extras += `hour=${hour}&`;
    if (session) extras += `session=${session}&`;
    if (location_id) extras += `location_id=${location_id}&`;

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
export const getGymReservationCalendar =
  (id, date, hour, branch_id, pt_id) => async (dispatch) => {
    let url = `/appointment/bs-calendar/step-x/${id}`;
    let extras = '?';

    if (date) extras += `date=${date}&`;
    if (hour) extras += `hour=${hour}&`;
    if (branch_id) extras += `branch_id=${branch_id}&`;
    if (pt_id) extras += `pt_id=${pt_id}&`;
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
  export const getGymDataForRes =
  (id, date, hour, branch_id, pt_id) => async (dispatch) => {
    let url = `/appointment/bs-calendar/${id}`;
    let extras = '?';

    if (date) extras += `date=${date}&`;
    if (hour) extras += `hour=${hour}&`;
    if (branch_id) extras += `branch_id=${branch_id}&`;
    if (pt_id) extras += `pt_id=${pt_id}&`;
    url += extras;
    await dispatch({
      type: HTTP_REQUEST,
      payload: {
        method: 'GET',
        url,
        label: GET_GYM_RESERVATION_DATA,
        transformData: (data) => data.data,
      },
    });
  };
export const getPtforGym = (id, date, hour, branch_id) => async (dispatch) => {
  let url = `/appointment/bs-calendar/step-2/${id}`;
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

export const clearReservationCalendar = () => async (dispatch) => {
  dispatch({
    type: CLEAR_RESERVATIONCALENDAR,
  });
};
