import { HTTP_REQUEST, GET_GYM_PT_LIST } from '../../constants';

export const getGymPtList = (id, page = 1) => async (dispatch) => {
  const url = `/user/gym/find-pt/${id}?page=${page}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_GYM_PT_LIST,
      transformData: (data) => data.data,
    },
  });
};
