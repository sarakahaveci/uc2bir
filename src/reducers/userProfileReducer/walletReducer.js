import {
  GET_WALLET_REQUEST,
  GET_WALLET_SUCCESS,
  GET_WALLET_FAILURE,
  GET_WALLET_TRANSACTIONS_SUCCESS,
  GET_WALLET_TRANSACTIONS_REQUEST,
  GET_WALLET_TRANSACTIONS_FAILURE,
  GET_WALLET_TRANSACTIONS_PERPAGE_REQUEST,
  GET_WALLET_TRANSACTIONS_PERPAGE_SUCCESS,
  GET_WALLET_TRANSACTIONS_PERPAGE_FAILURE,
  GET_BANK_ACCOUNT_REQUEST,
  GET_BANK_ACCOUNT_SUCCESS,
  GET_BANK_ACCOUNT_FAILURE,
  ADD_BANK_ACCOUNT_REQUEST,
  ADD_BANK_ACCOUNT_SUCCESS,
  ADD_BANK_ACCOUNT_FAILURE,
  UPDATE_BANK_ACCOUNT_REQUEST,
  UPDATE_BANK_ACCOUNT_SUCCESS,
  UPDATE_BANK_ACCOUNT_FAILURE,
  DELETE_BANK_ACCOUNT_REQUEST,
  DELETE_BANK_ACCOUNT_SUCCESS,
  DELETE_BANK_ACCOUNT_FAILURE,
} from '../../constants';

const initialState = {
  data: {},
  isLoading: false,
  error: null,
  transactionsData: [],
  transactionsPerPage: [],
  bankAccounts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_WALLET_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_WALLET_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case GET_WALLET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };

    case GET_WALLET_TRANSACTIONS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_WALLET_TRANSACTIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case GET_WALLET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        transactionsData: action.payload,
      };

    case GET_WALLET_TRANSACTIONS_PERPAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_WALLET_TRANSACTIONS_PERPAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case GET_WALLET_TRANSACTIONS_PERPAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        transactionsPerPage: action.payload,
      };

    case GET_BANK_ACCOUNT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_BANK_ACCOUNT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case GET_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bankAccounts: action.payload,
      };

    case ADD_BANK_ACCOUNT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADD_BANK_ACCOUNT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case ADD_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case UPDATE_BANK_ACCOUNT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case UPDATE_BANK_ACCOUNT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case UPDATE_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case DELETE_BANK_ACCOUNT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case DELETE_BANK_ACCOUNT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case DELETE_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
