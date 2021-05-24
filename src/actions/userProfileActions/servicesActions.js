import { HTTP_REQUEST, GET_DT_SERVICES } from '../../constants';

export const dtGetServices = (page) => async (dispatch) => {
  const url = `/user/dt-package/my-customers`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_DT_SERVICES,
      transformData: (data) => data.data,
    },
  });
};
