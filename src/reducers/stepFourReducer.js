import {
  REGISTER_STEP_FOUR_REQUEST,
  REGISTER_STEP_FOUR_SUCCESS,
  REGISTER_STEP_FOUR_FAILURE,
} from '../constants';

const initialState = {
  data: null,
  type: '',
  code: 0,
  message: '',
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isSuccsess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_STEP_FOUR_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case REGISTER_STEP_FOUR_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isAuthenticated: true,
        isSuccsess: true,
        isLoading: false,
        error: null,
      };

    case REGISTER_STEP_FOUR_FAILURE:
      return {
        ...state,
        isLoading: false,
        isSuccsess: true,
        error: action.payload.response.data,
      };

    default:
      return state;
  }
};
