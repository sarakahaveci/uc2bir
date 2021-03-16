import {
  ADD_TYPE_CREATE_REQUEST,
  ADD_TYPE_CREATE_SUCCESS,
  ADD_TYPE_CREATE_FAILURE,

  GET_TYPES_REQUEST,
  GET_TYPES_SUCCESS,
  GET_TYPES_FAILURE,

  SESSIONTYPE_ADD_ADDRESS_REQUEST,
  SESSIONTYPE_ADD_ADDRESS_SUCCESS,
  SESSIONTYPE_ADD_ADDRESS_FAILURE,

  SESSIONTYPE_GET_ADDRESS_REQUEST,
  SESSIONTYPE_GET_ADDRESS_SUCCESS,
  SESSIONTYPE_GET_ADDRESS_FAILURE,
} from '../../constants';

const initialState = {
  create: {
    isLoading: false,
    data: [],
    error: null,
  },
  get: {
    isLoading: false,
    data: [],
    error: null,
  },
  addAddress: {
    isLoading: false,
    isSuccsess: false,
    data: [],
    error: null,
  },
  getAddress: {
    isLoading: false,
    isSuccsess: false,
    data: [],
    error: null,
  }
};

const sessionTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TYPE_CREATE_REQUEST:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: true,
        },
      };

    case GET_TYPES_REQUEST:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: true,
        },
      };

    case SESSIONTYPE_ADD_ADDRESS_REQUEST:
      return {
        ...state,
        addAddress: {
          ...state.addAddress,
          isLoading: true,
        },
      };

    case SESSIONTYPE_GET_ADDRESS_REQUEST:
      return {
        ...state,
        getAddress: {
          ...state.getAddress,
          isLoading: true,
        },
      };

    case ADD_TYPE_CREATE_SUCCESS:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          data: action.payload,
          error: null,
        },
      };

    case SESSIONTYPE_ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        addAddress: {
          ...state.addAddress,
          isLoading: false,
          isSuccsess: true,
          data: action.payload,
          error: null,
        },
      };

    case SESSIONTYPE_GET_ADDRESS_SUCCESS:
      return {
        ...state,
        getAddress: {
          ...state.getAddress,
          isLoading: false,
          isSuccsess: true,
          data: action.payload,
          error: null,
        },
      };

    case GET_TYPES_SUCCESS:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          data: action.payload,
          error: null,
        },
      };

    case ADD_TYPE_CREATE_FAILURE:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: false,
          error: action.payload,
        },
      };

    case SESSIONTYPE_ADD_ADDRESS_FAILURE:
      return {
        ...state,
        addAddress: {
          ...state.addAddress,
          isLoading: false,
          error: action.payload,
        },
      };

    case SESSIONTYPE_GET_ADDRESS_FAILURE:
      return {
        ...state,
        getAddress: {
          ...state.getAddress,
          isLoading: false,
          error: action.payload,
        },
      };

    case GET_TYPES_FAILURE:
      return {
        ...state,
        get: {
          ...state.get,
          isLoading: false,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};

export default sessionTypeReducer;
