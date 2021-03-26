import {
  ADD_DATE_TO_TEMPLATE,
  SET_SELECTED_DAY,
  DELETE_DATE_FROM_TEMPLATE,
} from '../../constants';

const initialState = {
  appliedDays: [
    {
      day: 0,
      slice: [
        {
          id: 1,
          hour: [5],
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
    {
      day: 1,
      slice: [
        {
          id: 1,
          hour: [5, 6, 7, 8, 9, 10],
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
  ],
  selectedDay: {
    day: 0,
    slice: [
      {
        id: 1,
        hour: [5, 6, 7, 8, 9, 10],
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
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATE_TO_TEMPLATE:
    case DELETE_DATE_FROM_TEMPLATE:
      return {
        appliedDays: action.payload.appliedDays,
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
