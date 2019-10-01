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

import { imageNameToPathConverter, avatarNameToPathConverter } from 'app/utils';
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

function InformationListPage(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const INFORMATION = useSelector(({ homePage }) => homePage.information);
  const informationList = INFORMATION.docs;
  const [
    isLoadingNextPageInformation,
    setIsLoadingNextPageInformation
  ] = useState(false);

  useEffect(() => {
    dispatch(Actions.syncHomePageInformation());
  }, [dispatch]);

  function handleOnPageBottom() {
    if (!INFORMATION.hasNextPage) return;
    setIsLoadingNextPageInformation(true);

    const params = {
      page: INFORMATION.nextPage,
      limit: 20,
      sort: 'updatedAt',
      order: -1
    };

    eventBusService.getHomePageInformation(params).then(response => {
      dispatch({
        type: Actions.APPEND_NEXT_PAGE_INFORMATION_LIST,
        payload: response
      });

      setIsLoadingNextPageInformation(false);
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
        pageNames={['內容管理', 'YS 情報列表']}
      />
      <div className="flex flex-grow flex-shrink-0 flex-col items-center container px-16 md:px-24">
        <FuseAnimate>
          <Typography
            className="sm:pt-24 text-32 sm:text-40 font-300"
            color="inherit"
          >
            YS 情報列表
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
              to="/staff/information-list/new"
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
                新增 YS 情報
              </Typography>
            </Link>
          </div>
          {informationList.map(item => (
            <Link
              to={`/staff/information-list/${item._id}`}
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
                      item.imageName
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
                      {moment(item.updatedAt).format('LL')} -{' '}
                      {item.published ? '已發佈' : '未發佈'}
                    </Typography>
                  </div>
                  <div
                    className={clsx(
                      classes.boardInfoWrapper,
                      'flex justify-start items-center rounded-b-lg w-full pb-8'
                    )}
                  >
                    <Avatar
                      src={avatarNameToPathConverter(item.author.photoURL)}
                      className="mx-10 my-5"
                      alt={item.author.displayName}
                    />
                    <div className="flex flex-col justify-start overflow-hidden pr-12">
                      <div className="flex justify-start">
                        {/* {item.published && <div className={clsx(classes.boardTag, "inline-block bg-red-300 text-red-darker text-xs px-2 rounded-full uppercase font-semibold tracking-wide whitespace-no-wrap mb-4 mr-8")}>發佈中</div>} */}
                        <div
                          className={clsx(
                            classes.boardTag,
                            'inline-block bg-amber-600 px-2 rounded-full uppercase font-semibold tracking-wide whitespace-no-wrap mb-4 mr-8'
                          )}
                        >
                          {item.tags}
                        </div>
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
                        {item.subTitle}
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
                  {isLoadingNextPageInformation && (
                    <LoadingSpinner width={128} height={128} />
                  )}
                  {isVisible &&
                    !isLoadingNextPageInformation &&
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

export default InformationListPage;
