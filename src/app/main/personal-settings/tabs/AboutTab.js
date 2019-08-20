import React, { useState } from 'react';
import clsx from 'clsx';
import { FuseAnimateGroup } from '@fuse';
import { makeStyles } from '@material-ui/styles';

import WidgetAvatarPond from '../widgets/WidgetAvatarPond';
import WidgetAccountCard from '../widgets/WidgetAccountCard';
import WidgetSocialLink from '../widgets/WidgetSocialLink';
import WidgetAccessHistory from '../widgets/WidgetAccessHistory';

const useStyles = makeStyles(theme => ({
	widgetWrapper: {
		transition: 'width .3s, height .5s',
	},
}));

function AboutTab() {
	const classes = useStyles();
	const [newAvatar, setNewAvatar] = useState(null);

	return (
		<div className="md:flex">
			<div className="flex flex-col flex-1">
				<FuseAnimateGroup
					enter={{
						animation: "transition.slideUpBigIn"
					}}
				>
					<div className="flex flex-col sm:flex-row sm:flex-wrap">
						{/* Avatar */}
						<div className={clsx(classes.widgetWrapper, newAvatar ? "md:w-3/5" : "md:w-1/5", "w-full sm:w-1/3 sm:px-4 mb-16")}>
							<WidgetAvatarPond newAvatar={newAvatar} setNewAvatar={setNewAvatar} />
						</div>

						{/* Account */}
						<div className={clsx(classes.widgetWrapper, "w-full md:w-2/5 sm:w-2/3 sm:px-4 mb-16")}>
							<WidgetAccountCard />
						</div>

						{/* Social Account Link status */}
						<div className={clsx(classes.widgetWrapper, newAvatar && "md:w-full", "w-full md:w-2/5 ml-0 sm:px-4 mb-16")}>
							<WidgetSocialLink />
						</div>
					</div>

					{/* Login Access History */}
					<div className="w-full mb-16">
						<WidgetAccessHistory />
					</div>
				</FuseAnimateGroup>
			</div>
		</div>
	);
}

export default AboutTab;
