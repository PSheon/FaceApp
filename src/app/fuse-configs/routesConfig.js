import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseUtils } from '@fuse';
import { AuthConfig } from 'app/main/auth';
import { HomePageConfig } from 'app/main/home';
// import { ContactUsPageConfig } from 'app/main/about/contact-us/ContactUsPageConfig';
import { AboutConfig } from 'app/main/about';
// import { FaqPageConfig } from 'app/main/about/ys-faq/FaqPageConfig';
import { ErrorsConfig } from 'app/main/errors';

/* Admin */
import { AdminConfig } from 'app/main/admin';

/* Staff */
import { StaffConfig } from 'app/main/staff';

/* User */
import { UserConfig } from 'app/main/user';
import { PersonalSettingsPageConfig } from 'app/main/personal-settings/PersonalSettingsPageConfig';

const routeConfigs = [
	...HomePageConfig,
	...AboutConfig,
	...AuthConfig,
	...ErrorsConfig,

	/* Admin */
	...AdminConfig,

	/* Staff */
	...StaffConfig,

	/* User */
	...UserConfig,
	PersonalSettingsPageConfig,
];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
	{
		path: '/',
		exact: true,
		component: () => <Redirect to="/home" />
	},
	{
		component: () => <Redirect to="/error-404" />
	}
];

export default routes;
