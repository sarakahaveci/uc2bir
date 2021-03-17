import {
  GET_ALL_FACILITY_REQUEST,
  GET_ALL_FACILITY_SUCCESS,
  GET_ALL_FACILITY_FAILURE,
  GET_USET_FACILITY_REQUEST,
  GET_USET_FACILITY_SUCCESS,
  GET_USET_FACILITY_FAILURE,
} from '../../constants';

const initialState = {
  allFacilityList: {
    data: {},
    isLoading: false,
    error: null,
  },
  myFacilities: {
    data: [],
    isLoading: false,
    error: null,
  },
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FACILITY_REQUEST:
      return {
        ...state,
        allFacilityList: {
          ...state.allFacilityList,
          isLoading: true,
        },
      };

    case GET_ALL_FACILITY_SUCCESS:
      return {
        ...state,
        allFacilityList: {
          isLoading: false,
          data: action.payload,
          error: null,
        },
      };

    case GET_ALL_FACILITY_FAILURE:
      return {
        ...state,
        allFacilityList: {
          ...state.allFacilityList,
          isLoading: false,
          error: action.payload,
        },
      };

    case GET_USET_FACILITY_REQUEST:
      return {
        ...state,
        myFacilities: {
          ...state.myFacilities,
          isLoading: true,
        },
      };

    case GET_USET_FACILITY_SUCCESS:
      return {
        ...state,
        myFacilities: {
          isLoading: false,
          data: action.payload,
          error: null,
        },
      };

    case GET_USET_FACILITY_FAILURE:
      return {
        ...state,
        myFacilities: {
          ...state.myFacilities,
          isLoading: false,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};

export default messagesReducer;
