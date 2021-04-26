import {
  GET_PT_RESERVATION_STATE_DATA_REQUEST,
  GET_PT_RESERVATION_STATE_DATA_SUCCESS,
  GET_PT_RESERVATION_STATE_DATA_FAILURE,
  PT_RESERVATION_FUNC,
  PT_RESERVATION_FUNC_SUCCESS,
  PT_RESERVATION_FUNC_REQUEST,
  PT_RESERVATION_FUNC_FAILURE,
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
        [action.payload.status]: { ...action.payload },
      };
    /////
    case PT_RESERVATION_FUNC:
      return {
        ...state,
        isLoading: true,
      };

    case PT_RESERVATION_FUNC_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case PT_RESERVATION_FUNC_SUCCESS:
      return {
        ...state,
        isLoading: false,
        funcStatus: { ...action.payload },
      };

    default:
      return state;
  }
};
