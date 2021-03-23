import {
  GET_FOOTER_TAGS_REQUEST,
  GET_FOOTER_TAGS_SUCCESS,
  GET_FOOTER_TAGS_FAILURE,
  GET_FOOTER_INFO_REQUEST,
  GET_FOOTER_INFO_SUCCESS,
  GET_FOOTER_INFO_FAILURE,
} from '../constants';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  infoData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FOOTER_TAGS_REQUEST:
    case GET_FOOTER_INFO_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_FOOTER_TAGS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: null,
      };

    case GET_FOOTER_TAGS_FAILURE:
      return {
        ...state,
        isLoading: false,
        data: [],
        error: action.payload.message,
      };

    case GET_FOOTER_INFO_SUCCESS:
      return {
        ...state,
        infoData: action.payload,
        isLoading: false,
        error: null,
      };

    case GET_FOOTER_INFO_FAILURE:
      return {
        ...state,
        isLoading: false,
        infoData: {},
        error: action.payload.message,
      };

    default:
      return state;
  }
};
