import * as React from 'react';
import injectSheet from 'react-jss';

import FooterWrapper from './shell/footer/footer-wrapper';
import HeaderWrapper from './shell/header/header-wrapper';

import { GREY_DARK_3 } from '../constants/styles/styles-colors';
import { DESKTOP } from '../constants/styles/styles-media-queries';
import { CONTENT } from '../constants/styles/styles-zindex';

import { ISheet } from '../models';

const music = require('../assets/music/pax-una-aventura-espacial-banda-sonora-jaime-altozano.mp3');

const sheet: ISheet = {
  audio: {
    display: 'none',
  },
  content: {},
  contentWrapper: {
    [DESKTOP]: {
      zIndex: CONTENT,
    },
  },
  wrapper: {
    background: GREY_DARK_3,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
    overflowY: 'auto',
  },
};
interface IOwnProps {
  areSoundEffectsEnabled: boolean;
  children: JSX.Element;
  classes: { [key: string]: string };
  isMusicEnabled: boolean;
}

const unstyledAppView = ({ areSoundEffectsEnabled, children, classes, isMusicEnabled }: IOwnProps) => {
  // React.useEffect(() => {
  //   const musicDomElement = document.querySelector('audio#music') as HTMLAudioElement;
  //   musicDomElement.play();
  // }, []);

  return (
    <div id="app" className={classes.wrapper}>
      <HeaderWrapper />
      <div className={classes.contentWrapper}>
        <div className={classes.content}>{children}</div>
        <FooterWrapper />
      </div>
      <div id="sidebar-mount-point" className={classes.sidebarPortal} />

      <audio id="music" className={classes.audio} autoPlay src={music} muted={!isMusicEnabled} />
      <audio id="sound-effects" className={classes.audio} autoPlay />
    </div>
  );
};

const AppView = injectSheet(sheet)(unstyledAppView);

export default AppView;
