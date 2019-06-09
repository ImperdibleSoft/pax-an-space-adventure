import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { NavLink } from 'react-router-dom';

import MenuButton from './menu-button';

import { HOME, PLAY } from '../../../constants/appRoutes';
import { PADDING_S, PADDING_XXXL, PAGE_MAX_WIDTH } from '../../../constants/styles/styles';
import { GREEN, GREY_DARK_3 } from '../../../constants/styles/styles-colors';
import { TEXT_WHITE } from '../../../constants/styles/styles-fonts';
import { DESKTOP, MAX_TABLET_L } from '../../../constants/styles/styles-media-queries';
import { HEADER } from '../../../constants/styles/styles-zindex';

import { ISheet } from '../../../models';

const logo = '';

const sheet: ISheet = {
  home: {
    border: '2px solid transparent',
    borderRadius: '50%',
    display: 'inline-block',
    lineHeight: 0.8,
    padding: PADDING_S,
  },
  homeActive: {
    borderColor: GREEN,
  },
  homeOpen: {
    marginLeft: '50%',
    transform: 'translateX(-50%)',
  },
  homeWrapper: {
    display: 'inline-block',
    transition: 'margin 0.2s, transform 0.2s',

    [DESKTOP]: {
      padding: PADDING_XXXL,
      verticalAlign: 'top',
    },
  },
  logo: {},
  menuButton: {
    position: 'absolute',
    right: PADDING_XXXL,
    top: PADDING_XXXL,

    [DESKTOP]: {
      display: 'none',
    },
  },
  menuDropdown: {
    height: 0,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: PADDING_XXXL * 3,
    transition: 'height 0.2s, padding 0.2s',

    [DESKTOP]: {
      backgroundColor: 'transparent',
      flex: 1,
      height: 'auto',
      left: 'initial',
      overflow: 'initial',
      position: 'initial',
      top: 'initial',
    },
  },
  menuDropdownOpen: {
    height: `calc(100vh - ${PADDING_XXXL * 3}px)`,
    paddingTop: 60,

    [DESKTOP]: {
      height: 'auto',
      paddingTop: 0,
    },
  },
  seasonSelector: {
    [MAX_TABLET_L]: {
      display: 'none',
    },
  },
  wrapper: {
    color: TEXT_WHITE,
    padding: PADDING_XXXL,
    position: 'relative',
    width: '100%',
    zIndex: HEADER,

    [DESKTOP]: {
      alignItems: 'center',
      background: `linear-gradient(to bottom, ${GREY_DARK_3} 0%, transparent 100%);`,
      display: 'flex',
      margin: '0 auto',
      maxWidth: PAGE_MAX_WIDTH,
      padding: 0,
      position: 'sticky',
      top: -1,
    },
  },
};

interface IOwnProps {
  areSoundEffectsEnabled: boolean;
  classes: { [key: string]: string };
  handleNavigation: () => void;
  handleToggleMenu: () => void;
  handleToggleMusic: () => void;
  handleToggleSoundEffects: () => void;
  isMusicEnabled: boolean;
  isOpen: boolean;
}

const unstyledHeaderView = ({
  areSoundEffectsEnabled,
  classes,
  handleNavigation,
  handleToggleMenu,
  handleToggleMusic,
  handleToggleSoundEffects,
  isMusicEnabled,
  isOpen,
}: IOwnProps) => (
  <header className={classes.wrapper}>
    <MenuButton className={classes.menuButton} isOpen={isOpen} onClick={handleToggleMenu} />

    <div className={classnames(classes.homeWrapper, { [classes.homeOpen]: isOpen })}>
      <NavLink className={classes.home} activeClassName={classes.homeActive} to={HOME} exact onClick={handleNavigation}>
        <img className={classes.logo} src={logo} />
      </NavLink>
    </div>

    <div>
      <NavLink to={PLAY} exact>
        Play
      </NavLink>

      <button onClick={handleToggleMusic}>Turn {isMusicEnabled ? 'off' : 'on'} music</button>
      <button onClick={handleToggleSoundEffects}>Turn {areSoundEffectsEnabled ? 'off' : 'on'} sounds</button>
    </div>
  </header>
);

const HeaderView = injectSheet(sheet)(unstyledHeaderView);

export default HeaderView;
