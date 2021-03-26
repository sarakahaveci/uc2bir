import {
  HTTP_REQUEST,
  GET_DIETITIAN_PROFICIENCY,
  ADD_DIETITIAN_PROFICIENCY,
  GET_ALL_DIETITIAN_PROFICIENCY,
  GET_SUB_DIETITIAN_PROFICIENCY,
} from '../../constants';

export const getAllProficiency = (
  { parrenId },
  isSubProficiency,
  successCallback,
  errorCallback
) => async (dispatch) => {
  const url = `/cms/branch/all?type=dt&status=active&parent_id=${
    parrenId ?? 0
  }`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: isSubProficiency
        ? GET_SUB_DIETITIAN_PROFICIENCY
        : GET_ALL_DIETITIAN_PROFICIENCY,
      transformData: (data) => data.data,
      callBack: () => successCallback(),
      errorHandler: (error) => errorCallback(error?.message),
    },
  });
};

export const getDietitianProficiency = () => async (dispatch) => {
  const url = `/user/profile/speciality`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_DIETITIAN_PROFICIENCY,
      transformData: (data) => data.data,
    },
  });
};

export const addNewDietitianProficiency = (
  body,
  successCallback,
  errorCallback
) => async (dispatch) => {
  const url = `/user/profile/speciality`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      body: { ...body },
      label: ADD_DIETITIAN_PROFICIENCY,
      callBack: () => successCallback(),
      errorHandler: (error) => errorCallback(error?.message),
      transformData: (data) => data.data,
    },
  });
};
