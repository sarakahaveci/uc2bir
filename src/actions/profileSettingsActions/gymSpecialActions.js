import { HTTP_REQUEST, UPDATE_GYM_SPECIAL_PRICE } from '../../constants';
import { toast } from 'react-toastify';
// import { useTranslation } from 'react-i18next';

export const updateGymSpecialPrice =
  ({ price }) =>
  async (dispatch) => {
    const url = `/user/bs-price`;
    // const { t } = useTranslation();

    await dispatch({
      type: HTTP_REQUEST,
      payload: {
        method: 'POST',
        url,
        body: { price },
        label: UPDATE_GYM_SPECIAL_PRICE,
        callBack: () =>
          toast.success(
            'After your request has been submitted, a notification will be sent to you',
            {
              position: 'bottom-right',
              autoClose: 7000,
            }
          ),
        errorHandler: (res) =>
          toast.error(
            res?.message || 'Error encountered while sending price request',
            {
              position: 'bottom-right',
              autoClose: 4000,
            }
          ),
      },
    });
  };
