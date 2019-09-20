import React from 'react';
import { authRoles } from 'app/auth';

export const SpeakersListConfig = {
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
      path: '/staff/speakers-list/:speakerId',
      component: React.lazy(() => import('./speaker'))
    },
    {
      path: '/staff/speakers-list',
      component: React.lazy(() => import('./list'))
    }
  ]
};
