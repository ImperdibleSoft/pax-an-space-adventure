import createAnimator, { IAnimator } from './animator';
import createGameObject, { IGameObject } from './game-object';

export interface ICarrot extends IAnimator, IGameObject {
  getBaseX: () => number;
  getBaseY: () => number;
  getFrameIndex: () => number;
  getFrameSets: () => {
    twirl: number[];
  };
  getPositionX: () => number;
  getPositionY: () => number;
  getX: () => number;
  getY: () => number;

  updatePosition: () => void;
}

const createCarrot = (initialX: number, initialY: number): ICarrot => {
  // Props
  const frameSets = {
    twirl: [12, 13],
  };
  const frameIndex = Math.floor(Math.random() * 2);

  const baseX = initialX;
  const baseY = initialY;
  let positionX = Math.random() * Math.PI * 2;
  let positionY = positionX * 2;
  let x = initialX;
  let y = initialY;

  const animator = createAnimator(frameSets.twirl, 15);
  const gameObject = createGameObject(initialX, initialY, 7, 14);

  // Methods
  const updatePosition = () => {
    positionX += 0.1;
    positionY += 0.2;

    x = baseX + Math.cos(positionX) * 2;
    y = baseY + Math.sin(positionY);
  };

  return {
    ...animator,
    ...gameObject,

    // Props
    getBaseX: () => baseX,
    getBaseY: () => baseY,
    getFrameIndex: () => frameIndex,
    getFrameSets: () => frameSets,
    getPositionX: () => positionX,
    getPositionY: () => positionY,
    getX: () => x,
    getY: () => y,

    // Methods
    updatePosition,
  };
};

export default createCarrot;
