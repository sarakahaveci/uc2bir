import {
  GET_MY_GALLERIES_REQUEST,
  GET_MY_GALLERIES_SUCCESS,
  GET_MY_GALLERIES_FAILURE,
} from '../../constants';

const initialState = {
  me: {
    data: [],
    isLoading: false,
    isSuccess: false,
    error: null,
  },
  galleries: {
    isLoading: false,
    isSuccess: false,
    error: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_GALLERIES_REQUEST:
      return {
        ...state,
        me: {
          ...state.me,
          isLoading: true,
        },
      };

    case GET_MY_GALLERIES_SUCCESS:
      return {
        ...state,
        me: {
          ...state.me,
          data: action.payload.data,
          isLoading: false,
          isSuccess: true,
          error: null,
        },
      };

    case GET_MY_GALLERIES_FAILURE:
      return {
        ...state,
        me: {
          ...state.me,
          error: action.payload,
          isLoading: false,
        },
      };

    default:
      return state;
  }
};
