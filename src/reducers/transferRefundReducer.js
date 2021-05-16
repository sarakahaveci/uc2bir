import {
    TRANSFER_REFUND_REQUEST,
    TRANSFER_REFUND_SUCCESS,
    TRANSFER_REFUND_FAILURE,
  } from '../constants';
  
  const initialState = {
    data: {},
    isLoading: false,
    error: null,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case TRANSFER_REFUND_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
  
      case TRANSFER_REFUND_SUCCESS:
        return {
          ...state,
          data: action.payload,
          isLoading: false,
          error: null,
          isSuccess: true,
        };
  
      case TRANSFER_REFUND_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload.message,
        };
  
      default:
        return state;
    }
  };
  