import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  USER_DETAILS_SET_FROM_STORAGE,
  SOCIAL_LOGIN_REQUEST,
  SOCIAL_LOGIN_SUCCESS,
  SOCIAL_LOGIN_FAILURE,
  REGISTER_STEP_ONE_REQUEST,
  REGISTER_STEP_ONE_SUCCESS,
  REGISTER_STEP_ONE_FAILURE,
} from '../constants';

const initialState = {
  user: {},
  accessToken: '',
  refreshToken: '',
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case SOCIAL_LOGIN_REQUEST:
    case REGISTER_STEP_ONE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case SOCIAL_LOGIN_SUCCESS:
    case USER_DETAILS_SET_FROM_STORAGE:
      return {
        ...action.payload,
        isLoading: false,
        error: null,
        isAuthenticated: true,
      };

    case LOGIN_SUCCESS:
    case REGISTER_STEP_ONE_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.token,
        refreshToken: action.payload.refresh_token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case LOGIN_FAILURE:
    case SOCIAL_LOGIN_FAILURE:
    case REGISTER_STEP_ONE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    default:
      return state;
  }
};
