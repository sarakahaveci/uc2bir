import { HTTP_REQUEST, PROFILE } from '../constants';

export const profile = (
  {},
  successCallback,
  errorCallback
) => async (dispatch) => {
  const url = '/user/profile';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: PROFILE,
      transformData: (data) => data.data,
      callBack: () => successCallback(),
      errorHandler: () => errorCallback(),
    },
  });
};