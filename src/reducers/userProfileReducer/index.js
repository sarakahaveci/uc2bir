import { combineReducers } from 'redux';

import certificateReducer from './certificateReducer';
import workPlace from './workPlaceReducer';
import blog from './blogReducer';
import branch from './branchReducer';
import gymFacility from './gymFacilityReducer';
import gymPtList from './gymPtListReducer';

const reducers = combineReducers({
  certificate: certificateReducer,
  workPlace,
  branch,
  blog,
  gymFacility,
  gymPtList,
});

export default reducers;
