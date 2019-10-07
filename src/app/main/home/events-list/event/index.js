import React, { useEffect, useState } from 'react';
import { Icon, Typography, Avatar } from '@material-ui/core';
import history from '@history';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate, FusePageCarded } from '@fuse';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import {
  FacebookShareButton,
  FacebookIcon,
  LineShareButton,
  LineIcon
} from 'react-share';
// import { Helmet } from 'react-helmet';

import { WEB_FRONT_END_POINT } from 'app/fuse-configs/envsConfig';
import { avatarNameToPathConverter, imageNameToPathConverter } from 'app/utils';
import * as Actions from 'app/store/actions';
import YSMap from 'app/main/shared/YSMap';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';
import ButtomSection from './ButtomSection';

import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins.pkgd.min';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/languages/zh_tw.js';

const useStyles = makeStyles(theme => ({
  board: {
    cursor: 'pointer',
    boxShadow: theme.shadows[0],
    transitionProperty: 'box-shadow border-color left top',
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
  }
}));
function Event(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedEventId = props.match.params.eventId;
  const EVENTS = useSelector(({ homePage }) => homePage.events);
  const isSyncingEvent = EVENTS.loading;

  const [eventDetail, setEventDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (EVENTS.docs.length) {
      const event = EVENTS.docs.find(item => item._id === selectedEventId);
      if (!event) {
        history.push({
          pathname: '/events-list'
        });
      } else {
        setEventDetail(event);
        setIsLoading(false);
      }
    } else {
      /* Events list not Initialized */
      if (!isSyncingEvent) {
        dispatch(Actions.syncHomePageEventById(selectedEventId));
      }
    }
  }, [EVENTS, EVENTS.docs, dispatch, isSyncingEvent, selectedEventId]);

  return (
    <FusePageCarded
      classes={{
        toolbar: 'p-0',
        header: 'min-h-128 h-128 sm:h-140 sm:min-h-140'
      }}
      header={
        !isLoading && (
          <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full">
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Typography
                  className="normal-case flex items-center sm:mb-12"
                  component={Link}
                  role="button"
                  to="/events-list"
                  color="inherit"
                >
                  <Icon className="mr-4 text-20">arrow_back</Icon>
                  返回 YS 活動列表
                </Typography>
              </FuseAnimate>

              <div className="flex items-center max-w-full">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                  <Avatar
                    src={avatarNameToPathConverter(eventDetail.author.photoURL)}
                    className="mx-10 my-5"
                    alt={eventDetail.author.displayName}
                  />
                </FuseAnimate>
                <div className="flex flex-col min-w-0">
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography
                      variant="h1"
                      className="text-20 sm:text-32 truncate"
                    >
                      {eventDetail.author.displayName}
                    </Typography>
                  </FuseAnimate>
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography variant="caption">
                      {moment(eventDetail.updatedAt).format('LL dddd')}
                    </Typography>
                  </FuseAnimate>
                </div>
              </div>
            </div>

            <FuseAnimate animation="transition.slideRightIn" delay={300}>
              <div className="flex justify-center items-center">
                <div className="p-4">
                  <FacebookShareButton
                    // url={`${WEB_FRONT_END_POINT}/events-list/${eventDetail._id}`}
                    url={`https://stage.ys.nat.gov.tw/events-list/${eventDetail._id}`}
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                </div>
                <div className="p-4">
                  <LineShareButton
                    url={`${WEB_FRONT_END_POINT}/events-list/${eventDetail._id}`}
                  >
                    <LineIcon size={32} round />
                  </LineShareButton>
                </div>
              </div>
            </FuseAnimate>
          </div>
        )
      }
      content={
        isLoading ? (
          <div className="flex w-full h-full justify-center items-center">
            <LoadingSpinner width={128} height={128} />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            {/* <Helmet>
              <meta itemprop="name" content={eventDetail.title} />
              <meta
                itemprop="image"
                content={imageNameToPathConverter(eventDetail.coverImageName)}
              />
              <meta itemprop="description" content={eventDetail.subTitle} />
              <title>{`${eventDetail.title} || Youth Salon`}</title>
              <link
                rel="canonical"
                href={`${WEB_FRONT_END_POINT}/events-list/${eventDetail._id}`}
              />
            </Helmet> */}
            <div className="bg-transparent overflow-hidden rounded-t-8">
              <img
                alt={eventDetail.coverImageName}
                src={imageNameToPathConverter(eventDetail.coverImageName)}
                className="object-cover object-center w-full rounded-t-8 max-h-460"
              />
            </div>
            <div className="flex flex-col max-w-2xl py-16 px-32 justify-center items-start">
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Typography
                  variant="h1"
                  className="text-24 md:text-32 sm:text-40 whitespace-pre-line py-32"
                >
                  {eventDetail.title}
                </Typography>
              </FuseAnimate>
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Typography
                  variant="h2"
                  className="text-24 sm:text-32 text-gray-600 whitespace-pre-line pb-20"
                >
                  {eventDetail.subTitle}
                </Typography>
              </FuseAnimate>

              {/* Tags */}
              <div className="flex justify-center items-center pb-32">
                <div className="bg-yellow text-20 text-gray-700 px-2 rounded-full uppercase font-semibold tracking-wide px-12 mr-12">
                  {eventDetail.tags}
                </div>
              </div>

              <div className="w-full flex flex-col md:flex-row justify-around items-center">
                {/* Speaker */}
                <div className="w-full sm:w-400 h-200 sm:h-320 pt-10 sm:px-4 sm:py-0">
                  <div
                    className={clsx(
                      classes.board,
                      'flex flex-col items-center justify-end w-full h-full rounded pt-24 rounded-lg shadow-md hover:shadow-lg'
                    )}
                    style={{
                      backgroundImage: `url(${imageNameToPathConverter(
                        eventDetail.speaker.photoURL
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
                        {eventDetail.speaker.displayName}
                      </Typography>
                      <Typography className="text-16 font-500 text-gray-300 text-center">
                        {eventDetail.speaker.title}
                      </Typography>
                    </div>
                  </div>
                </div>
                {/* Location */}
                <div className="w-full sm:w-400 h-200 sm:h-320 pt-10 sm:px-4 sm:py-0">
                  <div
                    className={clsx(
                      classes.board,
                      'flex flex-col items-center justify-end w-full h-full rounded rounded-lg shadow-md hover:shadow-lg bg-white'
                    )}
                  >
                    <YSMap width="100%" />
                  </div>
                </div>
              </div>

              {/* Info */}
              <table className="simple clickable pt-12">
                <tbody>
                  <tr>
                    <td>活動時間</td>
                    <td className="text-center">
                      <Typography className="flex items-center font-semibold">
                        {moment(eventDetail.startDateTime).format(
                          'MM/DD (dddd) HH:mm a'
                        )}
                        -
                        {moment(eventDetail.endDateTime).format(
                          'MM/DD (dddd) HH:mm a'
                        )}
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>報名人數上限</td>
                    <td className="text-center">
                      <Typography className="flex items-center font-semibold">
                        {eventDetail.maximumOfApplicants}
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>報名期限</td>
                    <td className="text-center">
                      <Typography className="flex items-center font-semibold">
                        {moment(eventDetail.enrollDeadline).format('LLLL a')}
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>地點</td>
                    <td className="text-center">
                      <Typography className="flex items-center font-semibold">
                        {eventDetail.location}
                      </Typography>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Content */}
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <div className="my-24">
                  <FroalaEditorView model={eventDetail.content} />
                </div>
              </FuseAnimate>

              {/* Button Section for prequestion and review */}
              <ButtomSection
                selectedEventId={selectedEventId}
                eventDetail={eventDetail}
              />
            </div>
          </div>
        )
      }
    />
  );
}

export default Event;
