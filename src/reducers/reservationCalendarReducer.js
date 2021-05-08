import {
  GET_PT_RESERVATION_CALENDAR_FAILURE,
  GET_PT_RESERVATION_CALENDAR_SUCCESS,
  GET_PT_RESERVATION_CALENDAR_REQUEST,
  GET_PT_FOR_GYM_SUCCESS,
  GET_PT_FOR_GYM_REQUEST,
  GET_PT_FOR_GYM_FAILURE,
  GET_GYM_RESERVATION_CALENDAR_FAILURE,
  GET_GYM_RESERVATION_CALENDAR_SUCCESS,
  GET_GYM_RESERVATION_CALENDAR_REQUEST,
  GET_AREA_FOR_PT_REQUEST,
  GET_AREA_FOR_PT_SUCCESS,
  GET_AREA_FOR_PT_FAILURE,
  CLEAR_RESERVATIONCALENDAR,
} from '../constants';

const initialState = {
  data: {},
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    //
    case GET_PT_RESERVATION_CALENDAR_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_PT_RESERVATION_CALENDAR_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    case GET_PT_RESERVATION_CALENDAR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    //

    case GET_AREA_FOR_PT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_AREA_FOR_PT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    case GET_AREA_FOR_PT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    //For sport area GYM

    case GET_GYM_RESERVATION_CALENDAR_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_GYM_RESERVATION_CALENDAR_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    case GET_GYM_RESERVATION_CALENDAR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };

    case GET_PT_FOR_GYM_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_PT_FOR_GYM_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    case GET_PT_FOR_GYM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case CLEAR_RESERVATIONCALENDAR:
      return {
        ...state,
        isLoading: false,
        data: {},
      };

    default:
      return state;
  }
};
