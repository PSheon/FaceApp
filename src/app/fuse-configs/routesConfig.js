import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseUtils } from '@fuse';
import { AuthConfig } from 'app/main/auth';
import { HomePageConfig } from 'app/main/home';
import { FaqPageConfig } from 'app/main/faq/FaqPageConfig';
import { ErrorsConfig } from 'app/main/errors';

/* Admin */
import { AdminConfig } from 'app/main/admin';

/* Leader */
// import { LeaderConfig } from 'app/main/leader';

/* Staff */
import { StaffConfig } from 'app/main/staff';

/* User */
import { CustomerServiceConfig } from 'app/main/customer-service';
import { PersonalSettingsPageConfig } from 'app/main/personal-settings/PersonalSettingsPageConfig';

const routeConfigs = [
	...HomePageConfig,
	FaqPageConfig,
	...AuthConfig,
	...ErrorsConfig,

	/* Admin */
	...AdminConfig,

	/* Leader */
	// ...LeaderConfig,

	/* Staff */
	...StaffConfig,

	/* User */
	...CustomerServiceConfig,
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
