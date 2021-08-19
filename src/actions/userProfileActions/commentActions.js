import { HTTP_REQUEST, GET_USER_COMMENT,GET_SESSION_COMMENT } from '../../constants';

export const getUserComment = (id) => async (dispatch) => {
  const url = `/appointment/comment/${id}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_USER_COMMENT,
      transformData: (data) => data.data,
    },
  });
};

export const getSessionComment = (id) => async (dispatch) => {
  const url = `/appointment/sess-comment/${id}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_SESSION_COMMENT,
      transformData: (data) => data.data,
    },
  });
};
