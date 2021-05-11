import {
  HTTP_REQUEST,
  SEND_RESERVATION,
  SEND_PACKET_RESERVATION,
  SEND_PAYTR,
  PAYTR_RESPONSE,
} from '../constants';
import { toast } from 'react-toastify';
export const sendReservation = (type, body, successCallback) => async (
  dispatch
) => {
  const url = `/appointment/${type}-calendar`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      body: { ...body },
      label: SEND_RESERVATION,
      callBack: () => successCallback(),
      errorHandler: () => {
        toast.error('Bilgilerinizi gözden geçiriniz.', {
          position: 'bottom-right',
          autoClose: 4000,
        });
      },

      transformData: (data) => data.data,
    },
  });
};
export const sendPackageReservation = (type, body, successCallback) => async (
  dispatch
) => {
  const url = `/user/pt-package/buy`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      body: { ...body },
      label: SEND_PACKET_RESERVATION,
      callBack: () => successCallback(),
      errorHandler: () => {
        toast.error('Bilgilerinizi gözden geçiriniz.', {
          position: 'bottom-right',
          autoClose: 4000,
        });
      },

      transformData: (data) => data.data,
    },
  });
};
export const sendPaytr = (body, successCallback) => async (dispatch) => {
  const url = `https://www.paytr.com/odeme`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      body: body,
      label: SEND_PAYTR,
      callBack: () => successCallback(),
      errorHandler: () => {
        toast.error('Bilgilerinizi gözden geçiriniz.', {
          position: 'bottom-right',
          autoClose: 4000,
        });
      },

      transformData: (data) => data.data,
    },
  });
};
export const checkResponsePaytr = (id) => async (dispatch) => {
  const url = `/appointment/calendar/appointment/${id}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: PAYTR_RESPONSE,
      transfomrData: (data) => data.data,
    },
  });
};