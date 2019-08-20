import React from 'react';
import clsx from 'clsx';
import { FuseAnimateGroup } from '@fuse';
import { makeStyles } from '@material-ui/styles';

import WidgetAccountCard from '../widgets/WidgetAccountCard';
import WidgetSocialLink from '../widgets/WidgetSocialLink';
import WidgetAccessHistory from '../widgets/WidgetAccessHistory';

const useStyles = makeStyles(theme => ({
  widgetWrapper: {
    transition: 'width .3s, height .5s',
  },
}));

function ReferralTab() {
  const classes = useStyles();

  return (
    <div className="md:flex">
      <div className="flex flex-col flex-1">
        <FuseAnimateGroup
          enter={{
            animation: "transition.slideUpBigIn"
          }}
        >
          <div className="flex flex-col sm:flex-row sm:flex-wrap">
            {/* Account */}
            <div className={clsx(classes.widgetWrapper, "w-full sm:w-1/2 sm:px-4 mb-16")}>
              <WidgetAccountCard />
            </div>

            {/* TEST */}
            <span className="text-green">0</span>

            {/* Social Account Link status */}
            <div className={clsx(classes.widgetWrapper, "w-full sm:w-1/2 ml-0 sm:px-4 mb-16")}>
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

export default ReferralTab;
