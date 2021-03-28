import {
  HTTP_REQUEST,
  CANCEL_PROFILE,
  GET_CANCELLATION_REASONS,
} from '../../constants';

export const getCancellationReasons = () => async (dispatch) => {
  const url = '/cms/status-reason-type/all';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      transformData: (data) => data.data,
      url,
      label: GET_CANCELLATION_REASONS,
    },
  });
};

export const cancelProfile = (reason, successCallback) => async (dispatch) => {
  const url = '/user/profile/cancellation';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      label: CANCEL_PROFILE,
      url,
      callBack: successCallback,
      body: {
        reason,
      },
    },
  });
};
