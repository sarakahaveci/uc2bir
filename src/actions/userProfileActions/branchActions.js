import { HTTP_REQUEST, GET_USER_BRANCH } from '../../constants';

export const getUserBranchList = (id) => async (dispatch) => {
  const url = `/user/pt-price/${id}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_USER_BRANCH,
      transformData: (data) => data.data,
    },
  });
};
