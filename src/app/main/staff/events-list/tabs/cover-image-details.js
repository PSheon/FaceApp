import React, { useState } from 'react';
import Icon from '@material-ui/core/Icon';
import { orange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import VisibilitySensor from "react-visibility-sensor";
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import ImageUploadDialog from 'app/main/shared/ImageUploadDialog';
import { imageNameToPathConverter } from 'app/utils';
import * as Actions from 'app/store/actions';
import eventBusService from 'app/services/eventBusService';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';

const useStyles = makeStyles(theme => ({
  eventsImageFeaturedStar: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0
  },
  eventsImageUpload: {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
  eventsImageItem: {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    '&:hover': {
      '& $eventsImageFeaturedStar': {
        opacity: .8
      }
    },
    '&.featured': {
      pointerEvents: 'none',
      boxShadow: theme.shadows[3],
      '& $eventsImageFeaturedStar': {
        opacity: 1
      },
      '&:hover $eventsImageFeaturedStar': {
        opacity: 1
      }
    }
  }
}));

function CoverImageDetailEdit(props) {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const { setEventImageName, form } = props;
  const IMAGE = useSelector(({ uploads }) => uploads.image);
  const images = IMAGE.docs

  const [isLoadingNextPageImages, setIsLoadingNextPageImages] = useState(false);

  function handleOnPageBottom() {
    if (!IMAGE.hasNextPage) return
    setIsLoadingNextPageImages(true);

    const params = {
      page: IMAGE.nextPage,
      limit: 20,
      sort: 'updatedAt',
      order: -1
    }

    eventBusService.getUploadedImages(params)
      .then(response => {
        dispatch({
          type: Actions.APPEND_NEXT_PAGE_UPLOADED_IMAGES_LIST,
          payload: response
        });

        setIsLoadingNextPageImages(false)
      })
  }

  return (
    <FuseAnimate animation="transition.slideRightIn" delay={300}>
      <div className="flex justify-center sm:justify-start flex-wrap">
        <ImageUploadDialog trigger={
          <label
            htmlFor="button-file"
            className={
              clsx(
                classes.eventsImageUpload,
                "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"
              )}
          >
            <Icon fontSize="large" color="action">cloud_upload</Icon>
          </label>
        } />
        {images.map((image, key) => (
          <div
            onClick={() => setEventImageName(image.imageName)}
            className={
              clsx(
                classes.eventsImageItem,
                "flex items-center justify-center relative h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5",
                (image.imageName === form.coverImageName) && 'featured')
            }
            key={key}
          >
            <Icon className={classes.eventsImageFeaturedStar}>star</Icon>
            <img className="max-w-none w-auto h-full" src={imageNameToPathConverter(image.imageName)} alt="圖片" />
          </div>
        ))}
        <VisibilitySensor>
          {({ isVisible }) => {
            return (
              <div className="flex justify-center items-center w-full min-h-10">
                {isLoadingNextPageImages && <LoadingSpinner width={128} height={128} />}
                {isVisible && !isLoadingNextPageImages && handleOnPageBottom()}
              </div>
            )
          }}
        </VisibilitySensor>
      </div>
    </FuseAnimate>
  )
}

export default CoverImageDetailEdit;
