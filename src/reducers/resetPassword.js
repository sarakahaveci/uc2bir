import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
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
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isSuccsess: true,
        isLoading: false,
        error: null,
      };

    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        isSuccsess: true,
        error: action.payload.message,
      };

    default:
      return state;
  }
};