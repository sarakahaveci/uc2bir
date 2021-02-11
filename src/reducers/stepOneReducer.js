import {
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
    case REGISTER_STEP_ONE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

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
