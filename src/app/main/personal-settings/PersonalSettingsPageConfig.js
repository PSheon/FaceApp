import React from 'react';
import { authRoles } from 'app/auth';

export const PersonalSettingsPageConfig = {
	settings: {
		layout: {
			config: {
				mode: 'fullWidth',
			}
		}
	},
	auth: authRoles.user,
	routes: [
		{
			path: '/personal-settings/:editMode',
			component: React.lazy(() => import('./PersonalSettingsPage'))
		},
		{
			path: '/personal-settings',
			exact: true,
			component: React.lazy(() => import('./PersonalSettingsPage'))
		}
	]
};
