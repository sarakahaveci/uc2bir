import {
  GET_USER_BRANCH_REQUEST,
  GET_USER_BRANCH_SUCCESS,
  GET_USER_BRANCH_FAILURE,
} from '../../constants';

const initialState = {
  branches: {},
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_BRANCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_USER_BRANCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case GET_USER_BRANCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        branches: action.payload,
      };

    default:
      return state;
  }
};
