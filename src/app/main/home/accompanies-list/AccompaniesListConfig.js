import React from 'react';

export const AccompaniesListConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/accompanies-list',
      component: React.lazy(() => import('./list'))
    }
  ]
};
