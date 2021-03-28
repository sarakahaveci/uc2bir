import { HTTP_REQUEST, GET_USER_BLOG_LIST } from '../../constants';

export const getUserBlogs = (page = 1) => async (dispatch) => {
  const url = `/cms/blog/1/list?perPage=2&page=${page}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_USER_BLOG_LIST,
      transformData: (data) => data.data,
    },
  });
};
