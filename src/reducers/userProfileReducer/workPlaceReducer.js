import {
  GET_PT_USER_WORK_HOME_REQUEST,
  GET_PT_USER_WORK_HOME_SUCCESS,
  GET_PT_USER_WORK_HOME_FAILURE,
  GET_CLASSIFICATIONS_REQUEST,
  GET_CLASSIFICATIONS_SUCCESS,
  GET_CLASSIFICATIONS_FAILURE,
} from '../../constants';

const initialState = {
  ptHomePlace: { data: [], isLoading: false, error: null },
  classifications: {
    data: [],
    isLoading: false,
    error: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PT_USER_WORK_HOME_REQUEST:
      return {
        ...state,
        ptHomePlace: {
          ...state.ptHomePlace,
          isLoading: true,
        },
      };

    case GET_CLASSIFICATIONS_REQUEST:
      return {
        ...state,
        classifications: {
          ...state.classifications,
          isLoading: true,
        },
      };

    case GET_PT_USER_WORK_HOME_SUCCESS:
      return {
        ...state,
        ptHomePlace: {
          ...state.ptHomePlace,
          data: action.payload,
          isLoading: false,
        },
      };

    case GET_CLASSIFICATIONS_SUCCESS:
      return {
        ...state,
        classifications: {
          data: action.payload,
          isLoading: false,
          error: null,
        },
      };

    case GET_CLASSIFICATIONS_FAILURE:
      return {
        ...state,
        classifications: {
          ...state.classifications,
          isLoading: false,
          error: action.payload,
        },
      };

    case GET_PT_USER_WORK_HOME_FAILURE:
      return {
        ...state,
        ptHomePlace: {
          ...state.ptHomePlace,
          isLoading: false,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};
