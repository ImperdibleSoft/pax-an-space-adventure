import * as React from 'react';
import { RouteComponentProps } from 'react-router';

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

export const HOME: IRouteConfig = {
  exact: true,
  path: routes.HOME,
  render: () => <div />,
};

export default [HOME];
