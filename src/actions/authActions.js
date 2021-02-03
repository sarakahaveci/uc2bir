import { HTTP_REQUEST, LOGIN } from 'constants';

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

//   export const getProfile = (data) => async (dispatch) => {
//     const url = '/login';

//     await dispatch({
//       type: HTTP_REQUEST,
//       payload: {
//         method: 'GET',
//         url,
//         label: USER_PROFILE,
//         body: data
//       },
//     });
//   };

//   export const getRefreshToken = (data) => async (dispatch) => {
//     const url = '/login';

//     await dispatch({
//       type: HTTP_REQUEST,
//       payload: {
//         method: 'POST',
//         url,
//         label: REFRESH_TOKEN,
//         body: data
//       },
//     });
//   };
