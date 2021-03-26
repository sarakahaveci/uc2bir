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
  ADD_TYPE_ADDRESS_DELETE_REQUEST,
  ADD_TYPE_ADDRESS_DELETE_SUCCESS,
  ADD_TYPE_ADDRESS_DELETE_FAILURE,
  SESSIONTYPE_GET_ADDRESS_REQUEST,
  SESSIONTYPE_GET_ADDRESS_SUCCESS,
  SESSIONTYPE_GET_ADDRESS_FAILURE,
  SESSIONTYPE_GET_GYM_LIST_REQUEST,
  SESSIONTYPE_GET_GYM_LIST_SUCCESS,
  SESSIONTYPE_GET_GYM_LIST_FAILURE,
  SESSIONTYPE_ADD_GYM_REQUEST,
  SESSIONTYPE_ADD_GYM_SUCCESS,
  SESSIONTYPE_ADD_GYM_FAILURE,
  SEARCH_GYM_FOR_PT_REQUEST,
  SEARCH_GYM_FOR_PT_SUCCESS,
  SEARCH_GYM_FOR_PT_FAILURE,
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
  },
  deleteAdress: {
    isLoading: false,
    isSuccsess: false,
    data: [],
    error: null,
  },
  gymList: {
    isLoading: false,
    isSuccsess: false,
    data: [],
    error: null,
  },
  addGym: {
    isLoading: false,
    isSuccsess: false,
    data: [],
    error: null,
  },
  searchGym: {
    isLoading: false,
    currentPage: null,
    perPage: null,
    totalData: null,
    totalPage: null,
    data: [],
    error: null,
  },
};

const sessionTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_GYM_FOR_PT_REQUEST:
      return {
        ...state,
        searchGym: {
          ...state.searchGym,
          isLoading: true,
        },
      };

    case SEARCH_GYM_FOR_PT_SUCCESS:
      return {
        ...state,
        searchGym: {
          ...state.searchGym,
          isLoading: false,
          data: action.payload.data,
          currentPage: action.payload.currentPage,
          perPage: action.payload.perPage,
          totalData: action.payload.totalData,
          totalPage: action.payload.totalPage,
          error: null,
        },
      };

    case SEARCH_GYM_FOR_PT_FAILURE:
      return {
        ...state,
        searchGym: {
          ...state.searchGym,
          isLoading: false,
          error: action.payload,
        },
      };

    case ADD_TYPE_CREATE_REQUEST:
      return {
        ...state,
        create: {
          ...state.create,
          isLoading: true,
        },
      };

    case ADD_TYPE_ADDRESS_DELETE_REQUEST:
      return {
        ...state,
        deleteAdress: {
          ...state.deleteAdress,
          isLoading: true,
        },
      };

    case ADD_TYPE_ADDRESS_DELETE_SUCCESS:
      return {
        ...state,
        deleteAdress: {
          ...state.deleteAdress,
          isLoading: false,
          isSuccsess: true,
          data: action.payload,
          error: null,
        },
      };

    case ADD_TYPE_ADDRESS_DELETE_FAILURE:
      return {
        ...state,
        deleteAdress: {
          ...state.deleteAdress,
          isLoading: false,
          error: action.payload,
        },
      };

    case SESSIONTYPE_GET_GYM_LIST_REQUEST:
      return {
        ...state,
        gymList: {
          ...state.gymList,
          isLoading: true,
        },
      };

    case SESSIONTYPE_GET_GYM_LIST_SUCCESS:
      return {
        ...state,
        gymList: {
          ...state.gymList,
          isLoading: false,
          isSuccsess: true,
          data: action.payload,
          error: null,
        },
      };

    case SESSIONTYPE_GET_GYM_LIST_FAILURE:
      return {
        ...state,
        gymList: {
          ...state.gymList,
          isLoading: false,
          error: action.payload,
        },
      };

    case SESSIONTYPE_ADD_GYM_REQUEST:
      return {
        ...state,
        addGym: {
          ...state.addGym,
          isLoading: true,
        },
      };

    case SESSIONTYPE_ADD_GYM_SUCCESS:
      return {
        ...state,
        addGym: {
          ...state.addGym,
          isLoading: false,
          isSuccsess: true,
          data: action.payload,
          error: null,
        },
      };

    case SESSIONTYPE_ADD_GYM_FAILURE:
      return {
        ...state,
        addGym: {
          ...state.addGym,
          isLoading: false,
          error: action.payload,
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
