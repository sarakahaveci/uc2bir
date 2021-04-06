import { HTTP_REQUEST, GET_HOME_CONTENT } from '../constants';

export const getHomeContent = () => async (dispatch) => {
  const url = `/cms/home`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_HOME_CONTENT,
      transformData: (data) => data.data,
    },
  });
};
