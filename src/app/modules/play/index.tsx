import * as React from 'react';
import gameApi from '../../../common/apis/game';

const Game = () => {
  React.useEffect(gameApi.game.init, []);

  return (
    <div>
      <p>Game</p>
      <canvas />
    </div>
  );
};

export default Game;
