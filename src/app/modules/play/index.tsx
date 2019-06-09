import * as React from 'react';

import createAssetsManager from './assets-manager';
import createController from './controller';
import createDisplay from './display';
import createEngine from './engine';
import createGame from './game';

const zone000 = require('./zones/000.json');

const ZONE_PREFIX = '07/zone';
const ZONE_SUFFIX = '.json';

const Game = () => {
  React.useEffect(() => {
    const keyDownUp = ({ type, keyCode }: KeyboardEvent) => {
      controller.keyDownUp(type, keyCode);
    };

    const resize = () => {
      display.resize(
        document.documentElement.clientWidth,
        document.documentElement.clientHeight,
        game.world.getHeight() / game.world.getWidth()
      );
      display.render();

      // const rectangle = display.context && display.context.canvas.getBoundingClientRect;
    };

    const render = () => {
      if (typeof assetsManager.tileSetImage !== 'undefined') {
        let frame;

        display.drawMap(
          assetsManager.tileSetImage,
          game.world.getTileSet().columns,
          game.world.getGraphicalMap(),
          game.world.getColumns(),
          game.world.getTileSet().tileSize
        );

        for (let index = game.world.getCarrots().length - 1; index > -1; --index) {
          const carrot = game.world.getCarrots()[index];

          frame = game.world.getTileSet().frames[carrot.getFrameValue()];

          display.drawObject(
            assetsManager.tileSetImage,
            frame.getX(),
            frame.getY(),
            carrot.getX() + Math.floor(carrot.getWidth() * 0.5 - frame.getWidth() * 0.5) + frame.getOffsetX(),
            carrot.getY() + frame.getOffsetY(),
            frame.getWidth(),
            frame.getHeight()
          );
        }

        frame = game.world.getTileSet().frames[game.world.getPlayer().getFrameValue()];

        display.drawObject(
          assetsManager.tileSetImage,
          frame.getX(),
          frame.getY(),
          game.world.getPlayer().getX() +
            Math.floor(game.world.getPlayer().getWidth() * 0.5 - frame.getWidth() * 0.5) +
            frame.getOffsetX(),
          game.world.getPlayer().getY() + frame.getOffsetY(),
          frame.getWidth(),
          frame.getHeight()
        );

        for (let index = game.world.getGrass().length - 1; index > -1; --index) {
          const grass = game.world.getGrass()[index];

          frame = game.world.getTileSet().frames[grass.getFrameValue()];

          display.drawObject(
            assetsManager.tileSetImage,
            frame.getX(),
            frame.getY(),
            grass.getX() + frame.getOffsetX(),
            grass.getY() + frame.getOffsetY(),
            frame.getWidth(),
            frame.getHeight()
          );
        }
      }

      display.render();
    };

    const update = () => {
      if (controller.left.active) {
        game.world.getPlayer().moveLeft();
      }
      if (controller.right.active) {
        game.world.getPlayer().moveRight();
      }
      if (controller.up.active) {
        game.world.getPlayer().jump();
        controller.up.active = false;
      }

      game.update();

      const door = game.world.getDoor();
      if (door) {
        engine.stop();

        assetsManager.requestJSON(ZONE_PREFIX + door.getDestinationZone() + ZONE_SUFFIX, zone => {
          game.world.setup(zone);
          engine.start();
        });

        return;
      }
    };

    const assetsManager = createAssetsManager();
    const controller = createController();
    // @ts-ignore Ignoring null canvas element
    const display = createDisplay(document.querySelector('canvas'));
    const game = createGame();
    const engine = createEngine(1000 / 30, render, update);

    if (display.buffer) {
      display.buffer.canvas.height = game.world.getHeight();
      display.buffer.canvas.width = game.world.getWidth();
      display.buffer.imageSmoothingEnabled = false;

      game.world.setup(zone000);

      assetsManager.requestImage('rabbit-trap.png', image => {
        assetsManager.setTileSetImage(image);

        resize();
        engine.start();
      });

      window.addEventListener('keydown', keyDownUp);
      window.addEventListener('keyup', keyDownUp);
      window.addEventListener('resize', resize);
    }
  }, []);

  return (
    <div>
      <p>Game</p>

      <canvas />
    </div>
  );
};

export default Game;
