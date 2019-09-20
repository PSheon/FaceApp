import React from 'react';
import { authRoles } from 'app/auth';

export const DocumentsListConfig = {
	settings: {
		layout: {
			config: {
				mode: 'fullWidth',
				footer: {
					display: false
				}
			}
		}
	},
	auth: authRoles.staff,
	routes: [
		{
			path: '/staff/documents-list',
			component: React.lazy(() => import('./DocumentsList'))
		}
	]
};
