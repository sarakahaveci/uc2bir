import { combineReducers } from 'redux';

import ptReservation from './ptReservationReduces';
import dtReservation from './dtReservationReduces';
import userReservation from './userReservationReduces';
import gymReservation from './gymReservationReduces';
import reservationDetail from './reservationDetailReducer';

const reducers = combineReducers({
  ptReservation,
  dtReservation,
  userReservation,
  gymReservation,
  reservationDetail,
});

export default reducers;
