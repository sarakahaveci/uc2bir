import { HTTP_REQUEST, GET_MY_PROFILE_FILES } from '../constants';

export const getMyProfileFiles = () => async (dispatch, getState) => {
  const url = `/user/profile/my-files`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_MY_PROFILE_FILES,
      transformData: (data) => data.data,
    },
  });
};
