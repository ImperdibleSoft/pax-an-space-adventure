import { CSSProperties } from 'react-jss';

export interface IRootState {}

export interface ISheet {
  [key: string]: CSSProperties<any>;
}
