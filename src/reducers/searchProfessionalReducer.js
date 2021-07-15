import {
  SEARCH_PROFESSIONAL_REQUEST,
  SEARCH_PROFESSIONAL_SUCCESS,
  SEARCH_PROFESSIONAL_FAILURE,
  SET_SEARCH_PROFESSIONAL_TYPE,
} from 'constants/actionTypes';

const initialState = {
  listInfo: {
    totalPage: 0,
    currentPage: 0,
    perPage: 0,
    totalData: 0,
    data: [],
  },
  isLoading: false,
  error: null,
  type: 'pt',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_PROFESSIONAL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case SEARCH_PROFESSIONAL_SUCCESS:
      var dataArr; 

      if (action?.payload?.data?.length > 0) {
        dataArr = action.payload?.data?.map(obj => ({ ...obj, user_type: action.payload?.user_type }))

      }else{
        dataArr=action?.payload?.data
      }
      return {
        ...state,
        isLoading: false,
        listInfo: { ...action.payload, data: dataArr },
      };

    case SEARCH_PROFESSIONAL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };

    case SET_SEARCH_PROFESSIONAL_TYPE:
      return {
        ...state,
        type: action.payload,
      };

    default:
      return state;
  }
};
