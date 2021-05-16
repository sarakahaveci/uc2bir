import {
  SET_RESERVATION_DETAIL
} from '../../constants';

const initialState = {
  userDetail:null,
};

const reservationDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESERVATION_DETAIL:
      return {
        ...state,
        userDetail: action.payload.userInfo,
      };

    default:
      return state;
  }
};

export default reservationDetailReducer;
