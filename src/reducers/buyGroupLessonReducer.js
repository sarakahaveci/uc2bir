import {
  GET_GROUP_LESSON_DETAIL_REQUEST,
  GET_GROUP_LESSON_DETAIL_SUCCESS,
  GET_GROUP_LESSON_DETAIL_FAILURE,
  SET_GROUP_LESSON_RESERVATION,
  CLEAR_GROUP_LESSON_RESERVATION,
} from '../constants';

const initialState = {
  isLoading: false,
  error: null,
  data: {},
  reservation: {
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUP_LESSON_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_GROUP_LESSON_DETAIL_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: null,
      };

    case GET_GROUP_LESSON_DETAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    case SET_GROUP_LESSON_RESERVATION:
      return {
        ...state,
        reservation: { ...state.reservation, ...action.payload },
        isLoading: true,
      };
    case CLEAR_GROUP_LESSON_RESERVATION:
      return {
        ...state,
        reservation: {},
        isLoading: true,
      };
    default:
      return state;
  }
};
