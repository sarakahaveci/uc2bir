import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  GET_USER_CERTIFICATE_REQUEST,
  GET_USER_CERTIFICATE_SUCCESS,
  GET_USER_CERTIFICATE_FAILURE,
} from '../constants';

const initialState = {
  user: {},
  isLoading: false,
  error: null,
  isSuccess: false,
  certificate: [],
  reviewProfileId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_CERTIFICATE_REQUEST:
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
    case GET_USER_CERTIFICATE_FAILURE:
    case PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        error: action.payload.message,
      };
    case GET_USER_CERTIFICATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        certificate: action.payload,
      };
    default:
      return state;
  }
};
