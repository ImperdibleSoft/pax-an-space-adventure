import createAssetsManager from '../../../app/modules/play/assets-manager';
import createController from '../../../app/modules/play/controller';
import createDisplay from '../../../app/modules/play/display';
import createEngine from '../../../app/modules/play/engine';
import createGame from '../../../app/modules/play/game';

import { FPS } from '../../../constants/game-settings';
import { HEADER_SIZE } from '../../../constants/styles/styles';

const zone000 = require('../../../app/modules/play/zones/000.json');

const ZONE_PREFIX = '07/zone';
const ZONE_SUFFIX = '.json';

const gameApi = {
  init: () => {
    const keyDownUp = ({ type, keyCode }: KeyboardEvent) => {
      controller.keyDownUp(type, keyCode);
    };

    const resize = () => {
      const headerDom = document.querySelector('header');
      const headerHeight = headerDom ? headerDom.offsetHeight : HEADER_SIZE;

      const isFullScreen = window.innerHeight >= screen.height;

      display.resize(
        window.innerWidth,
        isFullScreen ? window.innerHeight : window.innerHeight - headerHeight,
        game.world.getHeight() / game.world.getWidth()
      );
      display.render();

      // const rectangle = display.context && display.context.canvas.getBoundingClientRect;
    };

    const render = () => {
      const tileSetImage = assetsManager.getTileSetImage();
      if (typeof tileSetImage !== 'undefined') {
        let frame;

        // Draw map
        display.drawMap(
          tileSetImage,
          game.world.getTileSet().columns,
          game.world.getGraphicalMap(),
          game.world.getColumns(),
          game.world.getTileSet().tileSize
        );

        // Draw carrots
        for (let index = game.world.getCarrots().length - 1; index > -1; --index) {
          const carrot = game.world.getCarrots()[index];

          frame = game.world.getTileSet().frames[carrot.getFrameValue()];
          display.drawObject(
            tileSetImage,
            frame.getX(),
            frame.getY(),
            carrot.getX() + Math.floor(carrot.getWidth() * 0.5 - frame.getWidth() * 0.5) + frame.getOffsetX(),
            carrot.getY() + frame.getOffsetY(),
            frame.getWidth(),
            frame.getHeight()
          );
        }

        // Draw player
        frame = game.world.getTileSet().frames[game.world.getPlayer().getFrameValue()];
        display.drawObject(
          tileSetImage,
          frame.getX(),
          frame.getY(),
          game.world.getPlayer().getX() +
            Math.floor(game.world.getPlayer().getWidth() * 0.5 - frame.getWidth() * 0.5) +
            frame.getOffsetX(),
          game.world.getPlayer().getY() + frame.getOffsetY(),
          frame.getWidth(),
          frame.getHeight()
        );

        // Draw grass
        for (let index = game.world.getGrass().length - 1; index > -1; --index) {
          const grass = game.world.getGrass()[index];

          frame = game.world.getTileSet().frames[grass.getFrameValue()];
          display.drawObject(
            tileSetImage,
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
    const engine = createEngine(FPS, render, update);

    if (display.buffer) {
      display.buffer.canvas.height = game.world.getHeight();
      display.buffer.canvas.width = game.world.getWidth();
      display.buffer.imageSmoothingEnabled = false;

      game.world.setup(zone000);

      assetsManager.requestImage(
        'https://raw.githubusercontent.com/frankarendpoth/frankarendpoth.github.io/master/content/pop-vlog/javascript/2018/006-rabbit-trap/rabbit-trap.png',
        image => {
          assetsManager.setTileSetImage(image);

          resize();

          engine.start();
        }
      );

      window.addEventListener('keydown', keyDownUp);
      window.addEventListener('keyup', keyDownUp);
      window.addEventListener('resize', resize);
    }

    // return game.world;
  },
};

export default gameApi;
