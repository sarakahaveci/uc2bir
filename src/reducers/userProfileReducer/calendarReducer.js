import {
  GET_PROFESSIONAL_CALENDAR_REQUEST,
  GET_PROFESSIONAL_CALENDAR_SUCCESS,
  GET_PROFESSIONAL_CALENDAR_FAILURE,
} from '../../constants';

const initialState = {
  working_days: [],
  branches: [],
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFESSIONAL_CALENDAR_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_PROFESSIONAL_CALENDAR_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case GET_PROFESSIONAL_CALENDAR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        working_days: action.payload.working_days,
        branches: action.payload.branches,
      };

    default:
      return state;
  }
};
