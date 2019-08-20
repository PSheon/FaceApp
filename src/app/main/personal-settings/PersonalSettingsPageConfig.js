import React from 'react';
import { authRoles } from 'app/auth';

export const PersonalSettingsPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.user,
	routes: [
		{
			path: '/personal-settings',
			component: React.lazy(() => import('./PersonalSettingsPage'))
		}
	]
};
