import {
  GET_WORK_PLACE_CAPACITY_REQUEST,
  GET_WORK_PLACE_CAPACITY_SUCCESS,
  GET_WORK_PLACE_CAPACITY_FAILURE,
  SET_SELECTION_DATA,
} from 'constants/index';

const initialState = {
  workPlaceCapacity: {
    data: [],
    isLoading: false,
    error: null,
  },
  branchSelection: '',
  sessionSelection: '',
  locationSelection: '',
  selectedHour: '',
  classSelection: '',
  courseDetails: '',
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

    case SET_SELECTION_DATA:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    default:
      return state;
  }
};
