import {
  REGISTER_STEP_ONE_REQUEST,
  REGISTER_STEP_ONE_SUCCESS,
  REGISTER_STEP_ONE_FAILURE,
} from '../constants';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
  isSuccess: false,
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
        data: action.payload.data,
        isLoading: false,
        isSuccess: true,
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
