import { GET_STATIC_PAGE } from 'constants/actionTypes';

export const getStaticPage = (slug) => async (dispatch) => {
  const url = `/cms/static-page/detail/${slug}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_STATIC_PAGE,
      transformData: (data) => data.data,
    },
  });
};
