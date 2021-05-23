import {
  HTTP_REQUEST,
  GET_WALLET,
  GET_WALLET_TRANSACTIONS,
  GET_WALLET_TRANSACTIONS_PERPAGE,
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

export const getWalletTransactionsPerPage =
  (perPage = 25, page = 1, payment_type = 'all', date = 'all') =>
  async (dispatch) => {
    const url = `/user/wallet/get-transactions?perPage=${perPage}&page=${page}&payment_type=${payment_type}&date=${date}`;

    await dispatch({
      type: HTTP_REQUEST,
      payload: {
        method: 'GET',
        url,
        label: GET_WALLET_TRANSACTIONS_PERPAGE,
        transformData: (data) => data.data,
      },
    });
  };
