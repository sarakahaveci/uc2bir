import { HTTP_REQUEST, GET_USER_BLOG_LIST } from '../../constants';

export const getUserBlogs = (id, page = 1) => async (dispatch) => {
  const url = `/cms/blog/${id}/list?perPage=2&page=${page}`;

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
