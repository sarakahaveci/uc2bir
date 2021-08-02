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
      startDate,
      endDate,
      bs_id
    },
    successCallback = () => {}
  ) =>
  async (dispatch) => {
    const gymUrl = '/user/search?type=bs';
    const mapUrl = '/user/search?';
    const dietitionUrl = '/user/search?type=dt';
    const ptUrl = '/user/search?type=pt';
    const packetUrl_pt = '/user/search?type=pt-package';
    const packetUrl_dt = '/user/search?type=dt-package';
    const groupLessonUrl = '/user/search?type=group';

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
        if (subType == 'pt') {
          url = packetUrl_pt;
        } else if (subType == 'dt') {
          url = packetUrl_dt;
        }
        break;
      case 'group-lessons':
        url = groupLessonUrl;
        break;
      case 'map':
        url = mapUrl;
        break;
      default:
        break;
    }

    const urlWithTitle = `&keyword=${title}`;
    const urlWithLocation = `&location_key=${location}`;
    const urlWithBranch = `&branch_id=${branch}`;
    const urlWithRating = `&rating=${ratings?.[0]}`;
    const urlWithMinPrice = `&min_price=${minPrice}`;
    const urlWithMaxPrice = `&max_price=${maxPrice}`;
    const urlWithSortBy = `&sortBy=${sortBy}&sortKey=price`;
    const urlWithPage = `&page=${page}`;
    const urlWithClassification = `&classification=${classification?.toLowerCase()}`;
    const urlWithStartDate = `&startDate=${startDate}`;
    const urlWithEndDate = `&endDate=${endDate}`;
    const urlWithBsId = `&bs_id=${bs_id}`;

    const finalUrls = `${url}${location ? urlWithLocation : ''}${
      title ? urlWithTitle : ''
    }${ratings?.length > 0 ? urlWithRating : ''}${urlWithMinPrice}${
      maxPrice ? urlWithMaxPrice : ''
    }${sortBy ? urlWithSortBy : ''}${
      classification ? urlWithClassification : ''
    }${page ? urlWithPage : ''}${bs_id ? urlWithBsId : ''}${startDate ? urlWithStartDate : ''}${
      endDate ? urlWithEndDate : ''
    }${branch ? urlWithBranch : ''}&per_page=200`.trim();
    await dispatch({
      type: HTTP_REQUEST,
      payload: {
        method: 'GET',
        url: finalUrls,
        label: SEARCH_PROFESSIONAL,
        callBack: () => successCallback(),
        transformData: (data) => {
          if (type == 'group-lessons') {
            return {
              data: data?.group_lessons?.data,
              user_type: type,
            };
          } else if (type == 'packets') {
            return {
              data: data?.packages,
              user_type: type,
            };
          } else {
            return {
              data: data?.users?.data,
              user_type: type,
            };
          }
        },
      },
    });
  };
