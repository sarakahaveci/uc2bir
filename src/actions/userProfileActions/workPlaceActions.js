import { HTTP_REQUEST, GET_PT_USER_WORK_HOME } from '../../constants';

export const getPtWorkingHomePlace = () => async (dispatch, getState) => {
  const { id } = getState().auth?.user;

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
