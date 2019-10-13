import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseUtils } from '@fuse';
import { AuthConfig } from 'app/main/auth';
import { HomePageConfig } from 'app/main/home';

const routeConfigs = [...HomePageConfig, ...AuthConfig];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/" />
  },
  {
    component: () => <Redirect to="/error-404" />
  }
];

export default routes;
