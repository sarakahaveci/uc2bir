import {
  GET_PROFILE_UPDATE_REQUEST,
  GET_PROFILE_UPDATE_SUCCESS,
  GET_PROFILE_UPDATE_FAILURE,
  SET_PROFILE_UPDATE_REQUEST,
  SET_PROFILE_UPDATE_SUCCESS,
  SET_PROFILE_UPDATE_FAILURE,
} from '../../constants';

const initialState = {
  detail: {
    isLoading: false,
    isSuccess: false,
    data: [],
    error: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE_UPDATE_REQUEST:
    case GET_PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        detail: {
          ...state.detail,
          isLoading: true,
        },
      };

    case SET_PROFILE_UPDATE_SUCCESS:
    case GET_PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        detail: {
          isLoading: false,
          data: action.payload,
          error: null,
          isSuccess: true,
        },
      };

    case SET_PROFILE_UPDATE_FAILURE:
    case GET_PROFILE_UPDATE_FAILURE:
      return {
        ...state,
        detail: {
          ...state.detail,
          isLoading: false,
          error: action.payload,
          isSuccess: false,
        },
      };

    default:
      return state;
  }
};
