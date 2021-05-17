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
      transformData: (data) => data.data,
      callBack: () => { 
        // if (!(data?.data?.blog.length == 0 &&
        //   data?.data?.dt.length == 0 &&
        //   data?.data?.dt_package.length == 0 &&
        //   data?.data?.gym.length == 0 &&
        //   data?.data?.pt.length == 0 &&
        //   data?.data?.pt_package.length == 0)) { successCallback(); }
        // else {
        //   errorCallback();
        // }
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
