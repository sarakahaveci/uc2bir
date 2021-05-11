import {
  SEND_PACKET_RESERVATION_FAILURE,
  SEND_PACKET_RESERVATION_REQUEST,
  SEND_PACKET_RESERVATION_SUCCESS,
} from 'constants/index';

const initialState = {
  request: {
    data: {},
    isLoading: false,
    error: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_PACKET_RESERVATION_REQUEST:
      return {
        ...state,
        request: {
          ...state.request,
          isLoading: true,
        },
      };

    case SEND_PACKET_RESERVATION_SUCCESS:
      return {
        ...state,
        request: {
          data: action.payload,
          isLoading: false,
          error: null,
        },
      };

    case SEND_PACKET_RESERVATION_FAILURE:
      return {
        ...state,
        request: {
          ...state.request,
          isLoading: false,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};
