import {
  GET_HOME_CONTENT_REQUEST,
  GET_HOME_CONTENT_SUCCESS,
  GET_HOME_CONTENT_FAILURE,
} from 'constants/index';

const initialState = {
  content: {
    data: {},
    isLoading: false,
    error: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_HOME_CONTENT_REQUEST:
      return {
        ...state,
        content: {
          ...state.content,
          isLoading: true,
        },
      };

    case GET_HOME_CONTENT_SUCCESS:
      return {
        ...state,
        content: {
          data: action.payload,
          isLoading: false,
          error: null,
        },
      };

    case GET_HOME_CONTENT_FAILURE:
      return {
        ...state,
        content: {
          ...state.content,
          isLoading: false,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};
