const assets = {
  requestJSON: (url: string, callback: (object: any) => void): void => {
    const request = new XMLHttpRequest();
    request.addEventListener('load', () => callback(JSON.parse(request.responseText)), { once: true });
    request.open('GET', url);
    request.send();
  },

  requestImage: (url: string, callback: (image: HTMLImageElement) => void) => {
    const image = new Image();
    image.addEventListener('load', () => callback(image), { once: true });
    image.src = url;
  },

  tileSetImage: undefined,
};

export default assets;
