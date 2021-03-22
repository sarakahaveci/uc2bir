import { HTTP_REQUEST, GET_FOOTER_TAGS } from '../constants';

export const getFooterTags = () => async (dispatch) => {
  const url = `/cms/tag/list`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_FOOTER_TAGS,
      transformData: (data) => data.data,
    },
  });
};
