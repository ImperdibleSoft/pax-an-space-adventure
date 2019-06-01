import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import SidebarToggler from './toggler';

import { PADDING_XL, PADDING_XXXL } from '../../../constants/styles/styles';
import { GREY_DARK_2 } from '../../../constants/styles/styles-colors';
import { TEXT_WHITE } from '../../../constants/styles/styles-fonts';
import { MAX_TABLET_L } from '../../../constants/styles/styles-media-queries';
import { SIDEBAR } from '../../../constants/styles/styles-zindex';

import { ISheet } from '../../../models';

const SIDEBAR_WIDTH = 352;
export const SIDEBAR_TOGGLER_WIDTH = 42;

const sheet: ISheet = {
  avoidScroll: {},
  content: {
    flex: 1,
    opacity: 0,
    overflowY: 'auto',
    padding: PADDING_XL,
    transition: 'opacity 0.2s',
  },
  contentOpen: {
    opacity: 1,
  },
  heading: {
    padding: `${PADDING_XXXL}px 0`,
    textAlign: 'center',
    width: '100%',
  },
  wrapper: {
    background: GREY_DARK_2,
    color: TEXT_WHITE,
    display: 'flex',
    height: '100vh',
    left: -SIDEBAR_WIDTH + SIDEBAR_TOGGLER_WIDTH, // Available space without overlapping rankings
    position: 'fixed',
    top: 0,
    transition: 'left 0.2s',
    width: SIDEBAR_WIDTH,
    zIndex: SIDEBAR,

    [MAX_TABLET_L]: {
      display: 'none',
    },
  },
  wrapperOpen: {
    left: 0,
  },
  wrapperRight: {
    left: 'initial',
    right: -SIDEBAR_WIDTH + SIDEBAR_TOGGLER_WIDTH, // Available space without overlapping rankings
    transition: 'right 0.2s',
  },
  wrapperRightOpen: {
    right: 0,
  },
};

interface IOwnProps {
  children: React.ReactNode;
  classes: { [key: string]: string };
  handleToggleSidebar: () => void;
  isOpen: boolean;
  isRight?: boolean;
  title: string;
}

const UnstyledSidebarView = ({ children, classes, handleToggleSidebar, isOpen, isRight, title }: IOwnProps) => {
  const renderToggler = () => (
    <SidebarToggler handleToggleSidebar={handleToggleSidebar} isOpen={isOpen} isRight={isRight}>
      {title}
    </SidebarToggler>
  );

  return (
    <div
      className={classnames(classes.wrapper, {
        [classes.wrapperOpen]: !isRight && isOpen,
        [classes.wrapperRight]: isRight,
        [classes.wrapperRightOpen]: isRight && isOpen,
      })}
    >
      {isRight && renderToggler()}
      <div className={classnames(classes.content, { [classes.contentOpen]: isOpen })}>
        <h3 className={classes.heading}>{title}</h3>
        {children}
      </div>
      {!isRight && renderToggler()}
    </div>
  );
};

const SidebarView = injectSheet(sheet)(UnstyledSidebarView);

export default SidebarView;
