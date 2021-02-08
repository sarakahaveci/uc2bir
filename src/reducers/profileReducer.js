import { PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE } from '../constants';

const initialState = {
  user: {},
  isLoading: false,
  error: null,
  isSuccess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isSuccess: true,
        error: null,
      };

    case PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        error: action.payload.message,
      };

    default:
      return state;
  }
};
