import { Action } from 'redux';

import { ActionCreator } from '../../definitions/action-creator';

import { SettingsActionTypes, TOGGLE_MUSIC, TOGGLE_SOUND_EFFECTS } from '../../constants/actionTypes';

export interface ISettingsActions extends Action {
  type: SettingsActionTypes;
}

export const toggleMusic: ActionCreator = () => dispatch => {
  dispatch({
    type: TOGGLE_MUSIC,
  });
};

export const toggleSoundEffects: ActionCreator = () => dispatch => {
  dispatch({
    type: TOGGLE_SOUND_EFFECTS,
  });
};
