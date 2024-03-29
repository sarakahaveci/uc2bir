import {
  SEND_RESERVATION_FAILURE,
  SEND_RESERVATION_REQUEST,
  SEND_RESERVATION_SUCCESS,
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

    default:
      return state;
  }
};
