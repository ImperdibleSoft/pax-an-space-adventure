export interface IFrame {
  getHeight: () => number;
  getOffsetX: () => number;
  getOffsetY: () => number;
  getWidth: () => number;
  getX: () => number;
  getY: () => number;
}

const createFrame = (
  initialX: number,
  initialY: number,
  initialWidth: number,
  initialHeight: number,
  initialOffsetX = 0,
  initialOffsetY = 0
): IFrame => {
  const x = initialX;
  const y = initialY;
  const width = initialWidth;
  const height = initialHeight;
  const offsetX = initialOffsetX;
  const offsetY = initialOffsetY;

  return {
    getHeight: () => height,
    getOffsetX: () => offsetX,
    getOffsetY: () => offsetY,
    getWidth: () => width,
    getX: () => x,
    getY: () => y,
  };
};

export default createFrame;
