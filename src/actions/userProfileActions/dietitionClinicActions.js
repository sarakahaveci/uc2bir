import { HTTP_REQUEST, GET_DIETITIAN_CLINIC_LIST } from '../../constants';

export const getDietitianClinics = (id) => async (dispatch) => {
  const url = `/user/working-area/clinic/${id}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_DIETITIAN_CLINIC_LIST,
      transformData: (data) => data.data,
    },
  });
};
