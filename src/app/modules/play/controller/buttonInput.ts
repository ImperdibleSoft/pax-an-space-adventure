export interface IButtonInput {
  active: boolean;
  down: boolean;
  getInput: (isDown: boolean) => void;
}

const createButtonInput = (initialDown: boolean): IButtonInput => {
  let down = initialDown;
  let active = (down = false);

  const getInput = (isDown: boolean) => {
    if (down !== isDown) {
      active = isDown;
    }
    down = isDown;
  };

  return {
    active,
    down,
    getInput,
  };
};

export default createButtonInput;
