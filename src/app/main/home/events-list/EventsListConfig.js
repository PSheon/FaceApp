import React from 'react';

export const EventsListConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/events-list/:eventId',
      component: React.lazy(() => import('./event'))
    },
    {
      path: '/events-list',
      component: React.lazy(() => import('./list'))
    }
  ]
};
