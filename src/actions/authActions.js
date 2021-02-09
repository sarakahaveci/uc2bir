import { HTTP_REQUEST, LOGIN } from '../constants';

export const login = (
  { email, password },
  successCallback,
  errorCallback
) => async (dispatch) => {
  const url = '/login';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: LOGIN,
      body: {
        email,
        password,
      },
      transformData: (data) => data.data,
      callBack: () => successCallback(),
      errorHandler: () => errorCallback(),
    },
  });
};
