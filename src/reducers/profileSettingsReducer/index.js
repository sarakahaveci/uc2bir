import { combineReducers } from 'redux';

import favoriteSettingsReducer from './favoriteSettingsReducer';

const reducers = combineReducers({
  favoriteSettings: favoriteSettingsReducer,
});

export default reducers;
