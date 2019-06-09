import createWorld from './world';

const createGame = () => {
  const world = createWorld();

  const update = () => {
    world.update();
  };

  return {
    // Props
    world,

    // Methods,
    update,
  };
};

export default createGame;
