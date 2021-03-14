import { combineReducers } from 'redux';

import favoriteSettingsReducer from './favoriteSettingsReducer';
import dietitianPriceReducer from './dietitianPriceReducer';
import proficiencySettingsReducer from './proficiencySettingsReducer';
import dietitianProficiencyReducer from './dietitianProficiencyReducer';
import fileSettingsReducer from './fileSettingsReducer';
import messagesReducer from './messagesReducer';
import sessionTypeReducer from './sessionTypeReducer';
import profileDetailReducer from './profileDetailReducer';
import cancellationReducer from './cancellationReducer';

const reducers = combineReducers({
  favoriteSettings: favoriteSettingsReducer,
  dietitianPrice: dietitianPriceReducer,
  proficiencySettings: proficiencySettingsReducer,
  dietitianProficiency: dietitianProficiencyReducer,
  fileSettings: fileSettingsReducer,
  messages: messagesReducer,
  sessionType: sessionTypeReducer,
  profileDetail: profileDetailReducer,
  cancellation: cancellationReducer,
});

export default reducers;
