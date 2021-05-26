import { HTTP_REQUEST, GET_SYSTEM_COMMENTS } from '../constants';

export const getSystemComments = () => async (dispatch) => {
  const url = `/cms/system-comments/list`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_SYSTEM_COMMENTS,
      transformData: (data) => data.data,
    },
  });
};
