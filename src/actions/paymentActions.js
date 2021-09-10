import {
  HTTP_REQUEST,
  SEND_RESERVATION,
  SEND_PACKET_RESERVATION,
  SEND_PAYTR,
  PAYTR_RESPONSE,
} from '../constants';
import { toast } from 'react-toastify';
// import { useTranslation } from 'react-i18next';

export const sendReservation =
  (type, body, successCallback) => async (dispatch) => {
    // const { t } = useTranslation();

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
          toast.success('İşlem Başarılı!', {
            position: 'bottom-right',
            autoClose: 1500,
          });

          successCallback();
        },
        errorHandler: (error) => {
          toast.error(JSON.stringify(error.message), {
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
    // const { t } = useTranslation();
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
          toast.success('İşlem Başarılı!', {
            position: 'bottom-right',
            autoClose: 4000,
          });
          successCallback();
        },
        errorHandler: (err) => {
          toast.error(err?.message || 'Review your information', {
            position: 'bottom-right',
            autoClose: 4000,
          });
        },

        transformData: (data) => data.data,
      },
    });
  };
export const sendGroupReservation =
  (body, successCallback) => async (dispatch) => {
    // const { t } = useTranslation();
    let url = '/appointment/pt-calendar/group';

    await dispatch({
      type: HTTP_REQUEST,
      payload: {
        method: 'POST',
        url,
        body: { ...body },
        label: SEND_PACKET_RESERVATION,
        callBack: () => {
          toast.success('İşlem Başarılı!', {
            position: 'bottom-right',
            autoClose: 4000,
          });
          successCallback();
        },
        errorHandler: (err) => {
          toast.error(err?.message || 'Review your information', {
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
  // const { t } = useTranslation();
  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      body: body,
      label: SEND_PAYTR,
      callBack: () => successCallback(),
      errorHandler: () => {
        toast.error('İşlem Başarısız!!', {
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
