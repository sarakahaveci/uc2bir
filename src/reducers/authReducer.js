import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  USER_DETAILS_SET_FROM_STORAGE,
  SOCIAL_LOGIN_REQUEST,
  SOCIAL_LOGIN_SUCCESS,
  SOCIAL_LOGIN_FAILURE,
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
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    default:
      return state;
  }
};
