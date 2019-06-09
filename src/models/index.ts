import { CSSProperties } from 'react-jss';

import { ISettingsState } from './settings';

export interface IRootState {
  settings: ISettingsState;
}

export interface ISheet {
  [key: string]: CSSProperties<any>;
}

export type FrameSet = number[];

export interface IFrameSets {
  'idle-left': FrameSet;
  'idle-right': FrameSet;
  'jump-left': FrameSet;
  'jump-right': FrameSet;
  'move-left': FrameSet;
  'move-right': FrameSet;
}
