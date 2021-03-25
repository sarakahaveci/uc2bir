import {
  ADD_DATE_TO_TEMPLATE,
  SET_SELECTED_DAY,
  DELETE_DATE_FROM_TEMPLATE,
} from '../../constants';

const initialState = {
  appliedTemplates: [
    {
      day: 0,
      dates: [
        {
          id: 1,
          hours: [5, 10],
          branches: ['5', '6', '7'],
          sessionTypes: ['2', '3', '4'],
          placeTypes: [5, 6, 7],
        },
      ],
    },
  ],
  selectedDay: {
    day: 0,
    dates: [
      {
        id: 1,
        hours: [5, 10],
        branches: ['5', '6', '7'],
        sessionTypes: ['2', '3', '4'],
        placeTypes: [5, 6, 7],
      },
    ],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATE_TO_TEMPLATE:
      return {
        appliedTemplates: action.payload.appliedTemplates,
        selectedDay: action.payload.selectedDay,
      };

    case DELETE_DATE_FROM_TEMPLATE:
      return {
        appliedTemplates: action.payload.appliedTemplates,
        selectedDay: action.payload.selectedDay,
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
