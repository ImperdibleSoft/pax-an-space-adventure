import * as React from 'react';
import injectSheet from 'react-jss';

import { ISheet } from '../../../models';

const sheet: ISheet = {
  content: {},
  wrapper: { textAlign: 'center' },
};

interface IOwnProps {
  classes: { [key: string]: string };
}

const unstyledPlayView = ({ classes }: IOwnProps) => (
  <div className={classes.wrapper}>
    <canvas />
  </div>
);

const PlayView = injectSheet(sheet)(unstyledPlayView);

export default PlayView;
