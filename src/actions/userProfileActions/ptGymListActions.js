import { HTTP_REQUEST, GET_PT_GYM_LIST } from '../../constants';

export const getPtGymList = (id) => async (dispatch) => {
  const url = `/user/working-area/gym/${id}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_PT_GYM_LIST,
      transformData: (data) => data.data,
    },
  });
};
