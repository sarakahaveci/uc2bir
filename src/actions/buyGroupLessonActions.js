import {
  HTTP_REQUEST,
  GET_GROUP_LESSON_DETAIL,
  SET_GROUP_LESSON_RESERVATION,
  CLEAR_GROUP_LESSON_RESERVATION,
} from '../constants';

export const getGroupLessonDetail = ( id) => async (dispatch) => {
  let url="/appointment/pt-calendar/group/"+id
  
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_GROUP_LESSON_DETAIL,
      transformData: (data) => data.data,
    },
  });
};
export const setGroupLessonReservation = (data) => async (dispatch) => {
  dispatch({
    type: SET_GROUP_LESSON_RESERVATION,
    payload: { ...data },
  });
};
export const clearGroupLessonReservation = () => async (dispatch) => {
  dispatch({
    type: CLEAR_GROUP_LESSON_RESERVATION,
  });
};
