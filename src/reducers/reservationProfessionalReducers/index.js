import { combineReducers } from 'redux';

import ptReservation from './ptReservationReduces';
import dtReservation from './dtReservationReduces';

const reducers = combineReducers({
  ptReservation,
  dtReservation,
});

export default reducers;
