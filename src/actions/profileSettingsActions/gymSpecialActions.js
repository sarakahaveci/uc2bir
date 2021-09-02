import { HTTP_REQUEST, UPDATE_GYM_SPECIAL_PRICE } from '../../constants';
import { toast } from 'react-toastify';

export const updateGymSpecialPrice =
  ({ price }) =>
  async (dispatch) => {
    const url = `/user/bs-price`;

    await dispatch({
      type: HTTP_REQUEST,
      payload: {
        method: 'POST',
        url,
        body: { price },
        label: UPDATE_GYM_SPECIAL_PRICE,
        callBack: () =>
          toast.success(
            'Talebiniz gönderildi; incelendikten sonra tarafınıza bildirim gönderilecektir.',
            {
              position: 'bottom-right',
              autoClose: 7000,
            }
          ),
        errorHandler: (res) =>
          toast.error(
            res?.message || 'Fiyat talebi gönderilirken hata ile karşılaşıldı',
            {
              position: 'bottom-right',
              autoClose: 4000,
            }
          ),
      },
    });
  };
