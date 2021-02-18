/* eslint-disable import/no-anonymous-default-export */
import {
  REGISTER_DATA_REQUEST,
  REGISTER_DATA_SUCCESS,
  REGISTER_DATA_FAILURE,
  GET_REGIONS_REQUEST,
  GET_REGIONS_SUCCESS,
  GET_REGIONS_FAILURE,
  GET_DISTICK_REQUEST,
  GET_DISTICK_SUCCESS,
  GET_DISTICK_FAILURE,
  VERIFY_CODE_REQUEST,
  VERIFY_CODE_FAILURE,
  VERIFY_CODE_SUCCESS,
  GET_TOWN_REQUEST,
  GET_TOWN_SUCCESS,
  GET_TOWN_FAILURE,
  GET_ADRESS_IDS_REQUEST,
  GET_ADRESS_IDS_SUCCESS,
  GET_ADRESS_IDS_FAILURE,
  CONFIRMATION_DATA_REQUEST,
  CONFIRMATION_DATA_SUCCESS,
  CONFIRMATION_DATA_FAILURE,
} from '../constants';

const initialState = {
  data: {},
  message: '',
  isLoading: false,
  error: null,
  isSuccess: false,
  cities: [],
  distict: [{ id: 0, name: 'İl seçimi yapınız' }],
  town: [{ id: 0, name: 'İl veya ilçe seçimi yapınız' }],
  cityId: null,
  districtId: null,
  townId: null,
  isSuccessGetId: false,
  verifyCode: {
    isLoading: false,
    error: null,
    data: '',
  },
  confirmation: {
    data: {},
    isLoading: false,
    error: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_DATA_REQUEST:
    case GET_REGIONS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case CONFIRMATION_DATA_REQUEST:
      return {
        ...state,
        confirmation: {
          ...state.confirmation,
          isLoading: true,
        },
      };

    case VERIFY_CODE_REQUEST:
      return {
        ...state,
        verifyCode: {
          ...state.verifyCode,
          isLoading: true,
        },
      };

    case CONFIRMATION_DATA_REQUEST:
      return {};

    case CONFIRMATION_DATA_SUCCESS:
      return {
        ...state,
        confirmation: {
          data: action.payload,
          isLoading: false,
          error: null,
        },
      };

    case VERIFY_CODE_SUCCESS:
      return {
        ...state,
        verifyCode: {
          ...state.verifyCode,
          isLoading: false,
        },
      };

    case REGISTER_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: false,
        isSuccess: true,
      };

    case REGISTER_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload,
        isSuccess: false,
      };
    case GET_REGIONS_SUCCESS:
      return {
        ...state,
        cities: action.payload.data,
        isLoading: false,
      };
    case GET_DISTICK_SUCCESS:
      return {
        ...state,
        distict: action.payload.data,
        isLoading: false,
      };
    case GET_TOWN_SUCCESS:
      return {
        ...state,
        town: action.payload.data,
        isLoading: false,
      };
    case GET_TOWN_FAILURE:
    case GET_TOWN_REQUEST:
    case GET_DISTICK_REQUEST:
    case GET_REGIONS_FAILURE:
    case GET_DISTICK_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case CONFIRMATION_DATA_FAILURE:
      return {
        ...state,
        confirmation: {
          ...state.confirmation,
          isLaoding: false,
          error: action.payload,
        },
      };

    case VERIFY_CODE_FAILURE:
      return {
        ...state,
        verifyCode: {
          ...state.verifyCode,
          isLoading: false,
          error: action.payload.message,
        },
      };

    case GET_ADRESS_IDS_REQUEST:
    case GET_ADRESS_IDS_FAILURE:
      return {
        ...state,
        cityId: null,
        districtId: null,
        townId: null,
        isSuccessGetId: false,
      };

    case GET_ADRESS_IDS_SUCCESS:
      return {
        ...state,

        cityId: action.payload.city.id,
        districtId: action.payload.district.id,
        townId: action.payload.town.id,
        isSuccessGetId: true,
      };

    default:
      return state;
  }
};
