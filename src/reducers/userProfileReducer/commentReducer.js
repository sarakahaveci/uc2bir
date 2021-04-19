import {
  GET_USER_COMMENT_REQUEST,
  GET_USER_COMMENT_SUCCESS,
  GET_USER_COMMENT_FAILURE,
} from '../../constants';

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_COMMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_USER_COMMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case GET_USER_COMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: action.payload,
      };

    default:
      return state;
  }
};
