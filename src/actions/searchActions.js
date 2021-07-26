import { SEARCH_RESULTS, HTTP_REQUEST } from 'constants/actionTypes';
import { toast } from 'react-toastify';
export const getSearchResults = (keyword, successCallback) => async (
  dispatch
) => {
  const url = `/user/search?keyword=${keyword}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: SEARCH_RESULTS,
      transformData: (data) => data,
      callBack: () => {
        successCallback();
      },
      errorHandler: (error) => {
        toast.error(error.message, {
          position: 'bottom-right',
          autoClose: 2000,
        });
      },
    },
  });
};
