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

export const searchProffesional =
  (
    {
      title,
      ratings,
      minPrice,
      maxPrice,
      sortBy,
      branch,
      location,
      type,
      subType,
      page,
      classification,
    },
    successCallback = () => {}
  ) =>
  async (dispatch) => {
    const gymUrl = '/user/search/detail-search-gym?';
    const dietitionUrl = '/user/search/detail-search-dt?';
    const ptUrl = '/user/search/detail-search-pt?';
    const packetUrl_pt = '/cms/package/list?';
    const packetUrl_dt = '/user/package/list?';

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
      case 'packets':
        if(subType=='pt'){
          url = packetUrl_pt;
        }else if(subType=='dt'){
          url=packetUrl_dt;
        }
        break;
      default:
        break;
    }

    const urlWithTitle = type === 'pt' ? `&name=${title}` : `&title=${title}`;
    const urlWithLocation = `&location_key=${location}`;
    const urlWithBranch = `&branch_id=${branch}`;
    const urlWithRating = `&rating=${ratings?.[0]}`;
    const urlWithMinPrice = `&min_price=${minPrice}`;
    const urlWithMaxPrice = `&max_price=${maxPrice}`;
    const urlWithSortBy = `&sortBy=${sortBy}`;
    const urlWithPage = `&page=${page}`;
    const urlWithClassification = `&classification=${classification}`;

    const finalUrls = `${url}${location ? urlWithLocation : ''}${
      title ? urlWithTitle : ''
    }${ratings?.length > 0 ? urlWithRating : ''}${urlWithMinPrice}${
      maxPrice ? urlWithMaxPrice : ''
    }${sortBy ? urlWithSortBy : ''}${
      classification ? urlWithClassification : ''
    }${page ? urlWithPage : ''}${branch ? urlWithBranch : ''}`.trim();

    await dispatch({
      type: HTTP_REQUEST,
      payload: {
        method: 'GET',
        url: finalUrls,
        label: SEARCH_PROFESSIONAL,
        transformData: (data) => data,
        callBack: () => successCallback(),
      },
    });
  };
