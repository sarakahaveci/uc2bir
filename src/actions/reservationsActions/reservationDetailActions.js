import { SET_RESERVATION_DETAIL } from '../../constants';

export const setReservationDetail = (userInfo) => async (dispatch) => {
  dispatch({
    type: SET_RESERVATION_DETAIL,
    payload: {
      userInfo: { ...userInfo},
    },
  });
};
