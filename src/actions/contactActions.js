import { HTTP_REQUEST, SENDE_CONTACT_MESSAGE } from '../constants';

export const sendTicket = (body, successCallback, errorCallback) => async (
  dispatch
) => {
  const url = `/user/ticket`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'post',
      url,
      body: { ...body },
      label: SENDE_CONTACT_MESSAGE,
      callBack: () => successCallback(),
      errorHandler: (error) => errorCallback(error.message),
      transformData: (data) => data.data,
    },
  });
};
