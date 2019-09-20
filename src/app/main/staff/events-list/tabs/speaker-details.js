import React, { useState } from 'react';
import Icon from '@material-ui/core/Icon';
import { orange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import VisibilitySensor from "react-visibility-sensor";
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import { imageNameToPathConverter } from 'app/utils';
import * as Actions from 'app/store/actions';
import eventBusService from 'app/services/eventBusService';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';

const useStyles = makeStyles(theme => ({
  eventsSpeakerFeaturedStar: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0
  },
  eventsSpeakerUpload: {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
  eventsSpeakerItem: {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    '&:hover': {
      '& $eventsSpeakerFeaturedStar': {
        opacity: .8
      }
    },
    '&.featured': {
      pointerEvents: 'none',
      boxShadow: theme.shadows[3],
      '& $eventsSpeakerFeaturedStar': {
        opacity: 1
      },
      '&:hover $eventsSpeakerFeaturedStar': {
        opacity: 1
      }
    }
  }
}));

function SpeakerDetailEdit(props) {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const { setEventSpeakerId, form } = props;
  const SPEAKERS = useSelector(({ homePage }) => homePage.speakers);
  const speakers = SPEAKERS.docs

  const [isLoadingNextPageSpeakers, setIsLoadingNextPageSpeakers] = useState(false);

  function handleOnPageBottom() {
    if (!SPEAKERS.hasNextPage) return
    setIsLoadingNextPageSpeakers(true);

    const params = {
      page: SPEAKERS.nextPage,
      limit: 20,
      sort: 'updatedAt',
      order: -1
    }

    eventBusService.getHomePageSpeakers(params)
      .then(response => {
        dispatch({
          type: Actions.APPEND_NEXT_PAGE_SPEAKERS_LIST,
          payload: response
        });

        setIsLoadingNextPageSpeakers(false)
      })
  }

  return (
    <FuseAnimate animation="transition.slideRightIn" delay={300}>
      <div className="flex justify-center sm:justify-start flex-wrap">
        {speakers.map((speaker, key) => (
          <div
            onClick={() => setEventSpeakerId(speaker._id)}
            className={
              clsx(
                classes.eventsSpeakerItem,
                "flex items-center justify-center relative h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5",
                (speaker._id === form.speaker || speaker._id === form.speaker._id) && 'featured')
            }
            key={speaker._id}
          >
            <Icon className={classes.eventsSpeakerFeaturedStar}>star</Icon>
            <img className="max-w-none w-auto h-full" src={imageNameToPathConverter(speaker.photoURL)} alt="圖片" />
          </div>
        ))}
        <VisibilitySensor>
          {({ isVisible }) => {
            return (
              <div className="flex justify-center items-center w-full min-h-10">
                {isLoadingNextPageSpeakers && <LoadingSpinner width={128} height={128} />}
                {isVisible && !isLoadingNextPageSpeakers && handleOnPageBottom()}
              </div>
            )
          }}
        </VisibilitySensor>
      </div>
    </FuseAnimate>
  )
}

export default SpeakerDetailEdit;
