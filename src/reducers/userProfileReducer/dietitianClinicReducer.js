import {
  GET_DIETITIAN_CLINIC_LIST_REQUEST,
  GET_DIETITIAN_CLINIC_LIST_SUCCESS,
  GET_DIETITIAN_CLINIC_LIST_FAILURE,
} from '../../constants';

const initialState = {
  clinics: [],
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DIETITIAN_CLINIC_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_DIETITIAN_CLINIC_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case GET_DIETITIAN_CLINIC_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        clinics: action.payload,
      };

    default:
      return state;
  }
};
