import React from 'react';
import { authRoles } from 'app/auth';

export const CustomerHelpingPageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth: authRoles.user,
    routes: [
        {
            path: '/customer-helping',
            component: React.lazy(() => import('./CustomerHelpingPage'))
        }
    ]
};
