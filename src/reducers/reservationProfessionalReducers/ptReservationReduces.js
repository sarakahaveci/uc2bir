import {
  GET_PT_RESERVATION_STATE_DATA_REQUEST,
  GET_PT_RESERVATION_STATE_DATA_SUCCESS,
  GET_PT_RESERVATION_STATE_DATA_FAILURE,
  PT_RESERVATION_FUNC_SUCCESS,
  PT_RESERVATION_FUNC_REQUEST,
  PT_RESERVATION_FUNC_FAILURE,
  GET_PT_RESERVATION_PACKAGE_SUCCESS,
  GET_PT_RESERVATION_PACKAGE_REQUEST,
  GET_PT_RESERVATION_PACKAGE_FAILURE,
  GET_PT_RESERVATION_PACKAGE_CLASS_SUCCESS,
  GET_PT_RESERVATION_PACKAGE_CLASS_REQUEST,
  GET_PT_RESERVATION_PACKAGE_CLASS_FAILURE,
  GET_PT_PACKAGE_DETAIL_CLASS_SUCCESS,
  GET_PT_PACKAGE_DETAIL_CLASS_REQUEST,
  GET_PT_PACKAGE_DETAIL_CLASS_FAILURE,
  GET_PT_PACKAGE_TEST_QUESTION_SUCCESS,
  GET_PT_PACKAGE_TEST_QUESTION_REQUEST,
  GET_PT_PACKAGE_TEST_QUESTION_FAILURE
} from '../../constants';

const initialState = {
  isLoading: false,
  isQuestionLoading: false,
  error: null,
  packets:null,
  classDetail:null,
  classDetailItem:null,
  testQuestion:null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PT_RESERVATION_STATE_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_PT_RESERVATION_STATE_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case GET_PT_RESERVATION_STATE_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        [action.payload.status]: { ...action.payload },
      };
    /////
    case PT_RESERVATION_FUNC_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case PT_RESERVATION_FUNC_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case PT_RESERVATION_FUNC_SUCCESS:
      return {
        ...state,
        isLoading: false,
        funcStatus: { ...action.payload },
      };

    case GET_PT_RESERVATION_PACKAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_PT_RESERVATION_PACKAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case GET_PT_RESERVATION_PACKAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        packets: action.payload,
      };

    case GET_PT_RESERVATION_PACKAGE_CLASS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_PT_RESERVATION_PACKAGE_CLASS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case GET_PT_RESERVATION_PACKAGE_CLASS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        classDetail: action.payload,
      };

    case GET_PT_PACKAGE_DETAIL_CLASS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_PT_PACKAGE_DETAIL_CLASS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case GET_PT_PACKAGE_DETAIL_CLASS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        classDetailItem: action.payload,
      };

    case GET_PT_PACKAGE_TEST_QUESTION_REQUEST:
      return {
        ...state,
        isQuestionLoading: true,
      };

    case GET_PT_PACKAGE_TEST_QUESTION_FAILURE:
      return {
        ...state,
        isQuestionLoading: false,
        error: action.payload.message,
      };

    case GET_PT_PACKAGE_TEST_QUESTION_SUCCESS:
      return {
        ...state,
        isQuestionLoading: false,
        testQuestion: action.payload,
      };


    default:
      return state;
  }
};
