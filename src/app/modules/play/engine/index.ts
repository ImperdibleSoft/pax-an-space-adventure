export interface IEngine {
  accumulatedTime: number;
  animationFrameRequest: number | undefined;
  time: number;
  timeStep: number;
  updated: boolean;
  start: () => void;
  stop: () => void;
}

const createEngine = (
  initialTimeStep: number,
  update: (timeStamp: number) => void,
  render: (timeStamp: number) => void
): IEngine => {
  let accumulatedTime = 0;
  let time: number = 0;
  const timeStep = initialTimeStep;
  let updated = false;

  let animationFrameRequest: number | undefined;

  const run = (timeStamp: number) => {
    animationFrameRequest = window.requestAnimationFrame(handleRun);
    accumulatedTime += timeStamp - time;
    time = timeStamp;

    if (accumulatedTime >= timeStep * 3) {
      accumulatedTime = timeStep;
    }

    while (accumulatedTime >= timeStep) {
      accumulatedTime -= timeStep;
      update(timeStamp);
      updated = true;
    }

    if (updated) {
      updated = false;
      render(timeStamp);
    }
  };

  const handleRun = (currentTimeStep: number) => {
    run(currentTimeStep);
  };

  const start = () => {
    accumulatedTime = timeStep;
    time = window.performance.now();
    animationFrameRequest = window.requestAnimationFrame(handleRun);
  };

  const stop = () => {
    if (animationFrameRequest) {
      window.cancelAnimationFrame(animationFrameRequest);
    }
  };

  return {
    accumulatedTime,
    animationFrameRequest,
    start,
    stop,
    time,
    timeStep,
    updated,
  };
};

export default createEngine;
