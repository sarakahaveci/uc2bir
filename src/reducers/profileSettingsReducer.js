/* eslint-disable import/no-anonymous-default-export */
import {
  GET_MY_PROFILE_FILES_REQUEST,
  GET_MY_PROFILE_FILES_SUCCESS,
  GET_MY_PROFILE_FILES_FAILURE,
  SET_PROFILE_UPDATE_REQUEST,
  SET_PROFILE_UPDATE_SUCCESS,
  SET_PROFILE_UPDATE_FAILURE,
  GET_PROFILE_UPDATE_REQUEST,
  GET_PROFILE_UPDATE_SUCCESS,
  GET_PROFILE_UPDATE_FAILURE,
  SET_PASSWORD_UPDATE_REQUEST,
  SET_PASSWORD_UPDATE_SUCCESS,
  SET_PASSWORD_UPDATE_FAILURE,
  GET_ACTIVITY_LIST_REQUEST,
  GET_ACTIVITY_LIST_SUCCESS,
  GET_ACTIVITY_LIST_FAILURE,
  GET_ALL_ACTIVITY_LIST_REQUEST,
  GET_ALL_ACTIVITY_LIST_SUCCESS,
  GET_ALL_ACTIVITY_LIST_FAILURE,
} from '../constants';

const initialState = {
  files: {
    isLoading: false,
    data: [],
    error: null,
  },
  detail: {
    isLoading: false,
    isSuccess: false,
    data: [],
    error: null,
  },
  password: {
    isLoading: false,
    isSuccess: false,
    data: [],
    error: null,
  },

  activityList: {
    isLoading: false,
    data: [],
    error: null,
    allList: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ACTIVITY_LIST_REQUEST:
    case GET_ALL_ACTIVITY_LIST_REQUEST:
      return {
        ...state,
        activityList: {
          ...state.activityList,
          isLoading: true,
        },
      };

    case GET_ACTIVITY_LIST_SUCCESS:
      return {
        ...state,
        activityList: {
          ...state.activityList,
          isLoading: false,
          data: action.payload,
        },
      };

    case GET_ALL_ACTIVITY_LIST_SUCCESS:
      return {
        ...state,
        activityList: {
          ...state.activityList,
          isLoading: false,
          allList: action.payload,
        },
      };

    case GET_ACTIVITY_LIST_FAILURE:
      return {
        ...state,
        activityList: {
          ...state.activityList,
          isLoading: false,
          data: [],
          error: action.payload.message,
        },
      };

    case GET_ALL_ACTIVITY_LIST_FAILURE:
      return {
        ...state,
        activityList: {
          ...state.activityList,
          isLoading: false,
          allList: [],
          error: action.payload.message,
        },
      };

    case GET_MY_PROFILE_FILES_REQUEST:
      return {
        ...state,
        files: {
          ...state.files,
          isLoading: true,
        },
      };

    case SET_PROFILE_UPDATE_REQUEST:
    case GET_PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        detail: {
          ...state.detail,
          isLoading: true,
        },
      };

    case SET_PASSWORD_UPDATE_REQUEST:
      return {
        ...state,
        password: {
          ...state.detail,
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

    case SET_PASSWORD_UPDATE_SUCCESS:
      return {
        ...state,
        password: {
          isLoading: false,
          data: action.payload,
          error: null,
          isSuccess: true,
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

    case SET_PROFILE_UPDATE_FAILURE:
    case GET_PROFILE_UPDATE_FAILURE:
      return {
        ...state,
        detail: {
          ...state.files,
          isLoading: false,
          error: action.payload,
          isSuccess: false,
        },
      };

    case SET_PASSWORD_UPDATE_FAILURE:
      return {
        ...state,
        password: {
          ...state.files,
          isLoading: false,
          error: action.payload,
          isSuccess: false,
        },
      };

    default:
      return state;
  }
};
