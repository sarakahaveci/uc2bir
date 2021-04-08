import {
  ADD_DATE_TO_TEMPLATE,
  SET_SELECTED_DAY,
  DELETE_DATE_FROM_TEMPLATE,
  GET_TEMPLATES_REQUEST,
  GET_TEMPLATES_SUCCESS,
  GET_TEMPLATES_FAILURE,
} from '../../constants';

const initialState = {
  appliedDays: [
    // {
    //   day: 0,
    //   slice: [
    //     {
    //       id: 1,
    //       hour: '10:00-16:00',
    //       branch: [5, 6],
    //       accept_guest: true,
    //       session_type: [
    //         { session: 'gym', location: [3] },
    //         { session: 'online' },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   day: 1,
    //   slice: [
    //     {
    //       id: 1,
    //       hour: '10:00-16:00',
    //       branch: [5, 6],
    //       accept_guest: true,
    //       session_type: [
    //         { session: 'gym', location: [3] },
    //         { session: 'online' },
    //       ],
    //     },
    //   ],
    // },
  ],
  selectedDay: {
    day: 0,
    slice: [
      {
        id: 1,
        hour: '10:00-16:00',
        branch: [5, 6],
        accept_guest: true,
        session_type: [
          { session: 'gym', location: [3] },
          { session: 'online' },
        ],
        place_type: [5, 6, 7],
      },
    ],
  },
  myTemplates: {
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

    case GET_TEMPLATES_FAILURE:
      return {
        ...state,
        myTemplates: {
          ...state.myTemplates,
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
