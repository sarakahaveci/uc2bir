import {
  GET_FOOTER_INFO_REQUEST,
  GET_FOOTER_INFO_SUCCESS,
  GET_FOOTER_INFO_FAILURE,
} from '../constants';

const initialState = {
  tags: [],
  isLoading: false,
  error: null,
  infoData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FOOTER_INFO_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_FOOTER_INFO_SUCCESS:
      return {
        ...state,
        infoData: action.payload.config,
        tags: action.payload.tag,
        isLoading: false,
        error: null,
      };

    case GET_FOOTER_INFO_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    default:
      return state;
  }
};
