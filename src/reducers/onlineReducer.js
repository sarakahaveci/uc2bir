import {
  GENERATE_TWILIO_TOKEN_REQUEST,
  GENERATE_TWILIO_TOKEN_SUCCESS,
  GENERATE_TWILIO_TOKEN_FAILURE,
} from '../constants';

const initialState = {
  isLoading: false,
  error: null,
  token: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_TWILIO_TOKEN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GENERATE_TWILIO_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isLoading: false,
        error: null,
      };

    case GENERATE_TWILIO_TOKEN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    default:
      return state;
  }
};
