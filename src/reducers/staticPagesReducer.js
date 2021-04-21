import {
  GET_STATIC_PAGE_FAILURE,
  GET_STATIC_PAGE_REQUEST,
  GET_STATIC_PAGE_SUCCESS,
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
    case GET_STATIC_PAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_STATIC_PAGE_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isSuccsess: true,
        isLoading: false,
        error: null,
      };

    case GET_STATIC_PAGE_FAILURE:
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
