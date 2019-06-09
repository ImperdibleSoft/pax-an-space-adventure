import { combineReducers } from 'redux';

// Import reducers
import settingsReducer, * as settingsSelectors from './settings';

import { IRootState } from '../../models';

// Declare root reducer
const rootReducer = combineReducers({
  settings: settingsReducer,
});

// Custom selectors
export const isMusicEnabled = ({ settings }: IRootState) => settingsSelectors.isMusicEnabled(settings);
export const areSoundEffectsEnabled = ({ settings }: IRootState) => settingsSelectors.areSoundEffectsEnabled(settings);

export default rootReducer;
