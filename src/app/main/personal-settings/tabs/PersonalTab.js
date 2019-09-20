import React from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { FuseAnimateGroup } from '@fuse';
import { makeStyles } from '@material-ui/styles';

import { userDetailChecker } from 'app/utils';
import WidgetCareerCard from '../widgets/WidgetCareerCard';
import WidgetProfileCard from '../widgets/WidgetProfileCard';
import WidgetWorkEducationCard from '../widgets/WidgetWorkEducationCard';
import WidgetContactCard from '../widgets/WidgetContactCard';
import WidgetEditProfileCard from '../widgets/WidgetEditProfileCard';

const useStyles = makeStyles(theme => ({
  widgetWrapper: {
    transition: 'width .3s, height .5s',
  },
}));

function PersonalTab(props) {
  const classes = useStyles();
  const USER_PROFILE = useSelector(({ auth }) => auth.user);
  const UserData = USER_PROFILE.data;
  const { isEditMode, setIsEditMode } = props;

  function handledToggleMode() {
    setIsEditMode(!isEditMode);
  }

  return (
    <div className="md:flex">
      <div className="flex flex-col flex-1">
        {
          isEditMode ? (
            <FuseAnimateGroup
              enter={{
                animation: "transition.slideUpBigIn"
              }}
            >
              <div className="flex flex-col sm:flex-row sm:flex-wrap">
                <WidgetEditProfileCard handledToggleMode={handledToggleMode} />
              </div>
            </FuseAnimateGroup>
          ) : (
              <FuseAnimateGroup
                enter={{
                  animation: "transition.slideUpBigIn"
                }}
              >
                {!userDetailChecker(UserData) && (
                  <div className="bg-transparent text-center pb-16 lg:px-4" onClick={handledToggleMode}>
                    <div className="px-12 py-4 bg-orange items-center text-white leading-none rounded-full inline-flex w-lg cursor-pointer" role="alert">
                      <span className="flex rounded-full bg-orange-darker uppercase px-8 py-1 text-xs font-bold mr-3">GO</span>
                      <span className="font-semibold mr-2 text-left flex-auto">完成本頁個人資訊，獲得更準確的活動推薦</span>
                      <svg className="fill-current opacity-75 h-24 w-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" /></svg>
                    </div>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row sm:flex-wrap">
                  {/* Profile */}
                  <div className={clsx(classes.widgetWrapper, "w-full md:w-2/5 sm:w-1/2 sm:px-4 mb-16")}>
                    <WidgetProfileCard UserData={UserData} />
                  </div>
                  {/* Work & Education */}
                  <div className={clsx(classes.widgetWrapper, "w-full md:w-3/5 sm:w-1/2 sm:px-4 mb-16")}>
                    <WidgetWorkEducationCard UserData={UserData} />
                  </div>
                  {/* Contact */}
                  <div className={clsx(classes.widgetWrapper, "w-full md:w-3/5 sm:w-2/3 sm:px-4 mb-16")}>
                    <WidgetContactCard UserData={UserData} />
                  </div>
                  {/* Career */}
                  <div className={clsx(classes.widgetWrapper, "w-full md:w-2/5 sm:w-1/3 sm:px-4 mb-16")}>
                    <WidgetCareerCard UserData={UserData} />
                  </div>
                </div>
              </FuseAnimateGroup>
            )
        }
      </div>
    </div>
  )
}

export default PersonalTab;
