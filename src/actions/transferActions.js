import {
    HTTP_REQUEST,
    TRANSFER_REFUND,
  } from '../constants';
  import { toast } from 'react-toastify';
  export const transferRefund = ( body, successCallback) => async (
    dispatch
  ) => {
    const url = `user/wallet/transfer-refund`;
  
    await dispatch({
      type: HTTP_REQUEST,
      payload: {
        method: 'POST',
        url,
        body: { ...body },
        label: TRANSFER_REFUND,
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