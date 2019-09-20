import React from 'react';

export const SpacePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/ys-space/borrow/:space',
			component: React.lazy(() => import('./BorrowPage'))
		},
		{
			path: '/ys-space',
			component: React.lazy(() => import('./SpacePage'))
		}
	]
};
