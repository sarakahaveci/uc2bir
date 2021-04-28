import { combineReducers } from 'redux';

import ptReservation from './ptReservationReduces';
import dtReservation from './dtReservationReduces';
import userReservation from './userReservationReduces';
import gymReservation from './gymReservationReduces';

const reducers = combineReducers({
  ptReservation,
  dtReservation,
  userReservation,
  gymReservation,
});

export default reducers;
