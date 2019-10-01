import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VisibilitySensor from 'react-visibility-sensor';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Icon, Avatar } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { FuseAnimateGroup, FuseAnimate } from '@fuse';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';

import { imageNameToPathConverter } from 'app/utils';
import * as Actions from 'app/store/actions';
import eventBusService from 'app/services/eventBusService';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';
import DashboardBreadcrumbs from 'app/main/shared/DashboardBreadcrumbs';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main)
  },
  dateLabel: {
    top: '2.5rem',
    left: '-1rem'
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
  unPublishedEffect: {
    filter: 'brightness(0.35)'
  },
  boardInfoWrapper: {
    transition: 'padding .3s',
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

function EventsListPage(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const EVENTS = useSelector(({ homePage }) => homePage.events);
  const events = EVENTS.docs;
  const [isLoadingNextPageEvents, setIsLoadingNextPageEvents] = useState(false);

  useEffect(() => {
    dispatch(Actions.syncHomePageEvents());
  }, [dispatch]);

  function handleOnPageBottom() {
    if (!EVENTS.hasNextPage) return;
    setIsLoadingNextPageEvents(true);

    const params = {
      page: EVENTS.nextPage,
      limit: 20,
      sort: 'updatedAt',
      order: -1
    };

    eventBusService.getHomePageEvents(params).then(response => {
      dispatch({
        type: Actions.APPEND_NEXT_PAGE_EVENTS_LIST,
        payload: response
      });

      setIsLoadingNextPageEvents(false);
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
        pageNames={['內容管理', 'YS 活動列表']}
      />
      <div className="flex flex-grow flex-shrink-0 flex-col items-center container px-16 md:px-24">
        <FuseAnimate>
          <Typography
            className="sm:pt-24 text-32 sm:text-40 font-300"
            color="inherit"
          >
            YS 活動列表
          </Typography>
        </FuseAnimate>
        <FuseAnimate>
          <Typography
            className="mt-12 sm:mt-16 sm:py-12 text-20 sm:text-24 font-600 text-center"
            color="inherit"
          >
            僅支援
            <br />
            <span className="text-blue">JPG</span> 和{' '}
            <span className="text-blue">PNG</span> 以及{' '}
            <span className="text-blue">上限 5 張</span> 的圖片種類
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
              to="/staff/events-list/new"
              role="button"
              className={clsx(
                classes.board,
                classes.newBoard,
                'flex flex-col items-center justify-center w-full h-full rounded py-24 rounded-lg'
              )}
            >
              <Icon className="text-56">add_circle</Icon>
              <Typography
                className="text-16 font-300 text-center pt-16 px-32"
                color="inherit"
              >
                新增 YS 活動
              </Typography>
            </Link>
          </div>
          {events.map(item => (
            <Link
              to={`/staff/events-list/${item._id}`}
              role="button"
              key={item._id}
            >
              <div className="w-320 h-320 p-16">
                <div
                  className={clsx(
                    classes.board,
                    !item.published && classes.unPublishedEffect,
                    'flex flex-col items-center justify-end w-full h-full rounded pt-24 rounded-lg shadow-md hover:shadow-lg relative'
                  )}
                  style={{
                    backgroundImage: `url(${imageNameToPathConverter(
                      item.coverImageName
                    )})`
                  }}
                >
                  {/* Date Label */}
                  <div
                    className={clsx(
                      classes.dateLabel,
                      'absolute bg-amber-600 text-white text-center px-8 rounded-full h-32'
                    )}
                  >
                    <Typography className="uppercase font-semibold tracking-wide whitespace-no-wrap text-lg leading-relaxed">
                      {moment(item.startDateTime).format('LL')} -{' '}
                      {item.published ? '已發佈' : '未發佈'}
                    </Typography>
                  </div>
                  <div
                    className={clsx(
                      classes.boardInfoWrapper,
                      'flex justify-start items-center rounded-b-lg w-full py-8'
                    )}
                  >
                    <Avatar
                      src={imageNameToPathConverter(item.speaker.photoURL)}
                      className="mx-10 my-5"
                      alt={item.speaker.displayName}
                    />
                    <div className="flex flex-col justify-start overflow-hidden pr-12">
                      <div className="flex justify-start">
                        {item.tags.slice(0, 2).map((tag, tagIndex) => (
                          <div
                            key={tagIndex}
                            className={clsx(
                              classes.boardTag,
                              'inline-block bg-amber-600 px-2 rounded-full uppercase font-semibold tracking-wide whitespace-no-wrap mb-4 mr-8'
                            )}
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                      <Typography
                        className="text-16 font-700 whitespace-no-wrap overflow-hidden truncate"
                        color="inherit"
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        className="text-16 font-300 text-gray-300 pr-32"
                        color="inherit"
                      >
                        {item.speaker.displayName}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <VisibilitySensor>
            {({ isVisible }) => {
              return (
                <div className="flex justify-center items-center w-full min-h-10">
                  {isLoadingNextPageEvents && (
                    <LoadingSpinner width={128} height={128} />
                  )}
                  {isVisible &&
                    !isLoadingNextPageEvents &&
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

export default EventsListPage;
