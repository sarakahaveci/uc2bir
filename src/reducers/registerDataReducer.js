import {
  REGISTER_DATA_REQUEST,
  REGISTER_DATA_SUCCESS,
  REGISTER_DATA_FAILURE,
  VERIFY_CODE_REQUEST,
  VERIFY_CODE_FAILURE,
  VERIFY_CODE_SUCCESS,
} from '../constants';

const initialState = {
  data: null,
  message: '',
  isLoading: false,
  error: null,
  isSuccess: false,
  verifyCode: {
    isLoading: false,
    error: null,
    data: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case VERIFY_CODE_REQUEST:
      return {
        ...state,
        verifyCode: {
          ...state.verifyCode,
          isLoading: true,
        },
      };

    case VERIFY_CODE_SUCCESS:
      return {
        ...state,
        verifyCode: {
          ...state.verifyCode,
          isLoading: false,
        },
      };

    case REGISTER_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: false,
        isSuccess: true,
      };

    case REGISTER_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload,
        isSuccess: false,
      };

    case VERIFY_CODE_FAILURE:
      return {
        ...state,
        verifyCode: {
          ...state.verifyCode,
          isLoading: false,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};
