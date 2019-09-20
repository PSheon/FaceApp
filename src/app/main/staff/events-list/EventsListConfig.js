import React from 'react';
import { authRoles } from 'app/auth';

export const EventsListConfig = {
  settings: {
    layout: {
      config: {
        mode: 'fullWidth',
        footer: false,
      }
    }
  },
  auth: authRoles.staff,
  routes: [
    {
      path: '/staff/events-list/:eventId',
      component: React.lazy(() => import('./event'))
    },
    {
      path: '/staff/events-list',
      component: React.lazy(() => import('./list'))
    }
  ]
};
