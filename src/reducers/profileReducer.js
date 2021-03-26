import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  GET_PROFILE_INFO_REQUEST,
  GET_PROFILE_INFO_SUCCESS,
  GET_PROFILE_INFO_FAILURE,
} from '../constants';

const initialState = {
  user: {},
  isLoading: false,
  error: null,
  isSuccess: false,
  isSuccessGetDetail: false,
  reviewProfileId: null,
  userInfo: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_INFO_REQUEST:
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

    case GET_PROFILE_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        isLoading: false,
        error: null,
        isSuccessGetDetail: true,
      };

    case GET_PROFILE_INFO_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
        isSuccessGetDetail: false,
      };
    default:
      return state;
  }
};
