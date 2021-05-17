import {
  HTTP_REQUEST,
  GET_USER_MY_PACKET,
  GET_USER_MY_PACKET_DETAIL,
  GET_USER_PACKET_LESSON_DETAIL,
  SET_USER_PACKET_LESSON_COMPLETE,
  GET_USER_MY_PACKET_EXERCISE_DETAIL,
} from '../constants';

export const getUserMyPacket = () => async (dispatch) => {
  const url = `/user/purchased-package/`;

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
export const getUserMyPacketDetail = (package_uuid) => async (dispatch) => {
  const url = `/user/pt-package/appointment-lesson?package_uuid=${package_uuid}`;

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
export const getUserPacketLessonDetail =
  (id, package_uuid) => async (dispatch) => {
    const url = `/user/pt-package/appointment-lesson-detail?package_uuid=${package_uuid}&lesson_id=${id}&type=lesson`;
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
