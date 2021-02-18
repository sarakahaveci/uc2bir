import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
} from '../constants';

const initialState = {
  data: null,
  type: '',
  code: 0,
  message: '',
  isLoading: false,
  error: null,
  isSuccsess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isSuccsess: true,
        isLoading: false,
        error: null,
      };

    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        isSuccsess: false,
        error: action.payload.message,
      };

    default:
      return state;
  }
};