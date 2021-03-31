import {
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,
} from '../../constants';

const initialState = {
  userInfo: {},
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_USER_INFO_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userInfo: action.payload,
      };

    default:
      return state;
  }
};
