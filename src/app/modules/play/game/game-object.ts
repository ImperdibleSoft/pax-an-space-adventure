export interface IGameObject {
  getHeight: () => number;
  getWidth: () => number;
  getX: () => number;
  getY: () => number;
  collideObject: (object: IGameObject) => boolean;
  collideObjectCenter: (object: IGameObject) => boolean;
  getBottom: () => number;
  getCenterX: () => number;
  getCenterY: () => number;
  getLeft: () => number;
  getRight: () => number;
  getTop: () => number;
  setBottom: (y: number) => void;
  setCenterX: (x: number) => void;
  setCenterY: (y: number) => void;
  setLeft: (x: number) => void;
  setRight: (x: number) => void;
  setTop: (y: number) => void;
}

const createGameObject = (
  initialX: number,
  initialY: number,
  initialWidth: number,
  initialHeight: number
): IGameObject => {
  const height = initialHeight;
  const width = initialWidth;
  let x = initialX;
  let y = initialY;

  /* Now does rectangular collision detection. */
  const collideObject = (object: IGameObject) => {
    if (
      getRight() < object.getLeft() ||
      getBottom() < object.getTop() ||
      getLeft() > object.getRight() ||
      getTop() > object.getBottom()
    ) {
      return false;
    }

    return true;
  };

  /* Does rectangular collision detection with the center of the object. */
  const collideObjectCenter = (object: IGameObject) => {
    const centerX = object.getCenterX();
    const centerY = object.getCenterY();

    if (centerX < getLeft() || centerX > getRight() || centerY < getTop() || centerY > getBottom()) {
      return false;
    }

    return true;
  };

  const getBottom = () => {
    return y + height;
  };

  const getCenterX = () => {
    return x + width * 0.5;
  };

  const getCenterY = () => {
    return y + height * 0.5;
  };

  const getLeft = () => {
    return x;
  };

  const getRight = () => {
    return x + width;
  };

  const getTop = () => {
    return y;
  };

  const setBottom = (newY: number) => {
    y = newY - height;
  };

  const setCenterX = (newX: number) => {
    x = newX - width * 0.5;
  };

  const setCenterY = (newY: number) => {
    y = newY - height * 0.5;
  };

  const setLeft = (newX: number) => {
    x = newX;
  };

  const setRight = (newX: number) => {
    x = newX - width;
  };

  const setTop = (newY: number) => {
    y = newY;
  };

  return {
    // Props
    getHeight: () => height,
    getWidth: () => width,
    getX: () => x,
    getY: () => y,

    // Methods
    collideObject,
    collideObjectCenter,
    getBottom,
    getCenterX,
    getCenterY,
    getLeft,
    getRight,
    getTop,
    setBottom,
    setCenterX,
    setCenterY,
    setLeft,
    setRight,
    setTop,
  };
};

export default createGameObject;
