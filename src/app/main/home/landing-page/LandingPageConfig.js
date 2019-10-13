import React from 'react';

export const LandingPageConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/train',
      component: React.lazy(() => import('./TrainPage'))
    },
    {
      path: '/',
      component: React.lazy(() => import('./LandingPage'))
    }
  ]
};
