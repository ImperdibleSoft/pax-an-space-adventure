import * as React from 'react';
import gameApi from '../../../common/apis/game';
import PlayView from './play-view';

const Game = () => {
  React.useEffect(gameApi.game.init, []);

  return <PlayView />;
};

export default Game;
