import createButtonInput, { IButtonInput } from './buttonInput';

export interface IController {
  keyDownUp: (type: string, keyCode: number) => void;
  left: IButtonInput;
  right: IButtonInput;
  up: IButtonInput;
}

const createController = (): IController => {
  const left = createButtonInput(false);
  const right = createButtonInput(false);
  const up = createButtonInput(false);

  const keyDownUp = (type: string, keyCode: number) => {
    const down = type === 'keydown' ? true : false;

    switch (keyCode) {
      case 37:
        left.getInput(down);
        break;
      case 38:
        up.getInput(down);
        break;
      case 39:
        right.getInput(down);
        break;
    }
  };

  return { keyDownUp, left, right, up };
};

export default createController;
