import { IMovingObject } from './moving-object';

export interface ICollider {
  collide: (value: number, object: IMovingObject, tileX: number, tileY: number, tileSize: number) => boolean;
  collidePlatformBottom: (object: IMovingObject, tileBottom: number) => boolean;
  collidePlatformLeft: (object: IMovingObject, tileLeft: number) => boolean;
  collidePlatformRight: (object: IMovingObject, tileRight: number) => boolean;
  collidePlatformTop: (object: IMovingObject, tileTop: number) => boolean;
}

const createCollider = (): ICollider => {
  const collide = (value: number, object: IMovingObject, tileX: number, tileY: number, tileSize: number) => {
    switch (value) {
      case 1:
        return collidePlatformTop(object, tileY);

      case 2:
        return collidePlatformRight(object, tileX + tileSize);

      case 3:
        if (collidePlatformTop(object, tileY)) {
          return false;
        }
        return collidePlatformRight(object, tileX + tileSize);

      case 4:
        return collidePlatformBottom(object, tileY + tileSize);

      case 5:
        if (collidePlatformTop(object, tileY)) {
          return false;
        }
        return collidePlatformBottom(object, tileY + tileSize);

      case 6:
        if (collidePlatformRight(object, tileX + tileSize)) {
          return false;
        }
        return collidePlatformBottom(object, tileY + tileSize);

      case 7:
        if (collidePlatformTop(object, tileY)) {
          return false;
        }
        if (collidePlatformBottom(object, tileY + tileSize)) {
          return false;
        }
        collidePlatformRight(object, tileX + tileSize);

      case 8:
        return collidePlatformLeft(object, tileX);

      case 9:
        if (collidePlatformTop(object, tileY)) {
          return false;
        }
        return collidePlatformLeft(object, tileX);

      case 10:
        if (collidePlatformLeft(object, tileX)) {
          return false;
        }
        return collidePlatformRight(object, tileX + tileSize);

      case 11:
        if (collidePlatformTop(object, tileY)) {
          return false;
        }
        if (collidePlatformLeft(object, tileX)) {
          return false;
        }
        return collidePlatformRight(object, tileX + tileSize);

      case 12:
        if (collidePlatformBottom(object, tileY + tileSize)) {
          return false;
        }
        return collidePlatformLeft(object, tileX);

      case 13:
        if (collidePlatformTop(object, tileY)) {
          return false;
        }
        if (collidePlatformBottom(object, tileY + tileSize)) {
          return false;
        }
        return collidePlatformLeft(object, tileX);

      case 14:
        if (collidePlatformBottom(object, tileY + tileSize)) {
          return false;
        }
        if (collidePlatformLeft(object, tileX)) {
          return false;
        }
        return collidePlatformRight(object, tileX + tileSize);

      case 15:
        if (collidePlatformTop(object, tileY)) {
          return false;
        }
        if (collidePlatformBottom(object, tileY + tileSize)) {
          return false;
        }
        if (collidePlatformLeft(object, tileX)) {
          return false;
        }
        return collidePlatformRight(object, tileX + tileSize);

      default:
        return false;
    }
  };

  const collidePlatformBottom = (object: IMovingObject, tileBottom: number) => {
    if (object.getTop() < tileBottom && object.getOldTop() >= tileBottom) {
      object.setTop(tileBottom);
      object.setVelocityY(0);
      return true;
    }

    return false;
  };

  const collidePlatformLeft = (object: IMovingObject, tileLeft: number) => {
    if (object.getRight() > tileLeft && object.getOldRight() <= tileLeft) {
      object.setRight(tileLeft - 0.01);
      object.setVelocityX(0);
      return true;
    }

    return false;
  };

  const collidePlatformRight = (object: IMovingObject, tileRight: number) => {
    if (object.getLeft() < tileRight && object.getOldLeft() >= tileRight) {
      object.setLeft(tileRight);
      object.setVelocityX(0);
      return true;
    }

    return false;
  };

  const collidePlatformTop = (object: IMovingObject, tileTop: number) => {
    if (object.getBottom() > tileTop && object.getOldBottom() <= tileTop) {
      object.setBottom(tileTop - 0.01);
      object.setVelocityY(0);
      object.setJumping(false);
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
