import {
  HTTP_REQUEST,
  SEND_RESERVATION,
  SEND_PACKET_RESERVATION,
  SEND_PAYTR,
  PAYTR_RESPONSE,
} from '../constants';
import { toast } from 'react-toastify';
export const sendReservation =
  (type, body, successCallback) => async (dispatch) => {
    let url = `/appointment/${type}-calendar`;
    if (type == 'upgrade_packet') url = '/user/pt-package/upgrade';
    await dispatch({
      type: HTTP_REQUEST,
      payload: {
        method: 'POST',
        url,
        body: { ...body },
        label: SEND_RESERVATION,
        callBack: () => {
          toast.success('İşleminiz başarılı!', {
            position: 'bottom-right',
            autoClose: 1500,
          });

          successCallback();
        },
        errorHandler: (error) => {
          toast.error(error.message, {
            position: 'bottom-right',
            autoClose: 2000,
          });
        },

        transformData: (data) => data.data,
      },
    });
  };
export const sendPackageReservation =
  (type, body, successCallback) => async (dispatch) => {
    let url;

    switch (type) {
      case 'pt':
        url = `/user/pt-package/buy`;
        break;
      case 'dt':
        url = `/user/dt-package/buy`;
        break; 
      default:
        break;
    }

    await dispatch({
      type: HTTP_REQUEST,
      payload: {
        method: 'POST',
        url,
        body: { ...body },
        label: SEND_PACKET_RESERVATION,
        callBack: () => {
          toast.success('İşleminiz başarılı.', {
            position: 'bottom-right',
            autoClose: 4000,
          });
          successCallback();
        },
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
