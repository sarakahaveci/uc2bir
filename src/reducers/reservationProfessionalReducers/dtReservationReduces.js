import {
  GET_DT_RESERVATION_STATE_DATA_REQUEST,
  GET_DT_RESERVATION_STATE_DATA_SUCCESS,
  GET_DT_RESERVATION_STATE_DATA_FAILURE,
  DT_RESERVATION_FUNC,
  DT_RESERVATION_FUNC_SUCCESS,
  DT_RESERVATION_FUNC_REQUEST,
  DT_RESERVATION_FUNC_FAILURE,
  GET_DT_RESERVATION_PACKAGE_SUCCESS,
  GET_DT_RESERVATION_PACKAGE_REQUEST,
  GET_DT_RESERVATION_PACKAGE_FAILURE
} from '../../constants';

const initialState = {
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DT_RESERVATION_STATE_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_DT_RESERVATION_STATE_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case GET_DT_RESERVATION_STATE_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        [action.payload.status]: { ...action.payload },
      };
    /////
    case DT_RESERVATION_FUNC_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case DT_RESERVATION_FUNC_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case DT_RESERVATION_FUNC_SUCCESS:
      return {
        ...state,
        isLoading: false,
        funcStatus: { ...action.payload },
      };
      case GET_DT_RESERVATION_PACKAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_DT_RESERVATION_PACKAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case GET_DT_RESERVATION_PACKAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        packets: action.payload,
      };

    default:
      return state;
  }
};
