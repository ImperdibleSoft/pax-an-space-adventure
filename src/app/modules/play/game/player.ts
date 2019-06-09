import createAnimator, { IAnimator } from './animator';
import createMovingObject, { IMovingObject } from './moving-object';

import { IFrameSets } from '../../../../models';

export interface IPlayer extends IMovingObject, IAnimator {
  getDirectionX: () => number;
  jump: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  updateAnimation: () => void;
  updatePosition: (gravity: number, friction: number) => void;
}

const createPlayer = (initialX: number, initialY: number): IPlayer => {
  // Player props
  let directionX = -1;
  let x = initialX;
  let y = initialY;
  const frameSets: IFrameSets = {
    'idle-left': [0],
    'idle-right': [6],
    'jump-left': [1],
    'jump-right': [7],
    'move-left': [2, 3, 4, 5],
    'move-right': [8, 9, 10, 11],
  };

  const movingObject = createMovingObject(initialX, initialY, 7, 12);
  let jumping = movingObject.getJumping();
  let velocityX = movingObject.getVelocityX();
  let velocityY = movingObject.getVelocityY();
  let xOld = movingObject.getXOld();
  let yOld = movingObject.getYOld();
  const height = movingObject.getHeight();
  const width = movingObject.getWidth();
  const velocityMax = movingObject.getVelocityMax();

  const animator = createAnimator(frameSets['idle-left'], 10);
  const { animate, changeFrameSet } = animator;

  // Player methods
  const jump = () => {
    /* Made it so you can only jump if you aren't falling faster than 10px per frame. */
    if (!jumping && velocityY < 10) {
      jumping = true;
      velocityY -= 13;
    }
  };

  const moveLeft = () => {
    directionX = -1;
    velocityX -= 0.55;
  };

  const moveRight = () => {
    directionX = 1;
    velocityX += 0.55;
  };

  const updateAnimation = () => {
    if (velocityY < 0) {
      if (directionX < 0) {
        changeFrameSet(frameSets['jump-left'], 'pause');
      } else {
        changeFrameSet(frameSets['jump-right'], 'pause');
      }
    } else if (directionX < 0) {
      if (velocityX < -0.1) {
        changeFrameSet(frameSets['move-left'], 'loop', 5);
      } else {
        changeFrameSet(frameSets['idle-left'], 'pause');
      }
    } else if (directionX > 0) {
      if (velocityX > 0.1) {
        changeFrameSet(frameSets['move-right'], 'loop', 5);
      } else {
        changeFrameSet(frameSets['idle-right'], 'pause');
      }
    }

    animate();
  };

  const updatePosition = (gravity: number, friction: number) => {
    xOld = x;
    yOld = y;

    velocityY += gravity;
    velocityX *= friction;

    /* Made it so that velocity cannot exceed velocityMax */
    if (Math.abs(velocityX) > velocityMax) {
      velocityX = velocityMax * Math.sign(velocityX);
    }

    if (Math.abs(velocityY) > velocityMax) {
      velocityY = velocityMax * Math.sign(velocityY);
    }

    x += velocityX;
    y += velocityY;
  };

  return {
    ...movingObject,
    ...animator,

    // Props
    getBottom: () => y + height,
    getDirectionX: () => directionX,
    getLeft: () => x,
    getRight: () => x + width,
    getTop: () => y,
    getX: () => x,
    getXOld: () => xOld,
    getY: () => y,
    getYOld: () => yOld,

    // Methods
    jump,
    moveLeft,
    moveRight,
    updateAnimation,
    updatePosition,
  };
};

export default createPlayer;
