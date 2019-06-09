import { CSSProperties } from 'react-jss';

export interface IRootState {}

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
