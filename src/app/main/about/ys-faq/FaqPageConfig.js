import React from 'react';

export const FaqPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/ys-faq',
			component: React.lazy(() => import('./FaqPage'))
		}
	]
};
