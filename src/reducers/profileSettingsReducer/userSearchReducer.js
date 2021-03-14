import {
  SET_SEARCH_FILTERS,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
} from '../../constants';

const initialState = {
  pageNumber: 1,
  foundUsers: {
    data: [],
    isLoading: false,
    error: null,
  },
};

const sessionTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_FILTERS:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case SEARCH_USER_REQUEST:
      return {
        ...state,
        foundUsers: {
          ...state.foundUsers,
          isLoading: true,
        },
      };

    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        foundUsers: {
          data: action.payload,
          isLoading: false,
          error: null,
        },
      };

    case SEARCH_USER_FAILURE:
      return {
        ...state,
        foundUsers: {
          ...state.foundUsers,
          isLoading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

export default sessionTypeReducer;
