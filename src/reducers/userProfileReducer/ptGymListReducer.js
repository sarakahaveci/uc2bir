import {
  GET_PT_GYM_LIST_REQUEST,
  GET_PT_GYM_LIST_SUCCESS,
  GET_PT_GYM_LIST_FAILURE,
} from '../../constants';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PT_GYM_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_PT_GYM_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case GET_PT_GYM_LIST_SUCCESS:
      return {
        ...state,
        data: action.payload?.gym,
        isLoading: false,
      };

    default:
      return state;
  }
};
