import { combineReducers } from 'redux';

import favoriteSettingsReducer from './favoriteSettingsReducer';
import dietitianPriceReducer from './dietitianPriceReducer';
import proficiencySettingsReducer from './proficiencySettingsReducer';

const reducers = combineReducers({
  favoriteSettings: favoriteSettingsReducer,
  dietitianPrice: dietitianPriceReducer,
  proficiencySettings: proficiencySettingsReducer,
});

export default reducers;
