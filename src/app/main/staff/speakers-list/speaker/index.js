import React, { useEffect, useState } from 'react';
import { Button, Tab, Tabs, TextField, Icon, Typography } from '@material-ui/core';
import history from '@history';
import { orange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';
import { FuseAnimate, FusePageCarded } from '@fuse';
import { useForm } from '@fuse/hooks';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import VisibilitySensor from "react-visibility-sensor";
import clsx from 'clsx';
import _ from '@lodash';
import { useDispatch, useSelector } from 'react-redux';

import ImageUploadDialog from 'app/main/shared/ImageUploadDialog';
import { imageNameToPathConverter } from 'app/utils';
import * as Actions from 'app/store/actions';
import eventBusService from 'app/services/eventBusService';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#3e3e3e',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#fefefe',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#5e5e5e',
      },
      '&:hover fieldset': {
        borderColor: '#3e3e3e',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#3e3e3e',
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '2.4rem',
    }
  },
})(TextField);
const useStyles = makeStyles(theme => ({
  speakerImageFeaturedStar: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0
  },
  speakerImageUpload: {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
  speakerImageItem: {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    '&:hover': {
      '& $speakerImageFeaturedStar': {
        opacity: .8
      }
    },
    '&.featured': {
      pointerEvents: 'none',
      boxShadow: theme.shadows[3],
      '& $speakerImageFeaturedStar': {
        opacity: 1
      },
      '&:hover $speakerImageFeaturedStar': {
        opacity: 1
      }
    }
  }
}));

function Speaker(props) {
  const dispatch = useDispatch();
  const selectedSpeakerId = props.match.params.speakerId;
  const SPEAKERS = useSelector(({ homePage }) => homePage.speakers);
  const IMAGE = useSelector(({ uploads }) => uploads.image);
  const images = IMAGE.docs

  const classes = useStyles(props);
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingNextPageImages, setIsLoadingNextPageImages] = useState(false);
  const { form, handleChange, setForm } = useForm(null);

  useEffect(() => {
    dispatch(Actions.syncUploadedImages());
  }, [dispatch]);

  useEffect(() => {
    if (!form) {
      if (selectedSpeakerId === 'new') {
        setForm({
          _id: 'new',
          displayName: '',
          title: '',
          photoURL: '',
          website: '',
        })
        setIsLoading(false);
      } else {
        if (SPEAKERS.docs.length) {
          const speaker = SPEAKERS.docs.filter(item => item._id === selectedSpeakerId)[0]
          if (!speaker) {
            history.push({
              pathname: '/staff/speakers-list'
            })
          } else {
            setForm(speaker);
            setIsLoading(false);
          }
        } else {
          // history.push({
          //   pathname: '/staff/speaker-list'
          // })
          dispatch(Actions.syncHomePageSpeakerById(selectedSpeakerId));
        }
      }
    }
  }, [SPEAKERS.docs, dispatch, form, selectedSpeakerId, setForm]);

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

  function setSpeakerPhotoURL(imageName) {
    setForm(form => _.setIn({ ...form }, 'photoURL', imageName));
  }

  function handleChangeTab(event, tabValue) {
    setTabValue(tabValue);
  }

  function handleDeleteSpeaker() {
    setIsLoadingDelete(true);
    dispatch(Actions.deleteSpeaker(selectedSpeakerId))
  }
  function handleSaveSpeaker() {
    setIsLoading(true);
    dispatch(Actions.saveSpeaker(form))
  }

  function canBeSubmitted() {
    return (
      form.displayName &&
      form.title &&
      form.photoURL
    );
  }

  return (
    <FusePageCarded
      classes={{
        toolbar: "p-0",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
      }}
      header={
        form && (
          <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full">
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/staff/speakers-list" color="inherit">
                  <Icon className="mr-4 text-20">arrow_back</Icon>
                  返回 YS 講師列表
                </Typography>
              </FuseAnimate>

              <div className="flex items-center max-w-full">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                  {form.photoURL ? (
                    <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src={imageNameToPathConverter(form.photoURL)} alt={form.displayName} />
                  ) : (
                      <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt='預設圖片' />
                    )}
                </FuseAnimate>
                <div className="flex flex-col min-w-0">
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="text-16 sm:text-20 truncate">
                      {form.title ? form.title : '新增 YS 講師'}
                    </Typography>
                  </FuseAnimate>
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography variant="caption">講師內容</Typography>
                  </FuseAnimate>
                </div>
              </div>
            </div>
            {
              selectedSpeakerId === 'new' ? (
                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                  <Button
                    className="whitespace-no-wrap mx-12 rounded-full"
                    variant="contained"
                    color="secondary"
                    disabled={!canBeSubmitted()}
                    onClick={handleSaveSpeaker}
                  >
                    {isLoading ? <span className="flex justify-center">新增講師中 <LoadingSpinner width="2em" height="2em" /></span> : '新增講師'}
                  </Button>
                </FuseAnimate>
              ) : (
                  <div>
                    <FuseAnimate animation="transition.slideRightIn" delay={300}>
                      <Button
                        className="whitespace-no-wrap px-12 rounded-full bg-red text-white hover:bg-red-300"
                        variant="contained"
                        onClick={handleDeleteSpeaker}
                        disabled={SPEAKERS.docs.length < 2}
                      >
                        {isLoadingDelete ? <span className="flex justify-center">刪除講師中 <LoadingSpinner width="2em" height="2em" /></span> : '刪除講師'}
                      </Button>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideRightIn" delay={300}>
                      <Button
                        className="whitespace-no-wrap mx-12 rounded-full"
                        variant="contained"
                        color="secondary"
                        disabled={!canBeSubmitted()}
                        onClick={handleSaveSpeaker}
                      >
                        {isLoading ? <span className="flex justify-center">更新情報中 <LoadingSpinner width="2em" height="2em" /></span> : '更新情報'}
                      </Button>
                    </FuseAnimate>
                  </div>
                )
            }
          </div>
        )
      }
      contentToolbar={
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          classes={{ root: "w-full h-64" }}
        >
          <Tab className="h-64 normal-case" label="講師背景" />
          <Tab className="h-64 normal-case" label="講師圖片" />
        </Tabs>
      }
      content={
        form && (
          <div className="p-16 sm:p-24 max-w-2xl max-h-screen">
            {tabValue === 0 && (
              <div>
                <CssTextField
                  className="mt-8 mb-16"
                  error={form.displayName === ''}
                  required
                  label="講師名稱"
                  autoFocus
                  id="displayName"
                  name="displayName"
                  value={form.displayName}
                  onChange={handleChange}
                  type="text"
                  variant="outlined"
                  fullWidth
                />

                <CssTextField
                  className="mt-8 mb-16"
                  error={form.title === ''}
                  required
                  label="講師稱謂"
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  type="text"
                  variant="outlined"
                  fullWidth
                />

                <CssTextField
                  className="mt-8 mb-16"
                  error={form.website === ''}
                  label="個人網址"
                  id="website"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  type="text"
                  variant="outlined"
                  fullWidth
                />
              </div>
            )}
            {tabValue === 1 && (
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <div className="flex justify-center sm:justify-start flex-wrap">
                  <ImageUploadDialog trigger={
                    <label
                      htmlFor="button-file"
                      className={
                        clsx(
                          classes.speakerImageUpload,
                          "flex items-center justify-center relative w-128 h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5"
                        )}
                    >
                      <Icon fontSize="large" color="action">cloud_upload</Icon>
                    </label>
                  } />
                  {images.map((image, key) => (
                    <div
                      onClick={() => setSpeakerPhotoURL(image.imageName)}
                      className={
                        clsx(
                          classes.speakerImageItem,
                          "flex items-center justify-center relative h-128 rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5",
                          (image.imageName === form.photoURL) && 'featured')
                      }
                      key={key}
                    >
                      <Icon className={classes.speakerImageFeaturedStar}>star</Icon>
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
            )}
          </div>
        )
      }
    />
  )
}

export default Speaker;
