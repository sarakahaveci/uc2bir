import {
  HTTP_REQUEST,
  GET_PT_USER_WORK_HOME,
  GET_CLASSIFICATIONS,
} from '../../constants';

export const getPtWorkingHomePlace = (id = '') => async (dispatch) => {
  const url = `/user/working-area/home-park/${id}`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_PT_USER_WORK_HOME,
      transformData: (data) => data.data,
    },
  });
};

export const getMyClassifications = () => async (dispatch) => {
  const url = '/user/working-area/class';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'GET',
      url,
      label: GET_CLASSIFICATIONS,
      transformData: (data) => data.data?.class,
    },
  });
};
