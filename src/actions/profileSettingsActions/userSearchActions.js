import { HTTP_REQUEST, SEARCH_USER, SET_SEARCH_FILTERS } from '../../constants';

export const searchPt = (formData = {}) => async (dispatch, getState) => {
  const { pageNumber } = getState().profileSettings2.userSearch;

  let url = `/user/address/search?type=pt&page=${pageNumber}`;

  url = Object.keys(formData).reduce((acc, curr) => {
    if (formData[curr]) {
      return acc + `&${curr}=${formData[curr]}`;
    }

    return acc;
  }, url);

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: SEARCH_USER,
      transformData: (data) => data.users.data,
    },
  });
};

export const setSearchFilters = (name, value) => (dispatch) => {
  dispatch({
    type: SET_SEARCH_FILTERS,
    payload: {
      name,
      value,
    },
  });
};
