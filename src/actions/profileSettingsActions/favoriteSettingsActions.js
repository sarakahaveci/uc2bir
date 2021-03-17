import {
  HTTP_REQUEST,
  GET_FAVORITE_USERS,
  ADD_FAVORITE_USER,
  REMOVE_FAVORITE_USER,
  USER_KEYS,
} from '../../constants';

export const getFavoriteUsers = (userTypeId, page) => async (
  dispatch,
  getState
) => {
  const url = `/user/favorite/${USER_KEYS[userTypeId]}?page=${page}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_FAVORITE_USERS,
      transformData: (data) => data.data,
    },
  });
};

export const addFavoriteUser = (userId) => async (dispatch, getState) => {
  const url = `/user/favorite/add/${userId}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: ADD_FAVORITE_USER,
    },
  });
};

export const removeFavoriteUser = (userId) => async (dispatch, getState) => {
  const url = `/user/favorite/remove/${userId}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: REMOVE_FAVORITE_USER,
    },
  });
};
