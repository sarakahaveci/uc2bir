import { HTTP_REQUEST, SEARCH_PROFESSIONAL } from '../constants';

export const searchTrainers = () => async (dispatch) => {
  const url = '/user/profile/information';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: SEARCH_PROFESSIONAL,
      transformData: (data) => data.data,
    },
  });
};

export const searchPtOrDietition = (
  {
    title,
    rating,
    minPrice,
    maxPrice,
    sortBy,
    branch,
    location,
    type,
    page,
    classification,
  },
  successCallback = () => {}
) => async (dispatch) => {
  const gymUrl = '/user/search/detail-search-gym?';
  const dietitionUrl = '/user/search/detail-search-dt?';
  const ptUrl = '/user/search/detail-search-pt?';

  let url;
  switch (type) {
    case 'gym':
      url = gymUrl;
      break;
    case 'pt':
      url = ptUrl;
      break;
    case 'dt':
      url = dietitionUrl;
      break;

    default:
      break;
  }

  const urlWithTitle = type === 'pt' ? `&name=${title}` : `&title=${title}`;
  const urlWithLocation = `&location_key=${location}`;
  const urlWithBranch = `&branch_id=${branch}`;
  const urlWithRating = `&rating=${rating?.[0]}`;
  const urlWithMinPrice = `&min_price=${minPrice}`;
  const urlWithMaxPrice = `&max_price=${maxPrice}`;
  const urlWithSortBy = `&sortBy=${sortBy}`;
  const urlWithPage = `&page=${page}`;
  const urlWithClassification = `&classification=${classification}`;

  const finalUrls = `${url}${location ? urlWithLocation : ''}${
    title ? urlWithTitle : ''
  }${rating?.length > 0 ? urlWithRating : ''}${
    minPrice ? urlWithMinPrice : ''
  }${maxPrice ? urlWithMaxPrice : ''}${sortBy ? urlWithSortBy : ''}${
    classification ? urlWithClassification : ''
  }${page ? urlWithPage : ''}${branch ? urlWithBranch : ''}`.trim();

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url: finalUrls,
      label: SEARCH_PROFESSIONAL,
      transformData: (data) => data.data,
      callBack: () => successCallback(),
    },
  });
};
