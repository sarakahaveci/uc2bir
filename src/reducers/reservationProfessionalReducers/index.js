import { combineReducers } from 'redux';

import ptReservation from './ptReservationReduces';
import dtReservation from './dtReservationReduces';
import userReservation from './userReservationReduces';

const reducers = combineReducers({
  ptReservation,
  dtReservation,
  userReservation,
});

export default reducers;
