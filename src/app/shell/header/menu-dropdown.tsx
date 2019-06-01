import classnames from 'classnames';
import * as React from 'react';
import injectSheet from 'react-jss';
import { NavLink } from 'react-router-dom';

import { PADDING_XXXL } from '../../../constants/styles/styles';
import { GREEN, GREY_DARK_3 } from '../../../constants/styles/styles-colors';
import { FONT_L, FONT_XXL, TEXT_WHITE } from '../../../constants/styles/styles-fonts';
import { DESKTOP } from '../../../constants/styles/styles-media-queries';

import { ISheet } from '../../../models';

const sheet: ISheet = {
  link: {
    borderBottom: `4px solid transparent`,
    color: TEXT_WHITE,
    fontSize: FONT_XXL,
    fontWeight: 700,
    textDecoration: 'none',
    textTransform: 'uppercase',

    [DESKTOP]: {
      fontSize: FONT_L,
    },
  },
  linkActive: {
    borderColor: GREEN,
  },
  list: {
    [DESKTOP]: {
      display: 'inline-block',
    },
  },
  option: {
    padding: `30px ${PADDING_XXXL}px`,
    textAlign: 'center',
    width: '100%',

    [DESKTOP]: {
      display: 'inline-block',
      width: 'auto',
    },
  },
  wrapper: {
    backgroundColor: GREY_DARK_3,
    width: '100%',

    [DESKTOP]: {
      display: 'inline-block',
      width: 'auto',
    },
  },
};

interface IOwnProps {
  classes: { [key: string]: string };
  className?: string;
  divisions: Array<{
    id: string;
    label: string;
    to: string;
  }>;
  handleNavigation: () => void;
}

const UnstyledMenuDropdown = ({ classes, className, divisions, handleNavigation }: IOwnProps) => (
  <div className={classnames(classes.wrapper, className)}>
    <ul className={classes.list}>
      {divisions.map(division => (
        <li className={classes.option} key={`header-division-${division.id}`}>
          <NavLink
            className={classes.link}
            activeClassName={classes.linkActive}
            to={division.to}
            exact
            onClick={handleNavigation}
          >
            {division.label}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
);

const MenuDropdown = injectSheet(sheet)(UnstyledMenuDropdown);

export default MenuDropdown;
