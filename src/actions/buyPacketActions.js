import {
  HTTP_REQUEST,
  GET_PACKET_DETAIL,
  SET_PACKET_RESERVATION,
  CLEAR_PACKET_RESERVATION,
} from '../constants';

export const getPacketDetail = (type, id) => async (dispatch) => {
  let url;
  switch (type) {
    case 'pt':
      url = `https://gateway.321.4alabs.com/cms/package/detail/${id}`;
      break;
    case 'dt':
      url = `https://gateway.321.4alabs.com/user/package/detail/${id}`;
      break;
    default:
      break;
  }
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_PACKET_DETAIL,
      transformData: (data) => data.data,
    },
  });
};
export const getUpdatePackage = (id,level) => async (dispatch) => {
  let url=`https://gateway.321.4alabs.com/cms/package/upgrade/${id}`
  let extras='?'
  if (level) extras += `level=${level}&`;
  url += extras;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_PACKET_DETAIL,
      transformData: (data) => data.data,
    },
  });
};
export const setPacketReservation = (data) => async (dispatch) => {
  dispatch({
    type: SET_PACKET_RESERVATION,
    payload: { ...data },
  });
};
export const clearPacketReservation = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PACKET_RESERVATION,
  });
};
