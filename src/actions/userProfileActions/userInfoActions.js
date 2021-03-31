import { HTTP_REQUEST, GET_USER_INFO } from '../../constants';

export const getUserInfo = (id) => async (dispatch) => {
  const url = `/user/profile/${id}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_USER_INFO,
      transformData: (data) => data.data,
    },
  });
};
