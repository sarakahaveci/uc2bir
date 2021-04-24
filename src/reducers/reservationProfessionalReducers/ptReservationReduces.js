import {
  GET_PT_RESERVATION_STATE_DATA_REQUEST,
  GET_PT_RESERVATION_STATE_DATA_SUCCESS,
  GET_PT_RESERVATION_STATE_DATA_FAILURE,
} from '../../constants';

const initialState = {
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PT_RESERVATION_STATE_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_PT_RESERVATION_STATE_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case GET_PT_RESERVATION_STATE_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      };

    default:
      return state;
  }
};
