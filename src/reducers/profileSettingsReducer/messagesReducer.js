import {
  GET_ROOMS_REQUEST,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_FAILURE,
  MESSAGE_SEARCH,
  RESET_MESSAGE_SEARCH,
} from '../../constants';

const initialState = {
  rooms: {
    isLoading: false,
    data: [],
    error: null,
  },
  messageSearch: {
    searchValue: '',
    searched: false,
    foundRooms: [],
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

    case MESSAGE_SEARCH:
      return {
        ...state,
        messageSearch: {
          searchValue: action.payload.searchValue,
          searched: true,
          foundRooms: action.payload.foundRooms,
        },
      };

    case RESET_MESSAGE_SEARCH: {
      return {
        ...state,
        messageSearch: {
          searchValue: '',
          searched: false,
          foundRooms: [],
        },
      };
    }

    default:
      return state;
  }
};

export default messagesReducer;
