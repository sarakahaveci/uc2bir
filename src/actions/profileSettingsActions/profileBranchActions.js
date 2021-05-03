import { HTTP_REQUEST, GET_MY_BRANCHES, GET_PT_BRANCH, ADD_NEW_PT_BRANCH } from '../../constants';

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

export const getUserPTBranchList = () => async (dispatch) => {
  const url = `/user/pt-price`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_PT_BRANCH,
      transformData: (data) => data.data,
    },
  });
};

export const addNewPTBranch = (body, successCallback, errorCallback) => async (
  dispatch
) => {
  const url = '/user/pt-price/branch';
  let data = {};
  if (body.branch) {
    data.branch = body.branch;
  }
  if (body.branch_suggest) {
    data.branch_suggest = body.branch_suggest;
  }
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: ADD_NEW_PT_BRANCH,
      body: data,
      callBack: () => {
        successCallback();
        getUserPTBranchList();
      },
      errorHandler: (error) => errorCallback(error.message),
    },
  });
};
