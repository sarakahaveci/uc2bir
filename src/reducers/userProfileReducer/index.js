import { combineReducers } from 'redux';

import certificate from './certificateReducer';
import workPlace from './workPlaceReducer';
import blog from './blogReducer';
import branch from './branchReducer';
import gymFacility from './gymFacilityReducer';
import gymPtList from './gymPtListReducer';
import userInfo from './userInfoReducer';

const reducers = combineReducers({
  certificate,
  workPlace,
  branch,
  blog,
  gymFacility,
  gymPtList,
  userInfo,
});

export default reducers;
