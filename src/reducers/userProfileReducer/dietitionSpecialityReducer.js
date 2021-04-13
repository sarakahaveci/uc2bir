import {
  GET_DIETITIAN_SPECIALITY_REQUEST,
  GET_DIETITIAN_SPECIALITY_SUCCESS,
  GET_DIETITIAN_SPECIALITY_FAILURE,
} from '../../constants';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DIETITIAN_SPECIALITY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_DIETITIAN_SPECIALITY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case GET_DIETITIAN_SPECIALITY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };

    default:
      return state;
  }
};
