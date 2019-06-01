import { GREY_DARK_3 } from '../../constants/styles/styles-colors';
import { FONT_L } from '../../constants/styles/styles-fonts';

const getGoogleFonts = () => {
  const style = document.createElement('style');
  style.innerHTML = "@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,700');";
  return style;
};

const getCSSAnimations = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes lds-dual-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;
  return style;
};

const getResetStyles = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    * {
      box-sizing: border-box;
      list-style: none;
      margin: 0;
      padding: 0;
      user-select: none;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }

    body {
      background-color: ${GREY_DARK_3};
      color: #303030;
      font-family: 'Open Sans', sans-serif;
      font-size: ${FONT_L};
      font-weight: 400;
      line-height: 1.5em;
      min-width: 320px;
    }
  `;
  return style;
};

const getAppStyles = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    #app-wrapper {
    }
  `;
  return style;
};

const getCustomStyles = () => [getGoogleFonts(), getCSSAnimations(), getResetStyles(), getAppStyles()];
export default getCustomStyles;
