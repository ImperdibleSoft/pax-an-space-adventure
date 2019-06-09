import { ISettingsActions } from '../actions/settings';

import { TOGGLE_MUSIC, TOGGLE_SOUND_EFFECTS } from '../../constants/actionTypes';

import { initialSettingsState, ISettingsState } from '../../models/settings';

const reducer = (state = initialSettingsState, action: ISettingsActions) => {
  switch (action.type) {
    case TOGGLE_MUSIC:
      return {
        ...state,
        music: !state.music,
      };

    case TOGGLE_SOUND_EFFECTS:
      return {
        ...state,
        soundEffects: !state.soundEffects,
      };

    default:
      return state;
  }
};

export const isMusicEnabled = (state: ISettingsState) => state.music;
export const areSoundEffectsEnabled = (state: ISettingsState) => state.soundEffects;

export default reducer;
