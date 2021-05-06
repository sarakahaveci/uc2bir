import {
  GET_PACKET_DETAIL_REQUEST,
  GET_PACKET_DETAIL_SUCCESS,
  GET_PACKET_DETAIL_FAILURE,
  SET_PACKET_RESERVATION,
  CLEAR_PACKET_RESERVATION,
} from '../constants';

const initialState = {
  isLoading: false,
  error: null,
  data: {},
  reservation: {
    level: 'A',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PACKET_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_PACKET_DETAIL_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: null,
      };

    case GET_PACKET_DETAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    case SET_PACKET_RESERVATION:
      return {
        ...state,
        reservation: { ...state.reservation, ...action.payload },
        isLoading: true,
      };
    case CLEAR_PACKET_RESERVATION:
      return {
        ...state,
        reservation: {},
        isLoading: true,
      };
    default:
      return state;
  }
};
