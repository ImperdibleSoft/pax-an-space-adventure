export interface ISettingsState {
  music: boolean;
  soundEffects: boolean;
}

export const initialSettingsState: ISettingsState = {
  music: true,
  soundEffects: true,
};
