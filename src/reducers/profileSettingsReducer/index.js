import { combineReducers } from 'redux';

import favoriteSettingsReducer from './favoriteSettingsReducer';
import dietitianPriceReducer from './dietitianPriceReducer';
import proficiencySettingsReducer from './proficiencySettingsReducer';
import fileSettingsReducer from './fileSettingsReducer';
import messagesReducer from './messagesReducer';
import sessionTypeReducer from './sessionTypeReducer';

const reducers = combineReducers({
  favoriteSettings: favoriteSettingsReducer,
  dietitianPrice: dietitianPriceReducer,
  proficiencySettings: proficiencySettingsReducer,
  fileSettings: fileSettingsReducer,
  messages: messagesReducer,
  sessionType: sessionTypeReducer,
});

export default reducers;
