/* eslint-disable import/no-anonymous-default-export */
import {
  GET_CANCELLATION_REASONS_REQUEST,
  GET_CANCELLATION_REASONS_SUCCESS,
  GET_CANCELLATION_REASONS_FAILURE,
  CANCEL_PROFILE_REQUEST,
  CANCEL_PROFILE_SUCCESS,
  CANCEL_PROFILE_FAILURE,
} from '../../constants';

const initialState = {
  reasons: {
    isLoading: true,
    data: [],
    error: null,
  },
  cancelProfile: {
    isLoading: false,
    error: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CANCELLATION_REASONS_REQUEST:
      return {
        ...state,
        reasons: {
          ...state.reasons,
          isLoading: true,
        },
      };

    case CANCEL_PROFILE_REQUEST:
      return {
        ...state,
        cancelProfile: {
          ...state.cancelProfile,
          isLoading: true,
        },
      };

    case GET_CANCELLATION_REASONS_SUCCESS:
      return {
        ...state,
        reasons: {
          isLoading: false,
          data: action.payload,
          error: null,
        },
      };

    case CANCEL_PROFILE_SUCCESS:
      return {
        ...state,
        cancelProfile: {
          isLoading: false,
          erorr: null,
        },
      };

    case CANCEL_PROFILE_FAILURE:
      return {
        ...state,
        cancelProfile: {
          isLoading: false,
          erorr: action.payload,
        },
      };

    case GET_CANCELLATION_REASONS_FAILURE:
      return {
        ...state,
        reasons: {
          ...state.reasons,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};
