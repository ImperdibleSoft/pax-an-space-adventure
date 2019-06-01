import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';

import { FONT_XXL, TEXT_WHITE } from '../../../constants/styles/styles-fonts';

import { ISheet } from '../../../models';

const sheet: ISheet = {
  wrapper: {
    appearance: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    color: TEXT_WHITE,
    fontSize: FONT_XXL,
    fontWeight: 700,
    height: 24,
    width: 24,
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  className?: string;
  isOpen: boolean;
  onClick: () => void;
}

const UnstyledMenuButton = ({ classes, className, isOpen, onClick }: IOwnProps) => (
  <button type="button" className={classnames(classes.wrapper, className)} onClick={onClick}>
    {isOpen ? 'x' : '-'}
  </button>
);

const MenuButton = injectSheet(sheet)(UnstyledMenuButton);

export default MenuButton;
