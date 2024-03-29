import {

  GET_SESSION_COMMENT_REQUEST,
  GET_SESSION_COMMENT_SUCCESS,
  GET_SESSION_COMMENT_FAILURE,
} from '../../constants';

const initialState = {
  data: {},
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    
      case GET_SESSION_COMMENT_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
  
      case GET_SESSION_COMMENT_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload.message,
        };
  
      case GET_SESSION_COMMENT_SUCCESS:
        return {
          ...state,
          isLoading: false,
          ...action.payload,
          data:action.payload.data,
        };
  

    default:
      return state;
  }
};
