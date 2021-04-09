import {
  GET_ROOMS_REQUEST,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_FAILURE,
  MESSAGE_SEARCH,
  RESET_MESSAGE_SEARCH,
  GET_ROOM_MESSAGES_REQUEST,
  GET_ROOM_MESSAGES_SUCCESS,
  GET_ROOM_MESSAGES_FAILURE,
  SET_ROOM_NAME,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
  RESET_MESSAGES,
  MESSAGE_SIDEBAR_OPEN,
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
  messages: {
    isLoading: true,
    allMessages: [],
    error: null,
  },
  selectedRoom: {
    selectedRoomName: null,
    selectedRoomUser: null,
  },
  isSuccessSendMessage: false,
  messageSideBarOpen: false,
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
      return {
        ...state,
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        isSuccessSendMessage: true,
      };
    case SEND_MESSAGE_FAILURE:
      return {
        ...state,
        isSuccessSendMessage: false,
      };
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
    case MESSAGE_SIDEBAR_OPEN: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case GET_ROOM_MESSAGES_REQUEST:
      return {
        ...state,
        messages: {
          ...state.messages,
          isLoading: true,
        },
      };

    case GET_ROOM_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: {
          isLoading: false,
          data: action.payload,
          error: null,
        },
      };

    case GET_ROOM_MESSAGES_FAILURE:
      return {
        ...state,
        messages: {
          ...state.messages,
          isLoading: false,
          error: action.payload,
        },
      };

    case SET_ROOM_NAME:
      return {
        ...state,
        selectedRoom: {
          selectedRoomName: action.payload.roomName,
          selectedRoomUser: action.payload.user,
        },
      };

    case RESET_MESSAGES:
      return initialState;

    default:
      return state;
  }
};

export default messagesReducer;
