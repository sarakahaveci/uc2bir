import {
  HTTP_REQUEST,
  GET_DIETITIAN_PRICE,
  UPDATE_DIETITIAN_PRICE,
} from '../../constants';

export const getDietitianPrice = () => async (dispatch, getState) => {
  const url = `/user/dt-price`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_DIETITIAN_PRICE,
      transformData: (data) => data.data,
    },
  });
};

export const updateDietitianPrice = (
  body,
  successCallback,
  errorCallback
) => async (dispatch, getState) => {
  const url = `/user/dt-price`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      body: { ...body },
      label: UPDATE_DIETITIAN_PRICE,
      callBack: () => successCallback(),
      errorHandler: (error) => errorCallback(error?.message),
      transformData: (data) => data.data,
    },
  });
};
