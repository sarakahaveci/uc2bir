import { HTTP_REQUEST, GET_USER_COMMENT } from '../../constants';

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
