import {
  GET_MY_BLOGS_REQUEST,
  GET_MY_BLOGS_SUCCESS,
  GET_MY_BLOGS_FAILURE,
  GET_BLOGS_REQUEST,
  GET_BLOGS_SUCCESS,
  GET_BLOGS_FAILURE,
  GET_BLOGS_DETAIL_REQUEST,
  GET_BLOGS_DETAIL_SUCCESS,
  GET_BLOGS_DETAIL_FAILURE,
} from '../../constants';

const initialState = {
  me: {
    data: [],
    isLoading: false,
    isSuccess: false,
    error: null,
  },
  galleries: {
    isLoading: false,
    isSuccess: false,
    error: null,
  },
  blogs: {
    data: [],
    isLoading: false,
    isSuccess: false,
    error: null,
  },
  detail: {
    data: [],
    isLoading: false,
    isSuccess: false,
    error: null,
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_BLOGS_REQUEST:
      return {
        ...state,
        me: {
          ...state.me,
          isLoading: true,
        },
      };

    case GET_BLOGS_REQUEST:
      return {
        ...state,
        blogs: {
          ...state.blogs,
          isLoading: true,
        },
      };

    case GET_BLOGS_DETAIL_REQUEST:
      return {
        ...state,
        detail: {
          ...state.detail,
          isLoading: true,
        },
      };

    case GET_MY_BLOGS_SUCCESS:
      return {
        ...state,
        me: {
          ...state.me,
          data: action.payload.data,
          isLoading: false,
          isSuccess: true,
          error: null,
        },
      };

    case GET_BLOGS_DETAIL_SUCCESS:
      return {
        ...state,
        detail: {
          ...state.detail,
          data: action.payload.data,
          isLoading: false,
          isSuccess: true,
          error: null,
        },
      };

    case GET_BLOGS_SUCCESS:
      return {
        ...state,
        blogs: {
          ...state.blogs,
          data: action.payload.data,
          isLoading: false,
          isSuccess: true,
          error: null,
        },
      };

    case GET_MY_BLOGS_FAILURE:
      return {
        ...state,
        me: {
          ...state.me,
          error: action.payload,
          isLoading: false,
        },
      };

    case GET_BLOGS_DETAIL_FAILURE:
      return {
        ...state,
        detail: {
          ...state.detail,
          error: action.payload,
          isLoading: false,
        },
      };

    case GET_BLOGS_FAILURE:
      return {
        ...state,
        blogs: {
          ...state.blogs,
          error: action.payload,
          isLoading: false,
        },
      };

    default:
      return state;
  }
};
