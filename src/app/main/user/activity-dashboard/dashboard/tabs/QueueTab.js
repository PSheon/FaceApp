import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Link } from 'react-router-dom';
import { Typography, Paper, Avatar } from '@material-ui/core';
import clsx from 'clsx';
import { FuseAnimateGroup } from '@fuse';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';

import * as Actions from 'app/store/actions';
import { imageNameToPathConverter, informationTagConverter } from 'app/utils';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';

const useStyles = makeStyles(theme => ({
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
      boxShadow: theme.shadows[6],
      transform: 'translate(-3px, -3px)',

      '& $boardInfoWrapper': {
        paddingTop: '2rem',
        paddingBottom: '2.5rem'
      },
      '& $boardContent': {
        transform: 'translateY(0)'
      }
    }
  },
  boardInfoWrapper: {
    transition: 'padding .3s',
    background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.9))'
  },
  boardTag: {
    width: 'fit-content'
  },
  boardContent: {
    transition: 'transform .3s',
    transform: 'translateY(3rem)'
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
function QueueTab() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const SELF_ACTIVITY_LOGS = useSelector(({ activity }) => activity.selfLogs);
  const selfLogs = SELF_ACTIVITY_LOGS.docs;
  const isSyncingActivityLogs = SELF_ACTIVITY_LOGS.loading;

  useEffect(() => {
    if (!selfLogs.length && !isSyncingActivityLogs) {
      dispatch(Actions.syncSelfActivityLogs());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log('selfLogs ', selfLogs)

  if (!selfLogs.length) {
    if (isSyncingActivityLogs) {
      return (
        <div className="flex justify-center items-center w-full h-full">
          <LoadingSpinner width="128" height="128" />
        </div>
      );
    } else {
      return (
        <Link role="button" to="/events-list">
          <div className="flex flex-col justify-center items-center w-full h-full">
            <Typography variant="h3" className="text-gray-800">
              還沒有參加任何活動
            </Typography>
            <Typography variant="h3" className="text-gray-800">
              快來看看 YS 的新活動吧
            </Typography>
          </div>
        </Link>
      );
    }
  }

  return (
    <FuseAnimateGroup
      className="flex flex-wrap"
      enter={{
        animation: 'transition.slideUpBigIn'
      }}
    >
      <div className="widget flex w-1/2 md:w-1/4 p-12">
        <Paper className="w-full rounded-8 shadow-lg border-none text-center pt-12 pb-28">
          <Typography className="text-72 leading-none text-red">
            {200}
          </Typography>
          <Typography className="text-16" color="textSecondary">
            已參加次數
          </Typography>
        </Paper>
      </div>
      <div className="widget flex w-1/2 md:w-1/4 p-12">
        <Paper className="w-full rounded-8 shadow-lg border-none text-center pt-12 pb-28">
          <Typography className="text-72 leading-none text-green">
            {200}
          </Typography>
          <Typography className="text-16" color="textSecondary">
            報名人數
          </Typography>
        </Paper>
      </div>
      <div className="widget flex w-1/2 md:w-1/4 p-12">
        <Paper className="w-full rounded-8 shadow-lg border-none text-center pt-12 pb-28">
          <Typography className="text-72 leading-none text-blue">
            {200}
          </Typography>
          <Typography className="text-16" color="textSecondary">
            報名人數
          </Typography>
        </Paper>
      </div>
      <div className="widget flex w-1/2 md:w-1/4 p-12">
        <Paper className="w-full rounded-8 shadow-lg border-none text-center pt-12 pb-28">
          <Typography className="text-72 leading-none text-orange">
            {200}
          </Typography>
          <Typography className="text-16" color="textSecondary">
            報名人數
          </Typography>
        </Paper>
      </div>

      {/* Event has applied */}
      {console.log('selfLogs, ', selfLogs)}
      {selfLogs.map(({ event, speaker }) => (
        <Link
          to={`/events-list/${event._id}`}
          role="button"
          key={event._id}
          className="w-full sm:w-1/2 h-320 p-6"
        >
          <div
            className={clsx(
              classes.board,
              'flex flex-col items-center justify-end w-full h-full rounded pt-24 rounded-lg shadow-md hover:shadow-lg relative'
            )}
            style={{
              backgroundImage: `url(${imageNameToPathConverter(
                event.coverImageName
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
                {moment(event.startDateTime).format('MM/DD hh:mm')} -{' '}
                {moment(event.endDateTime).format('MM/DD hh:mm')}
              </Typography>
            </div>
            {/* Author Info */}
            <div
              className={clsx(
                classes.boardInfoWrapper,
                'flex justify-start items-center rounded-b-lg w-full pb-8'
              )}
            >
              <Avatar
                src={imageNameToPathConverter(speaker.photoURL)}
                className="mx-10 my-5"
                alt={speaker.displayName}
              />
              <div className="flex flex-col justify-start overflow-hidden pr-12">
                <div className="flex justify-start">
                  <div
                    className={clsx(
                      classes.boardTag,
                      'inline-block bg-amber-600 px-2 rounded-full mb-4 mr-8'
                    )}
                  >
                    <Typography className="uppercase font-semibold tracking-wide whitespace-no-wrap">
                      {informationTagConverter(event.tags)}
                    </Typography>
                  </div>
                </div>
                <Typography
                  className="text-16 md:text-24 font-700 whitespace-no-wrap overflow-hidden truncate"
                  color="inherit"
                >
                  {event.title}
                </Typography>
                <Typography
                  className={clsx(
                    classes.boardContent,
                    'text-16 font-700 whitespace-no-wrap overflow-hidden truncate'
                  )}
                  color="inherit"
                >
                  {event.subTitle}
                </Typography>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </FuseAnimateGroup>
  );
}

export default QueueTab;
