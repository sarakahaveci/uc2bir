import {
  GET_ROOMS_REQUEST,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_FAILURE,
} from '../../constants';

const initialState = {
  rooms: {
    isLoading: false,
    data: [],
    error: null,
  },
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROOMS_REQUEST:
      return {
        ...state,
        rooms: {
          ...state.rooms,
          isLoading: true,
        },
      };

    case GET_ROOMS_SUCCESS:
      return {
        ...state,
        rooms: {
          isLoading: false,
          data: action.payload,
          error: null,
        },
      };

    case GET_ROOMS_FAILURE:
      return {
        ...state,
        rooms: {
          ...state.rooms,
          isLoading: false,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};

export default messagesReducer;
