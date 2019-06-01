import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import { FONT_L, TEXT_WHITE } from '../../../constants/styles/styles-fonts';

import { ISheet } from '../../../models';

const sheet: ISheet = {
  toggle: {
    appearance: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    color: TEXT_WHITE,
    cursor: 'pointer',
    fontSize: FONT_L,
    fontWeight: 700,
    height: 42,
    left: 42,
    letterSpacing: 4,
    outline: 'none',
    position: 'absolute',
    textTransform: 'uppercase',
    top: 0,
    transform: 'rotate(90deg)',
    transformOrigin: '0 0',
    width: '100vh',
  },
  toggleRight: {
    left: 'initial',
    top: '100vh',
    transform: 'rotate(-90deg)',
  },
  toggleWrapper: {
    position: 'relative',
    width: 42,
  },
};

interface IOwnProps {
  children: React.ReactNode;
  classes: { [key: string]: string };
  handleToggleSidebar: () => void;
  isOpen: boolean;
  isRight?: boolean;
}

const UnstyledSidebarToggler = ({ children, classes, handleToggleSidebar, isOpen, isRight }: IOwnProps) => (
  <div className={classes.toggleWrapper}>
    <button
      className={classnames(classes.toggle, { [classes.toggleRight]: isRight, [classes.toggleOpen]: isOpen })}
      onClick={handleToggleSidebar}
    >
      {children}
    </button>
  </div>
);

const SidebarToggler = injectSheet(sheet)(UnstyledSidebarToggler);

export default SidebarToggler;
