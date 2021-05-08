import {
  SEND_PAYTR_FAILURE,
  SEND_PAYTR_REQUEST,
  SEND_PAYTR_SUCCESS,
  SEND_RESERVATION_FAILURE,
  SEND_RESERVATION_REQUEST,
  SEND_RESERVATION_SUCCESS,
  PAYTR_RESPONSE_REQUEST,
  PAYTR_RESPONSE_FAILURE,
  PAYTR_RESPONSE_SUCCESS,
} from 'constants/index';

const initialState = {
  request: {
    data: {},
    isLoading: false,
    error: null,
  },
  paytr: {
    data: {},
    isLoading: false,
    error: null,
  },
  response: {
    data: {},
    isLoading: false,
    error: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_RESERVATION_REQUEST:
      return {
        ...state,
        request: {
          ...state.content,
          isLoading: true,
        },
      };

    case SEND_RESERVATION_SUCCESS:
      return {
        ...state,
        request: {
          data: action.payload,
          isLoading: false,
          error: null,
        },
      };

    case SEND_RESERVATION_FAILURE:
      return {
        ...state,
        request: {
          ...state.content,
          isLoading: false,
          error: action.payload,
        },
      };
    /////
    case SEND_PAYTR_REQUEST:
      return {
        ...state,
        paytr: {
          ...state.content,
          isLoading: true,
        },
      };

    case SEND_PAYTR_SUCCESS:
      return {
        ...state,
        paytr: {
          data: action.payload,
          isLoading: false,
          error: null,
        },
      };

    case SEND_PAYTR_FAILURE:
      return {
        ...state,
        paytr: {
          ...state.content,
          isLoading: false,
          error: action.payload,
        },
      };
    /////
    case PAYTR_RESPONSE_REQUEST:
      return {
        ...state,
        response: {
          ...state.content,
          isLoading: true,
        },
      };

    case PAYTR_RESPONSE_SUCCESS:
      return {
        ...state,
        response: {
          data: action.payload,
          isLoading: false,
          error: null,
        },
      };

    case PAYTR_RESPONSE_FAILURE:
      return {
        ...state,
        response: {
          ...state.content,
          isLoading: false,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};
