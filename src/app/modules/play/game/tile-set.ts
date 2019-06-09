import createFrame, { IFrame } from './frame';

export interface ITileSet {
  columns: number;
  frames: IFrame[];
  tileSize: number;
}

const createTileSet = (initialColumns: number, initialTileSize: number): ITileSet => {
  const columns = initialColumns;
  const tileSize = initialTileSize;

  const frames = [
    createFrame(115, 96, 13, 16, 0, -4), // idle-left
    createFrame(50, 96, 13, 16, 0, -4), // jump-left
    createFrame(102, 96, 13, 16, 0, -4),
    createFrame(89, 96, 13, 16, 0, -4),
    createFrame(76, 96, 13, 16, 0, -4),
    createFrame(63, 96, 13, 16, 0, -4), // walk-left
    createFrame(0, 112, 13, 16, 0, -4), // idle-right
    createFrame(65, 112, 13, 16, 0, -4), // jump-right
    createFrame(13, 112, 13, 16, 0, -4),
    createFrame(26, 112, 13, 16, 0, -4),
    createFrame(39, 112, 13, 16, 0, -4),
    createFrame(52, 112, 13, 16, 0, -4), // walk-right
    createFrame(81, 112, 14, 16),
    createFrame(96, 112, 16, 16), // carrot
    createFrame(112, 115, 16, 4),
    createFrame(112, 124, 16, 4),
    createFrame(112, 119, 16, 4), // grass
  ];

  return {
    columns,
    frames,
    tileSize,
  };
};

export default createTileSet;
