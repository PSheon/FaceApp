import React from 'react';
import { authRoles } from 'app/auth';

export const ImagesListGalleryConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.staff,
	routes: [
		{
			path: '/staff/images-list-gallery',
			component: React.lazy(() => import('./ImagesListPage'))
		},
	]
};
