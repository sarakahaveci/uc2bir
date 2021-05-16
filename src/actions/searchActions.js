import { SEARCH_RESULTS, HTTP_REQUEST } from 'constants/actionTypes';

export const getSearchResults = (keyword) => async (dispatch) => {
  const url = `/user/search?keyword=${keyword}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: SEARCH_RESULTS,
      transformData: (data) => data.data,
    },
  });
};
