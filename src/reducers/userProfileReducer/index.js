import { combineReducers } from 'redux';

import certificateReducer from './certificateReducer';
import workPlace from './workPlaceReducer';
import blog from './blogReducer';
import branch from './branchReducer';

const reducers = combineReducers({
  certificate: certificateReducer,
  workPlace,
  branch,
  blog,
});

export default reducers;
