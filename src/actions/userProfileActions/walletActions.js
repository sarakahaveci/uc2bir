import { HTTP_REQUEST, GET_WALLET } from '../../constants';

export const getWallet = () => async (dispatch) => {
  const url = `/user/wallet/get-wallet`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_WALLET,
      transformData: (data) => data.data,
    },
  });
};
