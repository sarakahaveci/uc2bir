import {
  GET_USER_CERTIFICATE_REQUEST,
  GET_USER_CERTIFICATE_SUCCESS,
  GET_USER_CERTIFICATE_FAILURE,
} from '../../constants';

const initialState = {
  certificate: [],
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_CERTIFICATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_USER_CERTIFICATE_FAILURE:
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
