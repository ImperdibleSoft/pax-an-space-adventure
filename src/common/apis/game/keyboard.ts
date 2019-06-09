import { log } from '../../utils/logger';

import { UP, W, DOWN, S, LEFT, A, RIGHT, D, SPACEBAR } from '../../../constants/keyboard-keys';

const handleKeyDown = (key: number) => {
  switch (key) {
    case UP:
    case W:
      log(`Moving up`);
      break;

    case DOWN:
    case S:
      log(`Moving down`);
      break;

    case LEFT:
    case A:
      log(`Moving left`);
      break;

    case RIGHT:
    case D:
      log(`Moving right`);
      break;

    case SPACEBAR:
      log('Jumping');
      break;

    default:
      log(`Pressing <${key}> key`);
  }
};

const handleKeyUp = (key: number) => {
  switch (key) {
    default:
      log('Stop moving');
  }
};

const keyboardListener = (event: KeyboardEvent) => {
  const { keyCode: key, type } = event;

  switch (type) {
    case 'keydown':
      handleKeyDown(key);
      break;

    case 'keyup':
      handleKeyUp(key);
      break;

    default:
  }
};

const keyboard = {
  removeListeners: () => {
    log('Removing keyboard listener');
    document.removeEventListener('keydown', keyboardListener);
    document.removeEventListener('keyup', keyboardListener);
  },
  setListeners: () => {
    log('Adding keyboard listener');
    document.addEventListener('keydown', keyboardListener);
    document.addEventListener('keyup', keyboardListener);
  },
};

export default keyboard;
