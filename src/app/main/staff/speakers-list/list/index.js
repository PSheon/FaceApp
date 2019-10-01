import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VisibilitySensor from 'react-visibility-sensor';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Icon } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { FuseAnimateGroup, FuseAnimate } from '@fuse';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import { imageNameToPathConverter } from 'app/utils';
import * as Actions from 'app/store/actions';
import eventBusService from 'app/services/eventBusService';
import DashboardBreadcrumbs from 'app/main/shared/DashboardBreadcrumbs';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main)
  },
  board: {
    cursor: 'pointer',
    boxShadow: theme.shadows[0],
    transitionProperty: 'box-shadow border-color',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    color: theme.palette.getContrastText(theme.palette.primary.dark),
    '&:hover': {
      boxShadow: theme.shadows[6]
    }
  },
  boardInfoWrapper: {
    background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.9))'
  },
  boardTag: {
    width: 'fit-content'
  },
  newBoard: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: fade(
      theme.palette.getContrastText(theme.palette.primary.main),
      0.6
    ),
    '&:hover': {
      borderColor: fade(
        theme.palette.getContrastText(theme.palette.primary.main),
        0.8
      )
    }
  }
}));

function SpeakersListPage(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const SPEAKERS = useSelector(({ homePage }) => homePage.speakers);
  const speakers = SPEAKERS.docs;
  const [isLoadingNextPageSpeakers, setIsLoadingNextPageSpeakers] = useState(
    false
  );

  useEffect(() => {
    dispatch(Actions.syncHomePageSpeakers());
  }, [dispatch]);

  function handleOnPageBottom() {
    if (!SPEAKERS.hasNextPage) return;
    setIsLoadingNextPageSpeakers(true);

    const params = {
      page: SPEAKERS.nextPage,
      limit: 20,
      sort: 'updatedAt',
      order: -1
    };

    eventBusService.getHomePageSpeakers(params).then(response => {
      dispatch({
        type: Actions.APPEND_NEXT_PAGE_SPEAKERS_LIST,
        payload: response
      });

      setIsLoadingNextPageSpeakers(false);
    });
  }

  return (
    <div
      className={clsx(
        classes.root,
        'flex flex-grow flex-shrink-0 flex-col items-center'
      )}
    >
      <DashboardBreadcrumbs
        className="self-start pl-12"
        pageNames={['內容管理', 'YS 講師列表']}
      />
      <div className="flex flex-grow flex-shrink-0 flex-col items-center container px-16 md:px-24">
        <FuseAnimate>
          <Typography
            className="sm:pt-24 text-32 sm:text-40 font-300"
            color="inherit"
          >
            YS 講師列表
          </Typography>
        </FuseAnimate>
        <FuseAnimate>
          <Typography
            className="mt-12 sm:mt-16 sm:py-12 text-20 sm:text-24 font-600 text-center"
            color="inherit"
          >
            掌握職場
            <span className="text-blue">大小事</span>
          </Typography>
        </FuseAnimate>

        <FuseAnimateGroup
          className="flex flex-wrap w-full justify-center py-32 px-16"
          enter={{
            animation: 'transition.slideUpBigIn',
            duration: 300
          }}
        >
          <div className="w-320 h-320 p-16">
            <Link
              to="/staff/speakers-list/new"
              className={clsx(
                classes.board,
                classes.newBoard,
                'flex flex-col items-center justify-center w-full h-full rounded py-24 rounded-lg'
              )}
              role="button"
            >
              <Icon className="text-56">add_circle</Icon>
              <Typography
                className="text-16 font-300 text-center pt-16 px-32"
                color="inherit"
              >
                新增 YS 講師
              </Typography>
            </Link>
          </div>
          {speakers.map(item => (
            <Link
              to={`/staff/speakers-list/${item._id}`}
              role="button"
              key={item._id}
            >
              <div className="w-320 h-320 p-16">
                <div
                  className={clsx(
                    classes.board,
                    'flex flex-col items-center justify-end w-full h-full rounded pt-24 rounded-lg shadow-md hover:shadow-lg'
                  )}
                  style={{
                    backgroundImage: `url(${imageNameToPathConverter(
                      item.photoURL
                    )})`
                  }}
                >
                  <div
                    className={clsx(
                      classes.boardInfoWrapper,
                      'flex flex-col justify-start items-center rounded-b-lg w-full pb-8 px-12'
                    )}
                  >
                    <Typography className="text-24 font-700">
                      {item.displayName}
                    </Typography>
                    <Typography className="text-16 font-500 text-gray-300 text-center">
                      {item.title}
                    </Typography>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <VisibilitySensor>
            {({ isVisible }) => {
              return (
                <div className="flex justify-center items-center w-full min-h-10">
                  {isLoadingNextPageSpeakers && (
                    <LoadingSpinner width={128} height={128} />
                  )}
                  {isVisible &&
                    !isLoadingNextPageSpeakers &&
                    handleOnPageBottom()}
                </div>
              );
            }}
          </VisibilitySensor>
        </FuseAnimateGroup>
      </div>
    </div>
  );
}

export default SpeakersListPage;
