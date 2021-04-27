import {
  ADD_DATE_TO_TEMPLATE,
  SET_SELECTED_DAY,
  DELETE_DATE_FROM_TEMPLATE,
  GET_TEMPLATES_REQUEST,
  GET_TEMPLATES_SUCCESS,
  GET_TEMPLATES_FAILURE,
  GET_TEMPLATE_DETAILS_REQUEST,
  GET_TEMPLATE_DETAILS_SUCCESS,
  GET_TEMPLATE_DETAILS_FAILURE,
  GET_TEMPLATE_FROM_CALENDAR_REQUEST,
  GET_TEMPLATE_FROM_CALENDAR_SUCCESS,
  GET_TEMPLATE_FROM_CALENDAR_FAILURE,
  GET_DAY_OF_CALENDER_REQUEST,
  GET_DAY_OF_CALENDER_SUCCESS,
  GET_DAY_OF_CALENDER_FAILURE,
  GET_DAY_DETAIL_OF_CALENDER_FAILURE,
  GET_DAY_DETAIL_OF_CALENDER_REQUEST,
  GET_DAY_DETAIL_OF_CALENDER_SUCCESS
} from '../../constants';

const initialState = {
  appliedDays: [],
  selectedDay: {},
  myTemplates: {
    data: [],
    isLoading: false,
    error: null,
  },
  templateDetails: {
    data: [],
    isLoading: false,
    error: null,
  },

  availableDates: {
    data: [],
    isLoading: false,
    error: null,
  },

  availableHours: {
    data: [],
    isLoading: false,
    error: null,
  },

  detailHour: {
    data: [],
    isLoading: false,
    error: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATE_TO_TEMPLATE:
    case DELETE_DATE_FROM_TEMPLATE:
      return {
        ...state,
        appliedDays: action.payload.appliedDays,
        selectedDay: action.payload.selectedDay,
      };

    case GET_TEMPLATE_DETAILS_REQUEST:
      return {
        ...state,
        templateDetails: {
          ...state.templateDetails,
          isLoading: true,
        },
      };

    case GET_TEMPLATE_DETAILS_SUCCESS:
      return {
        ...state,
        templateDetails: {
          isLoading: false,
          data: action.payload,
          error: null,
        },
      };

    case GET_TEMPLATES_REQUEST:
      return {
        ...state,
        myTemplates: {
          ...state.myTemplates,
          isLoading: true,
        },
      };

    case GET_TEMPLATES_SUCCESS:
      return {
        ...state,
        myTemplates: {
          isLoading: false,
          data: action.payload,
          error: null,
        },
      };

    case GET_TEMPLATE_DETAILS_FAILURE:
      return {
        ...state,
        templateDetails: {
          ...state.templateDetails,
          isLoading: false,
          error: action.payload,
        },
      };

    case GET_TEMPLATES_FAILURE:
      return {
        ...state,
        myTemplates: {
          ...state.myTemplates,
          isLoading: false,
          error: action.payload,
        },
      };

    case GET_TEMPLATE_FROM_CALENDAR_REQUEST:
      return {
        ...state,
        availableDates: {
          ...state.availableDates,
          isLoading: true,
        },
      };

    case GET_TEMPLATE_FROM_CALENDAR_SUCCESS:
      return {
        ...state,
        availableDates: {
          isLoading: false,
          data: action.payload,
          error: null,
        },
      };

    case GET_TEMPLATE_FROM_CALENDAR_FAILURE:
      return {
        ...state,
        availableDates: {
          ...state.availableDates,
          isLoading: false,
          error: action.payload,
        },
      };

    case GET_DAY_OF_CALENDER_REQUEST:
      return {
        ...state,
        availableHours: {
          ...state.availableHours,
          isLoading: true,
        },
      };

    case GET_DAY_OF_CALENDER_SUCCESS:
      return {
        ...state,
        availableHours: {
          isLoading: false,
          data: action.payload,
          error: null,
        },
      };

    case GET_DAY_DETAIL_OF_CALENDER_FAILURE:
      return {
        ...state,
        availableHours: {
          ...state.availableHours,
          isLoading: false,
          error: action.payload,
        },
      };

    case GET_DAY_DETAIL_OF_CALENDER_REQUEST:
      return {
        ...state,
        detailHour: {
          ...state.detailHour,
          isLoading: true,
        },
      };

    case GET_DAY_DETAIL_OF_CALENDER_SUCCESS:
      return {
        ...state,
        detailHour: {
          isLoading: false,
          data: action.payload,
          error: null,
        },
      };

    case GET_DAY_OF_CALENDER_FAILURE:
      return {
        ...state,
        detailHour: {
          ...state.detailHour,
          isLoading: false,
          error: action.payload,
        },
      };


    case SET_SELECTED_DAY:
      return {
        ...state,
        selectedDay: action.payload,
      };
    default:
      return state;
  }
};
