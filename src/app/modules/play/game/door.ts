import createGameObject, { IGameObject } from './game-object';

export interface IDoor extends IGameObject {
  getDestinationX: () => number;
  getDestinationY: () => number;
  getDestinationZone: () => string;
}

const createDoor = (
  initialX: number,
  initialY: number,
  initialWidht: number,
  initialHeight: number,
  initialDestinationX: number,
  initialDestinationY: number,
  initialDestinationZone: string
): IDoor => {
  // Props
  const destinationX = initialDestinationX;
  const destinationY = initialDestinationY;
  const destinationZone = initialDestinationZone;

  const gameObject = createGameObject(initialX, initialY, initialWidht, initialHeight);

  // Methods

  return {
    ...gameObject,

    // Props
    getDestinationX: () => destinationX,
    getDestinationY: () => destinationY,
    getDestinationZone: () => destinationZone,
  };
};

export default createDoor;
