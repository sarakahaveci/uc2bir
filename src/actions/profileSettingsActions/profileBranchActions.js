import { HTTP_REQUEST, GET_MY_BRANCHES } from '../../constants';

// TODO: move all branch actions here

export const getMyBranches = () => async (dispatch) => {
  const url = `/appointment/pt/branch`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      transformData: (data) => data.data,
      url,
      label: GET_MY_BRANCHES,
    },
  });
};
