import {
  GET_MY_PROFILE_FILES_REQUEST,
  GET_MY_PROFILE_FILES_SUCCESS,
  GET_MY_PROFILE_FILES_FAILURE,
} from '../../constants';

const initialState = {
  files: {
    isLoading: false,
    data: [],
    error: null,
  },
};

const fileSettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_PROFILE_FILES_REQUEST:
      return {
        ...state,
        files: {
          ...state.files,
          isLoading: true,
        },
      };

    case GET_MY_PROFILE_FILES_SUCCESS:
      return {
        ...state,
        files: {
          isLoading: false,
          data: action.payload,
          error: null,
        },
      };

    case GET_MY_PROFILE_FILES_FAILURE:
      return {
        ...state,
        files: {
          ...state.files,
          isLoading: false,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};

export default fileSettingsReducer;
