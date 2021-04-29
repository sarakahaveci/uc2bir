import {
  GET_DT_SERVICES_REQUEST,
  GET_DT_SERVICES_SUCCESS,
  GET_DT_SERVICES_FAILURE,
} from '../../constants';

const initialState = {
  pageNumber: 1,
  services: {
    data: [],
    isLoading: false,
    error: null,
  },
};

const servicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DT_SERVICES_REQUEST:
      return {
        ...state,
        services: {
          ...state.services,
          isLoading: true,
        },
      };

    case GET_DT_SERVICES_SUCCESS:
      return {
        ...state,
        services: {
          data: action.payload,
          isLoading: false,
          error: null,
        },
      };

    case GET_DT_SERVICES_FAILURE:
      return {
        ...state,
        services: {
          ...state.services,
          isLoading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

export default servicesReducer;
