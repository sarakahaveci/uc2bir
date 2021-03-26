import { combineReducers } from 'redux';

import certificateReducer from './certificateReducer';
import workPlace from './workPlaceReducer';

const reducers = combineReducers({
  certificate: certificateReducer,
  workPlace,
});

export default reducers;
