export interface IZone {
  carrots: Array<[number, number]>;
  grass: Array<[number, number]>;

  doors: Array<[number, number, number, number, number, number, string]>;

  columns: number;
  rows: number;

  collisionMap: number[];
  graphicalMap: number[];

  id: string;
}
