import {
  GET_MY_BRANCHES_REQUEST,
  GET_MY_BRANCHES_SUCCESS,
  GET_MY_BRANCHES_FAILURE,
} from '../../constants';

const initialState = {
  myBranches: {
    data: [],
    isLoading: false,
    error: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_BRANCHES_REQUEST:
      return {
        ...state,
        myBranches: {
          ...state.myBranches,
          isLoading: true,
        },
      };

    case GET_MY_BRANCHES_SUCCESS:
      return {
        ...state,
        myBranches: {
          data: action.payload,
          isLoading: false,
          error: null,
        },
      };

    case GET_MY_BRANCHES_FAILURE:
      return {
        ...state,
        myBranches: {
          ...state.myBranches,
          isLoading: false,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};
