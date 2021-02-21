import {
  QUIZ_GET_REQUEST,
  QUIZ_GET_SUCCESS,
  QUIZ_GET_FAILURE,
} from '../constants';

const initialState = {
  data: null,
  type: '',
  code: 0,
  message: '',
  isLoading: false,
  error: null,
  isSuccsess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case QUIZ_GET_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case QUIZ_GET_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isSuccsess: true,
        isLoading: false,
        error: null,
      };

    case QUIZ_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        isSuccsess: false,
        error: action.payload.message,
      };

    default:
      return state;
  }
};