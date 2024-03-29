import { combineReducers } from 'redux';

import certificate from './certificateReducer';
import workPlace from './workPlaceReducer';
import blog from './blogReducer';
import branch from './branchReducer';
import gymFacility from './gymFacilityReducer';
import gymPtList from './gymPtListReducer';
import userInfo from './userInfoReducer';
import ptGymList from './ptGymListReducer';
import dietitianClinic from './dietitianClinicReducer';
import dietitionSpeciality from './dietitionSpecialityReducer';
import galery from './galeryReducer';
import gymClass from './gymClassReducer';
import comment from './commentReducer';
import wallet from './walletReducer';
import calendar from './calendarReducer';
import sessionComment from './sessionCommentReducer';


const reducers = combineReducers({
  certificate,
  workPlace,
  branch,
  blog,
  gymFacility,
  gymPtList,
  userInfo,
  dietitianClinic,
  ptGymList,
  dietitionSpeciality,
  galery,
  gymClass,
  comment,
  sessionComment,
  wallet,
  calendar
});

export default reducers;
