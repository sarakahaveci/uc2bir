/* eslint-disable import/no-anonymous-default-export */
import {
  SET_PASSWORD_UPDATE_REQUEST,
  SET_PASSWORD_UPDATE_SUCCESS,
  SET_PASSWORD_UPDATE_FAILURE,
  GET_ACTIVITY_LIST_REQUEST,
  GET_ACTIVITY_LIST_SUCCESS,
  GET_ACTIVITY_LIST_FAILURE,
  GET_ALL_ACTIVITY_LIST_REQUEST,
  GET_ALL_ACTIVITY_LIST_SUCCESS,
  GET_ALL_ACTIVITY_LIST_FAILURE,
  GET_PT_BRANCH_REQUEST,
  GET_PT_BRANCH_SUCCESS,
  GET_PT_BRANCH_FAILURE,
  GET_PT_ALL_BRANCH_REQUEST,
  GET_PT_ALL_BRANCH_SUCCESS,
  GET_PT_ALL_BRANCH_FAILURE,
  GET_VKI_REQUEST,
  GET_VKI_SUCCESS,
  GET_VKI_FAILURE,
  SET_VKI_REQUEST,
  SET_VKI_SUCCESS,
  SET_VKI_FAILURE,
} from '../constants';

const initialState = {
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
  ptBranchList: {
    isLoading: false,
    data: [],
    error: null,
    allList: [],
  },
  vki: {
    isLoading: false,
    data: [],
    error: null,
    isSuccsess: false,
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_VKI_REQUEST:
    case SET_VKI_REQUEST:
      return {
        ...state,
        vki: {
          ...state.vki,
          isLoading: true,
        }
      };
    case GET_PT_BRANCH_REQUEST:
    case GET_PT_ALL_BRANCH_REQUEST:
      return {
        ...state,
        ptBranchList: {
          ...state.ptBranchList,
          isLoading: true,
        },
      };
    case GET_PT_BRANCH_FAILURE:
    case GET_PT_ALL_BRANCH_FAILURE:
      return {
        ...state,
        ptBranchList: {
          ...state.ptBranchList,
          isLoading: false,
          error: action.payload.message,
        },
      };
    case GET_PT_BRANCH_SUCCESS:
      return {
        ...state,
        ptBranchList: {
          ...state.ptBranchList,
          isLoading: false,
          data: action.payload,
        },
      };
    case GET_PT_ALL_BRANCH_SUCCESS:
      return {
        ...state,
        ptBranchList: {
          ...state.ptBranchList,
          isLoading: false,
          allList: action.payload,
        },
      };
    case GET_ACTIVITY_LIST_REQUEST:
    case GET_ALL_ACTIVITY_LIST_REQUEST:
      return {
        ...state,
        activityList: {
          ...state.activityList,
          isLoading: true,
        },
      };

      case GET_VKI_SUCCESS:
      case SET_VKI_SUCCESS:
        return {
          ...state,
          vki: {
            ...state.vki,
            isLoading: false,
            data: action.payload,
            isSuccess: true,
          }
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

      case GET_VKI_FAILURE:
      case SET_VKI_FAILURE:
        return {
          ...state,
          vki: {
            ...state.vki,
            isLoading: false,
            data: [],
            error: action.payload.message,
          }
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

    case SET_PASSWORD_UPDATE_REQUEST:
      return {
        ...state,
        password: {
          ...state.detail,
          isLoading: true,
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
