import { HTTP_REQUEST, GET_FOOTER_TAGS, GET_FOOTER_INFO } from '../constants';

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

export const getFooterInfo = () => async (dispatch) => {
  const url = `/cms/system-config/get/all`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_FOOTER_INFO,
      transformData: (data) => data.data,
    },
  });
};
