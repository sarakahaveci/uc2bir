import { HTTP_REQUEST, GET_USER_FACILITY_LIST } from '../../constants';

export const getGymFacility = (id) => async (dispatch) => {
  const url = `/user/gym/facility/${id}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_USER_FACILITY_LIST,
      transformData: (data) => data.data,
    },
  });
};
