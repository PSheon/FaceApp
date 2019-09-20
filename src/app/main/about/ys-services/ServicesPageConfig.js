import React from 'react';

export const ServicesPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/ys-services',
			component: React.lazy(() => import('./ServicesPage'))
		}
	]
};
