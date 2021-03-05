import {
  GET_FAVORITE_USERS_REQUEST,
  GET_FAVORITE_USERS_SUCCESS,
  GET_FAVORITE_USERS_FAILURE,
} from '../../constants';

const initialState = {
  favoriteUsers: {
    data: [],
    isLoading: false,
    error: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVORITE_USERS_REQUEST:
      return {
        ...state,
        favoriteUsers: {
          ...state.favoriteUsers,
          isLoading: true,
        },
      };

    case GET_FAVORITE_USERS_SUCCESS:
      return {
        ...state,
        favoriteUsers: {
          ...state.favoriteUsers,
          data: action.payload,
          isLoading: false,
          error: null,
        },
      };

    case GET_FAVORITE_USERS_FAILURE:
      return {
        ...state,
        favoriteUsers: {
          ...state.favoriteUsers,
          error: action.payload,
          isLoading: false,
        },
      };
    default:
      return state;
  }
};
