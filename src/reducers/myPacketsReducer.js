import {
  GET_USER_MY_PACKET_FAILURE,
  GET_USER_MY_PACKET_REQUEST,
  GET_USER_MY_PACKET_SUCCESS,
  GET_USER_MY_PACKET_DETAIL_FAILURE,
  GET_USER_MY_PACKET_DETAIL_REQUEST,
  GET_USER_MY_PACKET_DETAIL_SUCCESS,
  GET_USER_PACKET_LESSON_DETAIL_REQUEST,
  GET_USER_PACKET_LESSON_DETAIL_SUCCESS,
  GET_USER_PACKET_LESSON_DETAIL_FAILURE,
  SET_USER_PACKET_LESSON_COMPLETE_SUCCESS,
  SET_USER_PACKET_LESSON_COMPLETE_REQUEST,
  SET_USER_PACKET_LESSON_COMPLETE_FAILURE,
  GET_USER_MY_PACKET_EXERCISE_DETAIL_REQUEST,
  GET_USER_MY_PACKET_EXERCISE_DETAIL_SUCCESS,
  GET_USER_MY_PACKET_EXERCISE_DETAIL_FAILURE,
} from 'constants/index';

const initialState = {
  user: {
    data: {},
    detail: {},
    lessonDetail: {},
    exerciseDetail: {},
    isLoading: false,
    error: null,
  },
  pt: {
    data: {},
    isLoading: false,
    error: null,
  },
  dt: {
    data: {},
    isLoading: false,
    error: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_MY_PACKET_REQUEST:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: true,
        },
      };

    case GET_USER_MY_PACKET_SUCCESS:
      return {
        ...state,
        user: {
          data: action.payload,
          isLoading: false,
          error: null,
        },
      };

    case GET_USER_MY_PACKET_FAILURE:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: false,
          error: action.payload,
        },
      };
    //
    case GET_USER_MY_PACKET_DETAIL_REQUEST:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: true,
        },
      };

    case GET_USER_MY_PACKET_DETAIL_SUCCESS:
      return {
        ...state,
        user: {
          detail: action.payload,
          isLoading: false,
          error: null,
        },
      };

    case GET_USER_MY_PACKET_DETAIL_FAILURE:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: false,
          error: action.payload,
        },
      };
    //
    case GET_USER_PACKET_LESSON_DETAIL_REQUEST:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: true,
        },
      };

    case GET_USER_PACKET_LESSON_DETAIL_SUCCESS:
      return {
        ...state,
        user: {
          lessonDetail: action.payload,
          isLoading: false,
          error: null,
        },
      };

    case GET_USER_PACKET_LESSON_DETAIL_FAILURE:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: false,
          error: action.payload,
        },
      };
    //
    case SET_USER_PACKET_LESSON_COMPLETE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: true,
        },
      };

    case SET_USER_PACKET_LESSON_COMPLETE_REQUEST:
      return {
        ...state,
        user: {
          complete: action.payload,
          isLoading: false,
          error: null,
        },
      };

    case SET_USER_PACKET_LESSON_COMPLETE_FAILURE:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: false,
          error: action.payload,
        },
      };
    //
    case GET_USER_MY_PACKET_EXERCISE_DETAIL_REQUEST:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: true,
        },
      };

    case GET_USER_MY_PACKET_EXERCISE_DETAIL_SUCCESS:
      return {
        ...state,
        user: {
          exerciseDetail: action.payload,
          isLoading: false,
          error: null,
        },
      };

    case GET_USER_MY_PACKET_EXERCISE_DETAIL_FAILURE:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: false,
          error: action.payload,
        },
      };
    //

    default:
      return state;
  }
};
