import { HTTP_REQUEST, GET_ROOMS } from '../../constants';

export const getRooms = () => async (dispatch, getState) => {
  const url = `/user/message/rooms`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: GET_ROOMS,
    },
  });
};
