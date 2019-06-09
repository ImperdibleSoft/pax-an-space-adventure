import { IMovingObject } from './moving-object';

export interface ICollider {
  collide: (value: number, object: IMovingObject, tileX: number, tileY: number, tileSize: number) => void;
  collidePlatformBottom: (object: IMovingObject, tileBottom: number) => boolean;
  collidePlatformLeft: (object: IMovingObject, tileLeft: number) => boolean;
  collidePlatformRight: (object: IMovingObject, tileRight: number) => boolean;
  collidePlatformTop: (object: IMovingObject, tileTop: number) => boolean;
}

const createCollider = (): ICollider => {
  const collide = (value: number, object: IMovingObject, tileX: number, tileY: number, tileSize: number) => {
    switch (value) {
      case 1:
        collidePlatformTop(object, tileY);
        break;
      case 2:
        collidePlatformRight(object, tileX + tileSize);
        break;
      case 3:
        if (collidePlatformTop(object, tileY)) {
          return;
        }
        collidePlatformRight(object, tileX + tileSize);
        break;
      case 4:
        collidePlatformBottom(object, tileY + tileSize);
        break;
      case 5:
        if (collidePlatformTop(object, tileY)) {
          return;
        }
        collidePlatformBottom(object, tileY + tileSize);
        break;
      case 6:
        if (collidePlatformRight(object, tileX + tileSize)) {
          return;
        }
        collidePlatformBottom(object, tileY + tileSize);
        break;
      case 7:
        if (collidePlatformTop(object, tileY)) {
          return;
        }
        if (collidePlatformBottom(object, tileY + tileSize)) {
          return;
        }
        collidePlatformRight(object, tileX + tileSize);
        break;
      case 8:
        collidePlatformLeft(object, tileX);
        break;
      case 9:
        if (collidePlatformTop(object, tileY)) {
          return;
        }
        collidePlatformLeft(object, tileX);
        break;
      case 10:
        if (collidePlatformLeft(object, tileX)) {
          return;
        }
        collidePlatformRight(object, tileX + tileSize);
        break;
      case 11:
        if (collidePlatformTop(object, tileY)) {
          return;
        }
        if (collidePlatformLeft(object, tileX)) {
          return;
        }
        collidePlatformRight(object, tileX + tileSize);
        break;
      case 12:
        if (collidePlatformBottom(object, tileY + tileSize)) {
          return;
        }
        collidePlatformLeft(object, tileX);
        break;
      case 13:
        if (collidePlatformTop(object, tileY)) {
          return;
        }
        if (collidePlatformBottom(object, tileY + tileSize)) {
          return;
        }
        collidePlatformLeft(object, tileX);
        break;
      case 14:
        if (collidePlatformBottom(object, tileY + tileSize)) {
          return;
        }
        if (collidePlatformLeft(object, tileX)) {
          return;
        }
        collidePlatformRight(object, tileX + tileSize);
        break;
      case 15:
        if (collidePlatformTop(object, tileY)) {
          return;
        }
        if (collidePlatformBottom(object, tileY + tileSize)) {
          return;
        }
        if (collidePlatformLeft(object, tileX)) {
          return;
        }
        collidePlatformRight(object, tileX + tileSize);
        break;
    }
  };

  const collidePlatformBottom = (object: IMovingObject, tileBottom: number) => {
    console.log('RPG: <collider>: checking <collidePlatformBottom>');
    if (object.getTop() < tileBottom && object.getOldTop() >= tileBottom) {
      object.setTop(tileBottom);
      object.setVelocityY(0);
      console.log('RPG: <collider>: Should collide');
      console.log('RPG: <collider>: New top has been set', object.getTop());
      return true;
    }

    return false;
  };

  const collidePlatformLeft = (object: IMovingObject, tileLeft: number) => {
    console.log('RPG: <collider>: checking <collidePlatformLeft>');
    if (object.getRight() > tileLeft && object.getOldRight() <= tileLeft) {
      object.setRight(tileLeft - 0.01);
      object.setVelocityX(0);
      console.log('RPG: <collider>: Should collide');
      console.log('RPG: <collider>: New right has been set', object.getRight());
      return true;
    }

    return false;
  };

  const collidePlatformRight = (object: IMovingObject, tileRight: number) => {
    console.log('RPG: <collider>: checking <collidePlatformRight>');
    if (object.getLeft() < tileRight && object.getOldLeft() >= tileRight) {
      object.setLeft(tileRight);
      object.setVelocityX(0);
      console.log('RPG: <collider>: Should collide');
      console.log('RPG: <collider>: New left has been set', object.getLeft());
      return true;
    }

    return false;
  };

  const collidePlatformTop = (object: IMovingObject, tileTop: number) => {
    console.log('RPG: <collider>: checking <collidePlatformTop>');
    if (object.getBottom() > tileTop && object.getOldBottom() <= tileTop) {
      object.setBottom(tileTop - 0.01);
      object.setVelocityY(0);
      object.setJumping(false);
      console.log('RPG: <collider>: Should collide');
      console.log('RPG: <collider>: New bottom has been set', object.getBottom());
      return true;
    }

    return false;
  };

  return {
    collide,
    collidePlatformBottom,
    collidePlatformLeft,
    collidePlatformRight,
    collidePlatformTop,
  };
};

export default createCollider;
