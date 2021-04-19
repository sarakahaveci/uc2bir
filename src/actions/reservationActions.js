import { SET_RESERVATION } from 'constants/actionTypes';

export const setReservation = (data) => async (dispatch) => {
  dispatch({
    type: SET_RESERVATION,
    payload: { ...data },
  });
};
