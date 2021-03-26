import { HTTP_REQUEST, GET_FOOTER_INFO } from '../constants';

export const getFooterInfo = () => async (dispatch) => {
  const url = `/cms/footer`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_FOOTER_INFO,
    },
  });
};
