import React from 'react';
import { authRoles } from 'app/auth';

export const AppointmentListConfig = {
  settings: {
    layout: {
      config: {
        mode: 'fullWidth'
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
      path: '/staff/appointment-list/:appointmentType',
      exact: true,
      component: React.lazy(() => import('./dashboard'))
    }
  ]
};
