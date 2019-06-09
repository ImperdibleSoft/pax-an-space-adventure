import { FrameSet } from '../../../../models';

export interface IAnimator {
  getFrameValue: () => number;
  animate: () => void;
  changeFrameSet: (newFrameSet: FrameSet, newMode: string, newDelay?: number, newFrameIndex?: number) => void;
  loop: () => void;
}

const createAnimator = (frameSet: FrameSet = [], delay: number = 1, mode: string = 'loop'): IAnimator => {
  let count = 0;
  let frameIndex = 0;
  let frameValue = frameSet[0];

  const animate = () => {
    switch (mode) {
      case 'loop':
        loop();
        break;

      case 'pause':
        break;
    }
  };

  const changeFrameSet = (newFrameSet: FrameSet, newMode: string, newDelay = 10, newFrameIndex = 0) => {
    if (frameSet === newFrameSet) {
      return;
    }

    count = 0;
    delay = newDelay;
    frameSet = frameSet;
    frameIndex = newFrameIndex;
    frameValue = frameSet[newFrameIndex];
    mode = newMode;
  };

  const loop = () => {
    count++;

    while (count > delay) {
      count -= delay;
      frameIndex = frameIndex < frameSet.length - 1 ? frameIndex + 1 : 0;
      frameValue = frameSet[frameIndex];
    }
  };

  return {
    // Props
    getFrameValue: () => frameValue,

    // Methods
    animate,
    changeFrameSet,
    loop,
  };
};

export default createAnimator;
