import { HTTP_REQUEST, GET_USER_CERTIFICATE } from '../../constants';

export const getUserCertificate = (id) => async (dispatch) => {
  const url = `/user/view/certificate/${id}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_USER_CERTIFICATE,
      transformData: (data) => data.data,
    },
  });
};
