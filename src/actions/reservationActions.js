import { SET_RESERVATION, DELETE_SLOT, ADD_SLOT } from 'constants/actionTypes';

export const setReservation = (data) => async (dispatch) => {
  dispatch({
    type: SET_RESERVATION,
    payload: { ...data },
  });
};
export const deleteSlot = (slot) => async (dispatch) => {
  dispatch({
    type: DELETE_SLOT,
    payload: { ...slot },
  });
};
export const addSlot = (slot) => async (dispatch) => {
  dispatch({
    type: ADD_SLOT,
    payload: { ...slot },
  });
};
