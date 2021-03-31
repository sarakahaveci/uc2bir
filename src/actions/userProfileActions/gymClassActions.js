import { HTTP_REQUEST, GET_GYM_CLASS_LIST } from '../../constants';

export const getGymClassList = (id) => async (dispatch) => {
  const url = `/user/gym-class/${id}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_GYM_CLASS_LIST,
      transformData: (data) => data.data,
    },
  });
};
