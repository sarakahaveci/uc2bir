import { HTTP_REQUEST, GET_DIETITIAN_SPECIALITY } from '../../constants';

export const getDietitionSpecialties = (id) => async (dispatch) => {
  const url = `/user/profile/speciality/${id}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_DIETITIAN_SPECIALITY,
      transformData: (data) => data.data,
    },
  });
};
