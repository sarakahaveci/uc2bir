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
import userSearchReducer from './userSearchReducer';
import workplaceFacilityReducer from './workplaceFacilityReducer';
import notificationsReducer from './notificationsReducer';
import reservationTemplateReducer from './reservationTemplateReducer';
import profileBranchesReducer from './profileBranchesReducer';
import reservationGroupSlotReducer from './reservationGroupSlotReducer';
import servicesReducer from './servicesReducer';

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
  userSearch: userSearchReducer,
  workplaceFacility: workplaceFacilityReducer,
  notifications: notificationsReducer,
  reservationTemplate: reservationTemplateReducer,
  profileBranches: profileBranchesReducer,
  reservationGroupSlot: reservationGroupSlotReducer,
  services: servicesReducer,
});

export default reducers;
