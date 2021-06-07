import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  USER_DETAILS_SET_FROM_STORAGE,
  SOCIAL_LOGIN_REQUEST,
  SOCIAL_LOGIN_SUCCESS,
  SOCIAL_LOGIN_FAILURE,
  REGISTER_STEP_TWO_REQUEST,
  REGISTER_STEP_TWO_SUCCESS,
  REGISTER_STEP_TWO_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  LOGOUT,
  USER_INFORMATION_REQUEST,
  USER_INFORMATION_SUCCESS,
  USER_INFORMATION_FAILURE,
  SET_USER_DETAILS,
  REFRESH_LOGIN,
} from '../constants';

const initialState = {
  user: {},
  accessToken: '',
  refreshToken: '',
  isLoading: false,
  error: null,
  isAuthenticated: false,
  authFiles: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case RESET_PASSWORD_REQUEST:
    case SOCIAL_LOGIN_REQUEST:
    case REGISTER_STEP_TWO_REQUEST:
    case USER_INFORMATION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case SOCIAL_LOGIN_SUCCESS:
    case USER_DETAILS_SET_FROM_STORAGE:
      return {
        accessToken:action.payload?.token,
        ...action.payload,
        isLoading: false,
        error: null,
        isAuthenticated: true,
      };

    case LOGIN_SUCCESS:
    case REGISTER_STEP_TWO_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
    case USER_INFORMATION_SUCCESS:
    case REFRESH_LOGIN:
      return {
        ...state,
        user: action.payload?.user,
        accessToken: action?.payload?.token,
        refreshToken: action?.payload?.refresh_token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case LOGOUT:
      return {
        user: {},
        accessToken: '',
        refreshToken: '',
        isLoading: false,
        error: null,
        isAuthenticated: false,
      };

    case SET_USER_DETAILS:
      return {
        ...state,
        user: action.payload,
      };

    case LOGIN_FAILURE:
    case SOCIAL_LOGIN_FAILURE:
    case REGISTER_STEP_TWO_FAILURE:
    case RESET_PASSWORD_FAILURE:
    case USER_INFORMATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    default:
      return state;
  }
};
