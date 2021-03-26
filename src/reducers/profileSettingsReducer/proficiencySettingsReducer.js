import {
  GET_PROFICIENCY_REQUEST,
  GET_PROFICIENCY_SUCCESS,
  GET_PROFICIENCY_FAILURE,
  ADD_PROFICIENCY_REQUEST,
  ADD_PROFICIENCY_FAILURE,
  ADD_PROFICIENCY_SUCCESS,
} from '../../constants';

const initialState = {
  proficiency: {
    data: [],
    isLoading: false,
    error: null,
  },
  addProficiency: {
    isLoading: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFICIENCY_REQUEST:
      return {
        ...state,
        proficiency: {
          ...state.proficiency,
          isLoading: true,
        },
      };

    case ADD_PROFICIENCY_REQUEST:
      return {
        ...state,
        addProficiency: {
          isLoading: true,
        },
      };

    case ADD_PROFICIENCY_SUCCESS:
      return {
        ...state,
        addProficiency: {
          isLoading: false,
        },
      };

    case GET_PROFICIENCY_SUCCESS:
      return {
        ...state,
        proficiency: {
          ...state.proficiency,
          data: action.payload,
          isLoading: false,
          error: null,
        },
      };

    case GET_PROFICIENCY_FAILURE:
      return {
        ...state,
        proficiency: {
          ...state.proficiency,
          error: action.payload,
          isLoading: false,
        },
      };

    case ADD_PROFICIENCY_FAILURE:
      return {
        ...state,
        addProficiency: {
          isLoading: false,
        },
      };

    default:
      return state;
  }
};
