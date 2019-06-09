import createGameObject, { IGameObject } from './game-object';

export interface IMovingObject extends IGameObject {
  getJumping: () => boolean;
  setJumping: (newJumping: boolean) => void;
  getVelocityMax: () => number;
  getVelocityX: () => number;
  setVelocityX: (newVelocityX: number) => void;
  getVelocityY: () => number;
  setVelocityY: (newVelocityY: number) => void;
  getXOld: () => number;
  getYOld: () => number;

  getOldBottom: () => number;
  getOldCenterX: () => number;
  getOldCenterY: () => number;
  getOldLeft: () => number;
  getOldRight: () => number;
  getOldTop: () => number;
  setOldBottom: (newOldY: number) => void;
  setOldCenterX: (newOldX: number) => void;
  setOldCenterY: (newOldY: number) => void;
  setOldLeft: (newOldX: number) => void;
  setOldRight: (newOldX: number) => void;
  setOldTop: (newOldY: number) => void;
}

const createMovingObject = (
  initialX: number,
  initialY: number,
  initialWidth: number,
  initialHeight: number,
  initialVelocityMax = 15
): IMovingObject => {
  const gameObject = createGameObject(initialX, initialY, initialWidth, initialHeight);

  const height = gameObject.getHeight();
  const width = gameObject.getWidth();

  let jumping = false;
  const setJumping = (newJumping: boolean) => {
    jumping = newJumping;
  };

  const velocityMax = initialVelocityMax;
  let velocityX = 0;
  const setVelocityX = (newVelocityX: number) => {
    velocityX = newVelocityX;
  };
  let velocityY = 0;
  const setVelocityY = (newVelocityY: number) => {
    velocityY = newVelocityY;
  };
  let xOld = initialX;
  let yOld = initialY;

  const getOldBottom = () => {
    return yOld + height;
  };

  const getOldCenterX = () => {
    return xOld + width * 0.5;
  };

  const getOldCenterY = () => {
    return yOld + height * 0.5;
  };

  const getOldLeft = () => {
    return xOld;
  };

  const getOldRight = () => {
    return xOld + width;
  };

  const getOldTop = () => {
    return yOld;
  };

  const setOldBottom = (newOldY: number) => {
    yOld = newOldY - height;
  };

  const setOldCenterX = (newOldX: number) => {
    xOld = newOldX - width * 0.5;
  };

  const setOldCenterY = (newOldY: number) => {
    yOld = newOldY - height * 0.5;
  };

  const setOldLeft = (newOldX: number) => {
    xOld = newOldX;
  };

  const setOldRight = (newOldX: number) => {
    xOld = newOldX - width;
  };

  const setOldTop = (newOldY: number) => {
    yOld = newOldY;
  };

  return {
    ...gameObject,

    // Props
    getJumping: () => jumping,
    getVelocityMax: () => velocityMax,
    getVelocityX: () => velocityX,
    getVelocityY: () => velocityY,
    getXOld: () => xOld,
    getYOld: () => yOld,
    setJumping,
    setVelocityX,
    setVelocityY,

    // Methods
    getOldBottom,
    getOldCenterX,
    getOldCenterY,
    getOldLeft,
    getOldRight,
    getOldTop,
    setOldBottom,
    setOldCenterX,
    setOldCenterY,
    setOldLeft,
    setOldRight,
    setOldTop,
  };
};

export default createMovingObject;
