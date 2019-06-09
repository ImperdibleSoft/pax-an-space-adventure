export interface IAssetsManager {
  requestImage: (url: string, callback: (image: HTMLImageElement) => void) => void;
  requestJSON: (url: string, callback: (object: any) => void) => void;
  setTileSetImage: (newTileSetImage: CanvasImageSource) => void;
  tileSetImage?: CanvasImageSource;
}

const createAssetsManager = (): IAssetsManager => {
  let tileSetImage;

  const requestImage = (url: string, callback: (image: HTMLImageElement) => void) => {
    const image = new Image();
    image.addEventListener('load', () => callback(image), { once: true });
    image.src = url;
  };

  const requestJSON = (url: string, callback: (object: any) => void): void => {
    const request = new XMLHttpRequest();
    request.addEventListener('load', () => callback(JSON.parse(request.responseText)), { once: true });
    request.open('GET', url);
    request.send();
  };

  const setTileSetImage = (newTileSetImage: CanvasImageSource) => {
    tileSetImage = newTileSetImage;
  };

  return {
    requestImage,
    requestJSON,
    setTileSetImage,
    tileSetImage,
  };
};

export default createAssetsManager;
