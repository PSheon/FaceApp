import React from 'react';
import { authRoles } from 'app/auth';

export const AdminDashboardPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.admin,
	// auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/admin/dashboard',
			component: React.lazy(() => import('./AdminDashboardPage'))
		}
	]
};
