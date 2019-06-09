import createCarrot, { ICarrot } from './carrot';
import createCollider from './collider';
import createDoor, { IDoor } from './door';
import createGrass, { IGrass } from './grass';
import { IMovingObject } from './moving-object';
import createPlayer from './player';
import createTileSet from './tile-set';

import { IZone } from '../../../../models/game';

const createWorld = (initialFriction = 0.85, initialGravity = 2) => {
  const collider = createCollider();

  const friction = initialFriction;
  const gravity = initialGravity;

  let columns = 12;
  let rows = 9;

  const player = createPlayer(32, 76);
  const tileSet = createTileSet(8, 16);

  let zoneId = '000';

  let carrotsCount = 0; // the number of carrots you have.
  let carrots: ICarrot[] = []; // the array of carrots in this zone;
  let door: IDoor | undefined;
  let doors: IDoor[] = [];
  let grass: IGrass[] = [];

  const height = tileSet.tileSize * rows;
  const width = tileSet.tileSize * columns;

  let collisionMap: number[] = [];
  let graphicalMap: number[] = [];

  const collideObject = (object: IMovingObject) => {
    /* I got rid of the world boundary collision. Now it's up to the tiles to keep
    the player from falling out of the world. */

    let bottom;
    let left;
    let right;
    let top;
    let value;

    top = Math.floor(object.getTop() / tileSet.tileSize);
    left = Math.floor(object.getLeft() / tileSet.tileSize);
    value = collisionMap[top * columns + left];
    collider.collide(value, object, left * tileSet.tileSize, top * tileSet.tileSize, tileSet.tileSize);

    top = Math.floor(object.getTop() / tileSet.tileSize);
    right = Math.floor(object.getRight() / tileSet.tileSize);
    value = collisionMap[top * columns + right];
    collider.collide(value, object, right * tileSet.tileSize, top * tileSet.tileSize, tileSet.tileSize);

    bottom = Math.floor(object.getBottom() / tileSet.tileSize);
    left = Math.floor(object.getLeft() / tileSet.tileSize);
    value = collisionMap[bottom * columns + left];
    collider.collide(value, object, left * tileSet.tileSize, bottom * tileSet.tileSize, tileSet.tileSize);

    bottom = Math.floor(object.getBottom() / tileSet.tileSize);
    right = Math.floor(object.getRight() / tileSet.tileSize);
    value = collisionMap[bottom * columns + right];
    collider.collide(value, object, right * tileSet.tileSize, bottom * tileSet.tileSize, tileSet.tileSize);
  };

  const setup = (zone: IZone) => {
    carrots = new Array();
    doors = new Array();
    grass = new Array();
    collisionMap = zone.collisionMap;
    graphicalMap = zone.graphicalMap;
    columns = zone.columns;
    rows = zone.rows;
    zoneId = zone.id;

    for (let index = zone.carrots.length - 1; index > -1; --index) {
      const carrot = zone.carrots[index];

      carrots[index] = createCarrot(carrot[0] * tileSet.tileSize + 5, carrot[1] * tileSet.tileSize - 2);
    }

    for (let index = zone.doors.length - 1; index > -1; --index) {
      const zoneDoor = zone.doors[index];

      doors[index] = createDoor(...zoneDoor);
    }

    for (let index = zone.grass.length - 1; index > -1; --index) {
      const zoneGrass = zone.grass[index];

      grass[index] = createGrass(zoneGrass[0] * tileSet.tileSize, zoneGrass[1] * tileSet.tileSize + 12);
    }

    if (typeof door !== 'undefined') {
      if (door.getDestinationX() !== -1) {
        player.setCenterX(door.getDestinationX());
        player.setOldCenterX(door.getDestinationX()); // It's important to reset the old position as well.
      }

      if (door.getDestinationY() !== -1) {
        player.setCenterY(door.getDestinationY());
        player.setOldCenterY(door.getDestinationY());
      }

      door = undefined; // Make sure to reset door so we don't trigger a zone load.
    }
  };

  const update = () => {
    player.updatePosition(gravity, friction);

    collideObject(player);

    for (let index = carrots.length - 1; index > -1; --index) {
      const carrot = carrots[index];

      carrot.updatePosition();
      carrot.animate();

      if (carrot.collideObject(player)) {
        carrots.splice(carrots.indexOf(carrot), 1);
        carrotsCount++;
      }
    }

    for (let index = doors.length - 1; index > -1; --index) {
      const zoneDoor = doors[index];

      if (zoneDoor.collideObjectCenter(player)) {
        door = zoneDoor;
      }
    }

    for (let index = grass.length - 1; index > -1; --index) {
      const selectedGrass = grass[index];

      selectedGrass.animate();
    }

    player.updateAnimation();
  };

  return {
    // Props
    getCollider: () => collider,

    getFriction: () => friction,
    getGravity: () => gravity,

    getColumns: () => columns,
    getRows: () => rows,

    getPlayer: () => player,
    getTileSet: () => tileSet,

    getZoneId: () => zoneId,

    getCarrots: () => carrots,
    getCarrotsCount: () => carrotsCount,
    getDoor: () => door,
    getDoors: () => doors,
    getGrass: () => grass,

    getHeight: () => height,
    getWidth: () => width,

    getCollisionMap: () => collisionMap,
    getGraphicalMap: () => graphicalMap,

    // Methods
    collideObject,
    setup,
    update,
  };
};

export default createWorld;
