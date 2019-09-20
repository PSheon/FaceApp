import React from 'react';

export const ContactUsPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/ys-contact-us',
			component: React.lazy(() => import('./ContactUsPage'))
		}
	]
};
