import {
  GET_WORK_PLACE_CAPACITY_REQUEST,
  GET_WORK_PLACE_CAPACITY_SUCCESS,
  GET_WORK_PLACE_CAPACITY_FAILURE,
} from 'constants/index';

const initialState = {
  workPlaceCapacity: {
    data: [],
    isLoading: false,
    error: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_WORK_PLACE_CAPACITY_REQUEST:
      return {
        ...state,
        workPlaceCapacity: {
          ...state.workPlaceCapacity,
          isLoading: true,
        },
      };

    case GET_WORK_PLACE_CAPACITY_SUCCESS:
      return {
        ...state,
        workPlaceCapacity: {
          isLoading: false,
          data: action.payload,
          error: null,
        },
      };

    case GET_WORK_PLACE_CAPACITY_FAILURE:
      return {
        ...state,
        workPlaceCapacity: {
          ...state.workPlaceCapacity,
          isLoading: false,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};
