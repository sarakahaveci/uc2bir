import {
  HTTP_REQUEST,
  GET_WALLET,
  GET_WALLET_TRANSACTIONS,
  GET_WALLET_TRANSACTIONS_PERPAGE,
  GET_BANK_ACCOUNT,
  ADD_BANK_ACCOUNT,
  UPDATE_BANK_ACCOUNT,
  DELETE_BANK_ACCOUNT,
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

export const getBankAccount = () => async (dispatch) => {
  const url = `/user/wallet/bank-accounts`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_BANK_ACCOUNT,
      transformData: (data) => data.data,
    },
  });
};

export const addBankAccount =
  (data, successCallback, errorCallback) => async (dispatch) => {
    const url = `/user/wallet/add-bank-account`;

    await dispatch({
      type: HTTP_REQUEST,
      payload: {
        method: 'POST',
        url,
        label: ADD_BANK_ACCOUNT,
        body: {
          iban_no: data.iban_no,
          default: data.default,
          bank_title: data.bank_title,
          username: data.username,
        },
        transformData: (data) => data.data,
        callBack: () => successCallback(),
        errorHandler: (error) => errorCallback(error.message),
      },
    });
  };

export const updateBankAccount =
  (data, successCallback, errorCallback) => async (dispatch) => {
    const url = '/user/wallet/update-bank-account';

    await dispatch({
      type: HTTP_REQUEST,
      payload: {
        method: 'POST',
        url,
        label: UPDATE_BANK_ACCOUNT,
        body: {
          iban_no: data.iban_no,
          default: data.default,
          bank_title: data.bank_title,
          username: data.username,
          id: data.id,
        },
        transformData: (data) => data.data,
        callBack: () => successCallback(),
        errorHandler: (error) => errorCallback(error.message),
      },
    });
  };

export const deleteBankAccount =
  (data, successCallback, errorCallback) => async (dispatch) => {
    const url = `/user/wallet/delete-bank-account`;

    await dispatch({
      type: HTTP_REQUEST,
      payload: {
        method: 'POST',
        url,
        label: DELETE_BANK_ACCOUNT,
        body: { id: data.id },
        transformData: (data) => data.data,
        callBack: () => successCallback(),
        errorHandler: (error) => errorCallback(error.message),
      },
    });
  };
