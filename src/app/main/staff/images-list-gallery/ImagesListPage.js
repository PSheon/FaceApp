import React, { useEffect, useMemo, useState } from 'react';
import { Icon, Typography, } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import VisibilitySensor from "react-visibility-sensor";
import { FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import Masonry from 'react-masonry-component';
import clsx from 'clsx';

import * as Actions from 'app/store/actions';
import eventBusService from 'app/services/eventBusService';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';
import WidgetImagePond from './widgets/WidgetImagePond';
import WidgetImageCard from './widgets/WidgetImageCard';

const useStyles = makeStyles(theme => ({
  widgetWrapper: {
    transition: 'width .3s, height .5s',
  },
  header: {
    background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
    color: theme.palette.getContrastText(theme.palette.primary.main)
  },
  headerIcon: {
    position: 'absolute',
    top: -64,
    left: 0,
    opacity: .04,
    fontSize: 512,
    width: 512,
    height: 512,
    pointerEvents: 'none'
  }
}));

function ImagesListPage(props) {
  const dispatch = useDispatch();
  const classes = useStyles(props);

  const IMAGE = useSelector(({ uploads }) => uploads.image);
  const images = IMAGE.docs;
  const [newImage, setNewImage] = useState(null);
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

  useEffect(() => {
    dispatch(Actions.syncUploadedImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col flex-auto flex-shrink-0 w-full">
      <div
        className={clsx(classes.header, "relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-288")}>

        <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
          <Typography color="inherit" className="text-24 sm:text-40 font-light">
            已上傳圖片
          </Typography>
        </FuseAnimate>

        <FuseAnimate duration={400} delay={600}>
          <Typography variant="subtitle1" color="inherit" className="mt-8 sm:mt-16 mx-auto max-w-512">
            <span className="opacity-75">
              我們蒐集世界各地所有最即時、最火熱、最正確的資訊 <br /> 確保您可以做出最正確的判斷.
            </span>
          </Typography>
        </FuseAnimate>

        <Icon className={classes.headerIcon}>image</Icon>
      </div>

      <div className="flex flex-col flex-1 max-w-4xl w-full mx-auto px-8 sm:px-16 py-24">
        {useMemo(() => (
          images.length ? (
            <Masonry>
              {/* Image Uploader */}
              <div className={clsx(classes.widgetWrapper, "w-full sm:w-1/3 md:w-1/5 lg:1/7 pb-24 p-12 sm:p-6")}>
                <WidgetImagePond newImage={newImage} setNewImage={setNewImage} />
              </div>
              {images.map((image, i) => (
                <div className="w-full sm:w-1/3 md:w-1/5 lg:w-1/7 pb-24 p-12 sm:p-6" key={i}>
                  <WidgetImageCard image={image} />
                </div>
              ))}
            </Masonry>
          ) : (
              <div className="w-full h-full flex justify-center items-center">
                <LoadingSpinner width={200} height={200} />
              </div>
            )
        ), [classes.widgetWrapper, images, newImage])}
      </div>
      <VisibilitySensor>
        {({ isVisible }) => {
          return (
            <div className="flex justify-center items-center w-full min-h-10">
              {isLoadingNextPageImages && <LoadingSpinner width={200} height={200} />}
              {isVisible && !isLoadingNextPageImages && handleOnPageBottom()}
              {/* {!IMAGE.hasNextPage && (
                <FuseAnimate delay={500}>
                  <Typography variant="h5" color="textSecondary" className="mb-16">
                    ...沒有更多圖片了...
                  </Typography>
                </FuseAnimate>
              )} */}
            </div>
          )
        }}
      </VisibilitySensor>
    </div>
  );
}

export default ImagesListPage;
