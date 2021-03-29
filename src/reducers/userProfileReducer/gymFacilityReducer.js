import {
  GET_USER_FACILITY_LIST_REQUEST,
  GET_USER_FACILITY_LIST_SUCCESS,
  GET_USER_FACILITY_LIST_FAILURE,
} from '../../constants';

const initialState = {
  list: {},
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_FACILITY_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_USER_FACILITY_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case GET_USER_FACILITY_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload,
      };

    default:
      return state;
  }
};
