import {
  GET_SYSTEM_COMMENTS_REQUEST,
  GET_SYSTEM_COMMENTS_SUCCESS,
  GET_SYSTEM_COMMENTS_FAILURE,
} from '../constants';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SYSTEM_COMMENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_SYSTEM_COMMENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case GET_SYSTEM_COMMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };

    default:
      return state;
  }
};
