import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import Play from './modules/play';

import * as routes from '../constants/appRoutes';

interface IRouteProps {
  id?: string;
  query?: string;
}

interface IRouteConfig {
  exact?: boolean;
  path: string;
  render: (routeProps: RouteComponentProps<IRouteProps>) => React.ReactNode;
}

const HOME: IRouteConfig = {
  exact: true,
  path: routes.HOME,
  render: () => <Play />,
};

const PLAY: IRouteConfig = {
  exact: true,
  path: routes.PLAY,
  render: () => <Play />,
};

export default [HOME, PLAY];
