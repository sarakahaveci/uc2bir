/* eslint-disable import/no-anonymous-default-export */
import {
  GET_DIETITIAN_PRICE_REQUEST,
  GET_DIETITIAN_PRICE_SUCCESS,
  GET_DIETITIAN_PRICE_FAILURE,
  UPDATE_DIETITIAN_PRICE_REQUEST,
  UPDATE_DIETITIAN_PRICE_SUCCESS,
  UPDATE_DIETITIAN_PRICE_FAILURE,
} from '../../constants';

const initialState = {
  price: {
    price: '',
    waiting_approval_price: null,
    isLoading: false,
    error: null,
    updatePriceErrorMessage: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DIETITIAN_PRICE_REQUEST:
      return {
        ...state,
        price: {
          ...state.price,
        },
      };

    case UPDATE_DIETITIAN_PRICE_SUCCESS:
      return {
        ...state,
        price: {
          ...state.price,
          updatePriceErrorMessage: null,
        },
      };

    case UPDATE_DIETITIAN_PRICE_FAILURE:
      return {
        ...state,
        price: {
          ...state.price,
          updatePriceErrorMessage: action.payload,
        },
      };

    case GET_DIETITIAN_PRICE_REQUEST:
      return {
        ...state,
        price: {
          ...state.price,
          isLoading: true,
        },
      };

    case GET_DIETITIAN_PRICE_SUCCESS:
      return {
        ...state,
        price: {
          ...state.price,
          price: action.payload.price,
          waiting_approval_price: action.payload?.waiting_approval_price,
          isLoading: false,
          error: null,
        },
      };

    case GET_DIETITIAN_PRICE_FAILURE:
      return {
        ...state,
        price: {
          ...state.price,
          price: null,
          waiting_approval_price: null,
          error: action.payload,
          isLoading: false,
        },
      };
    default:
      return state;
  }
};
