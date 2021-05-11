import {
  HTTP_REQUEST,
  GET_USER_MY_PACKET,
  GET_USER_MY_PACKET_DETAIL,
  GET_USER_PACKET_LESSON_DETAIL,
  SET_USER_PACKET_LESSON_COMPLETE,
  GET_USER_MY_PACKET_EXERCISE_DETAIL,
} from '../constants';

export const getUserMyPacket = () => async (dispatch) => {
  const url = `/mockmock/`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_USER_MY_PACKET,
      transfomrData: (data) => data.data,
    },
  });
};
export const getUserMyPacketDetail = (id) => async (dispatch) => {
  const url = `/mockmockDetailPACKET/${id}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_USER_MY_PACKET_DETAIL,
      transfomrData: (data) => data.data,
    },
  });
};
export const getUserPacketLessonDetail = (id) => async (dispatch) => {
  const url = `/mockmockDetailLESSONNNN/${id}`;
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_USER_PACKET_LESSON_DETAIL,
      transfomrData: (data) => data.data,
    },
  });
};
export const setUserPacketLessonComplete = (id) => async (dispatch) => {
  const url = `/packetCompolate/${id}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: SET_USER_PACKET_LESSON_COMPLETE,
      body: { gidicek: 'veri' },
      transformData: (data) => data.data,
      // callBack: (callBack) => console.log(callBack),
      // errorHandler: (error) =>console.log(error),
    },
  });
};
export const getUserExerciseDetail = (id) => async (dispatch) => {
  const url = `/mockmockDetailEXERCİSE/${id}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_USER_MY_PACKET_EXERCISE_DETAIL,
      transfomrData: (data) => data.data,
    },
  });
};