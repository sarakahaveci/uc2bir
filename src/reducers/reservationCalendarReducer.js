import {
  GET_PT_RESERVATION_CALENDAR_FAILURE,
  GET_PT_RESERVATION_CALENDAR_SUCCESS,
  GET_PT_RESERVATION_CALENDAR_REQUEST,
  SEND_RESERVATİON,
} from '../constants';

const initialState = {
  data: {},
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PT_RESERVATION_CALENDAR_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_PT_RESERVATION_CALENDAR_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    case SEND_RESERVATİON:
    case GET_PT_RESERVATION_CALENDAR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };

    default:
      return state;
  }
};
