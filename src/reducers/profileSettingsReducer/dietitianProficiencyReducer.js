/* eslint-disable import/no-anonymous-default-export */
import {
  GET_DIETITIAN_PROFICIENCY_REQUEST,
  GET_DIETITIAN_PROFICIENCY_SUCCESS,
  GET_DIETITIAN_PROFICIENCY_FAILURE,
  GET_ALL_DIETITIAN_PROFICIENCY_REQUEST,
  GET_ALL_DIETITIAN_PROFICIENCY_SUCCESS,
  GET_ALL_DIETITIAN_PROFICIENCY_FAILURE,
  GET_SUB_DIETITIAN_PROFICIENCY_REQUEST,
  GET_SUB_DIETITIAN_PROFICIENCY_SUCCESS,
  GET_SUB_DIETITIAN_PROFICIENCY_FAILURE,
} from '../../constants';

const initialState = {
  proficiency: {
    allProficiencyList: [],
    subProficiencyList: [],
    userProficiencyList: [],
    isLoading: false,
    error: null,
    isSuccessGetSubPro: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SUB_DIETITIAN_PROFICIENCY_REQUEST:
      return {
        ...state,
        proficiency: {
          ...state.proficiency,
        },
      };

    case GET_SUB_DIETITIAN_PROFICIENCY_SUCCESS:
      return {
        ...state,
        proficiency: {
          ...state.proficiency,
          subProficiencyList: action.payload,
          isLoading: false,
          error: null,
          isSuccessGetSubPro: true,
        },
      };

    case GET_SUB_DIETITIAN_PROFICIENCY_FAILURE:
      return {
        ...state,
        proficiency: {
          ...state.proficiency,
          subProficiencyList: [],
          error: action.payload,
          isLoading: false,
          isSuccessGetSubPro: false,
        },
      };

    case GET_DIETITIAN_PROFICIENCY_REQUEST:
    case GET_ALL_DIETITIAN_PROFICIENCY_REQUEST:
      return {
        ...state,
        proficiency: {
          ...state.proficiency,
          isLoading: true,
        },
      };

    case GET_ALL_DIETITIAN_PROFICIENCY_SUCCESS:
      return {
        ...state,
        proficiency: {
          ...state.proficiency,
          allProficiencyList: action.payload,
          isLoading: false,
          error: null,
        },
      };

    case GET_ALL_DIETITIAN_PROFICIENCY_FAILURE:
      return {
        ...state,
        proficiency: {
          ...state.proficiency,
          allProficiencyList: [],
          error: action.payload,
          isLoading: false,
        },
      };

    case GET_DIETITIAN_PROFICIENCY_SUCCESS:
      return {
        ...state,
        proficiency: {
          ...state.proficiency,
          userProficiencyList: action.payload,
          isLoading: false,
          error: null,
        },
      };

    case GET_DIETITIAN_PROFICIENCY_FAILURE:
      return {
        ...state,
        proficiency: {
          ...state.proficiency,
          userProficiencyList: [],
          error: action.payload,
          isLoading: false,
        },
      };
    default:
      return state;
  }
};
