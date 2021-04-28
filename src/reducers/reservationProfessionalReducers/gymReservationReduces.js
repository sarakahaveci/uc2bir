import {
  GET_GYM_RESERVATION_STATE_DATA_REQUEST,
  GET_GYM_RESERVATION_STATE_DATA_SUCCESS,
  GET_GYM_RESERVATION_STATE_DATA_FAILURE,
  GYM_RESERVATION_FUNC_SUCCESS,
  GYM_RESERVATION_FUNC_REQUEST,
  GYM_RESERVATION_FUNC_FAILURE,
} from '../../constants';

const initialState = {
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GYM_RESERVATION_STATE_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_GYM_RESERVATION_STATE_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case GET_GYM_RESERVATION_STATE_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        [action.payload.status]: { ...action.payload },
      };
    /////
    case GYM_RESERVATION_FUNC_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GYM_RESERVATION_FUNC_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case GYM_RESERVATION_FUNC_SUCCESS:
      return {
        ...state,
        isLoading: false,
        funcStatus: { ...action.payload },
      };

    default:
      return state;
  }
};
