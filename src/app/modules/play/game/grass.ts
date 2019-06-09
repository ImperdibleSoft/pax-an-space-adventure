import createAnimator, { IAnimator } from './animator';

export interface IGrass extends IAnimator {
  getFrameSets: () => {
    wave: number[];
  };
  getX: () => number;
  getY: () => number;
}

const createGrass = (initialX: number, initialY: number): IGrass => {
  // Props
  const frameSets = {
    wave: [14, 15, 16, 15],
  };
  const x = initialX;
  const y = initialY;

  const animator = createAnimator(frameSets.wave, 25);

  return {
    ...animator,

    // Props
    getFrameSets: () => frameSets,
    getX: () => x,
    getY: () => y,
  };
};

export default createGrass;
