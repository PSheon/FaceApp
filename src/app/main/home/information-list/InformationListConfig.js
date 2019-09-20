import React from 'react';

export const InformationListConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/information-list/:informationId',
      component: React.lazy(() => import('./information'))
    },
    {
      path: '/information-list',
      component: React.lazy(() => import('./list'))
    }
  ]
};
