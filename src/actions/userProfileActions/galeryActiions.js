import { HTTP_REQUEST, GET_USER_GALERY_LIST } from '../../constants';

export const getUserGalery = (id) => async (dispatch) => {
  const url = `/user/gallery/${id}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_USER_GALERY_LIST,
      transformData: (data) => data.data,
    },
  });
};
