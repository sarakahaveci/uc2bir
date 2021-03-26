import { combineReducers } from 'redux';

import certificateReducer from './certificateReducer';

const reducers = combineReducers({
  certificate: certificateReducer,
});

export default reducers;
