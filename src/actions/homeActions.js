import { HTTP_REQUEST, GET_HOME_CONTENT, GET_HOME_TAGS } from '../constants';

export const getHomeContent = () => async (dispatch) => {
  const url = `/cms/home`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_HOME_CONTENT,
    },
  });
};

export const getHomeTags = () => async (dispatch) => {
  const url = `/cms/tag/list`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_HOME_TAGS,
    },
  });
};
