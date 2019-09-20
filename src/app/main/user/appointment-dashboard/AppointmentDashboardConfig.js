import React from 'react';
import { authRoles } from 'app/auth';

export const AppointmentDashboardConfig = {
  settings: {
    layout: {
      config: {
        mode: 'fullWidth',
        // footer: false,
      }
    }
  },
  auth: authRoles.user,
  routes: [
    // {
    //   path: '/user/event/:eventId',
    //   component: React.lazy(() => import('./event'))
    // },
    {
      path: '/user/dashboard/:appointmentType',
      exact: true,
      component: React.lazy(() => import('./dashboard'))
    }
  ]
};
