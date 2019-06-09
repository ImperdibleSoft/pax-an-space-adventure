export interface IDisplay {
  buffer: CanvasRenderingContext2D | null;
  context: CanvasRenderingContext2D | null;
  drawMap: (
    image: CanvasImageSource,
    imageColumns: number,
    map: number[],
    mapColumns: number,
    tileSize: number
  ) => void;
  drawObject: (
    image: CanvasImageSource,
    sourceX: number,
    sourceY: number,
    destinationX: number,
    destinationY: number,
    width: number,
    height: number
  ) => void;
  render: () => void;
  resize: (width: number, height: number, heightWidthRatio: number) => void;
}

const createDisplay = (canvas: HTMLCanvasElement): IDisplay => {
  const buffer = document.createElement('canvas').getContext('2d');
  const context = canvas.getContext('2d');

  const drawMap = (
    image: CanvasImageSource,
    imageColumns: number,
    map: number[],
    mapColumns: number,
    tileSize: number
  ) => {
    if (buffer) {
      for (let index = map.length - 1; index > -1; index--) {
        const value = map[index];
        const sourceX = (value % imageColumns) * tileSize;
        const sourceY = Math.floor(value / imageColumns) * tileSize;
        const destinationX = (index % mapColumns) * tileSize;
        const destinationY = Math.floor(index / mapColumns) * tileSize;

        buffer.drawImage(image, sourceX, sourceY, tileSize, tileSize, destinationX, destinationY, tileSize, tileSize);
      }
    }
  };

  const drawObject = (
    image: CanvasImageSource,
    sourceX: number,
    sourceY: number,
    destinationX: number,
    destinationY: number,
    width: number,
    height: number
  ) => {
    if (buffer) {
      buffer.drawImage(
        image,
        sourceX,
        sourceY,
        width,
        height,
        Math.round(destinationX),
        Math.round(destinationY),
        width,
        height
      );
    }
  };

  const resize = (width: number, height: number, heightWidthRatio: number) => {
    if (context) {
      if (height / width > heightWidthRatio) {
        context.canvas.height = width * heightWidthRatio;
        context.canvas.width = width;
      } else {
        context.canvas.height = height;
        context.canvas.width = height / heightWidthRatio;
      }

      context.imageSmoothingEnabled = false;
    }
  };

  const render = () => {
    if (buffer && context) {
      context.drawImage(
        buffer.canvas,
        0,
        0,
        buffer.canvas.width,
        buffer.canvas.height,
        0,
        0,
        context.canvas.width,
        context.canvas.height
      );
    }
  };

  return {
    buffer,
    context,
    drawMap,
    drawObject,
    render,
    resize,
  };
};

export default createDisplay;
