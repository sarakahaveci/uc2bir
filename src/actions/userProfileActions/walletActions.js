import {
  HTTP_REQUEST,
  GET_WALLET,
  GET_WALLET_TRANSACTIONS,
} from '../../constants';

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

export const getWalletTransactions = () => async (dispatch) => {
  const url = `/user/wallet/get-transactions`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_WALLET_TRANSACTIONS,
      transformData: (data) => data.data,
    },
  });
};
