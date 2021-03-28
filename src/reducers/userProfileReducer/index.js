import { combineReducers } from 'redux';

import certificateReducer from './certificateReducer';
import workPlace from './workPlaceReducer';
import blog from './blogReducer';

const reducers = combineReducers({
  certificate: certificateReducer,
  workPlace,
  blog,
});

export default reducers;
