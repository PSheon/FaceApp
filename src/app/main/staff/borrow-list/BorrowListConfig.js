import React from 'react';
import { authRoles } from 'app/auth';

export const BorrowListConfig = {
	settings: {
		layout: {
			config: {
				mode: 'fullWidth',
				footer: {
					display: false,
				}
			}
		}
	},
	auth: authRoles.staff,
	routes: [
		{
			path: '/staff/borrow-list',
			component: React.lazy(() => import('./BorrowList'))
		}
	]
};
