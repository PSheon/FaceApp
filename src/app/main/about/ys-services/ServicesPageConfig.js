import React from 'react';

export const ServicesPageConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/ys-services/appointment/consulting',
      component: React.lazy(() =>
        import('./consulting/AppointmentConsultingPage')
      )
    },
    {
      path: '/ys-services/appointment/guide',
      component: React.lazy(() => import('./AppointmentGuidePage'))
    },
    {
      path: '/ys-services',
      component: React.lazy(() => import('./ServicesPage'))
    }
  ]
};
