import {
  REGISTER_DATA_REQUEST,
  REGISTER_DATA_SUCCESS,
  REGISTER_DATA_FAILURE,
} from '../constants';

const initialState = {
  data: null,
  message: '',
  isLoading: false,
  error: null,
  isSuccess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case REGISTER_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: false,
        isSuccess: true,
      };

    case REGISTER_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload,
        isSuccess: false,
      };

    default:
      return state;
  }
};
