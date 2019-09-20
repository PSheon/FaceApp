import React from 'react';
import { authRoles } from 'app/auth';

export const InformationListConfig = {
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
      path: '/staff/information-list/:informationId',
      component: React.lazy(() => import('./information'))
    },
    {
      path: '/staff/information-list',
      component: React.lazy(() => import('./list'))
    }
  ]
};
