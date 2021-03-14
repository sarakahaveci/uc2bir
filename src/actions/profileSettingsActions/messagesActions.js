import {
  HTTP_REQUEST,
  GET_ROOMS,
  MESSAGE_SEARCH,
  RESET_MESSAGE_SEARCH,
} from '../../constants';

export const getRooms = () => async (dispatch, getState) => {
  const url = `/user/message/rooms`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: GET_ROOMS,
      transformData: (data) => data.data,
    },
  });
};

export const searchMessage = (searchValue) => async (dispatch, getState) => {
  const rooms = getState().profileSettings2.messages.rooms.data;

  const filteredRooms = rooms.filter((room) =>
    room.user_meta.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  dispatch({
    type: MESSAGE_SEARCH,
    payload: {
      searchValue,
      foundRooms: filteredRooms,
    },
  });
};

export const resetProductSearch = () => ({
  type: RESET_MESSAGE_SEARCH,
});
