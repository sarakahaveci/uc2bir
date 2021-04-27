import {
  GET_USER_RESERVATION_STATE_DATA_REQUEST,
  GET_USER_RESERVATION_STATE_DATA_SUCCESS,
  GET_USER_RESERVATION_STATE_DATA_FAILURE,
  USER_RESERVATION_FUNC,
  USER_RESERVATION_FUNC_SUCCESS,
  USER_RESERVATION_FUNC_REQUEST,
  USER_RESERVATION_FUNC_FAILURE,
} from '../../constants';

const initialState = {
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_RESERVATION_STATE_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_USER_RESERVATION_STATE_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case GET_USER_RESERVATION_STATE_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        [action.payload.status]: { ...action.payload },
      };
    /////
    case USER_RESERVATION_FUNC_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case USER_RESERVATION_FUNC_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case USER_RESERVATION_FUNC_SUCCESS:
      return {
        ...state,
        isLoading: false,
        funcStatus: { ...action.payload },
      };

    default:
      return state;
  }
};
