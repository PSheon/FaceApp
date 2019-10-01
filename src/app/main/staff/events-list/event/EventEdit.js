import React, { useEffect, useState } from 'react';
import { Button, Tab, Tabs, Icon, Typography } from '@material-ui/core';
import history from '@history';
import { FuseAnimate, FuseAnimateGroup, FusePageCarded } from '@fuse';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from '@fuse/hooks';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import _ from '@lodash';
import { useDispatch, useSelector } from 'react-redux';

import { imageNameToPathConverter } from 'app/utils';
import EventDetailEdit from '../tabs/event-details';
import ContentDetailEdit from '../tabs/content-detail';
import QuestionnaireDetailEdit from '../tabs/questionnaire-detail';
import SpeakerDetailEdit from '../tabs/speaker-details';
import CoverImageDetailEdit from '../tabs/cover-image-details';
import * as Actions from 'app/store/actions';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';

const useStyles = makeStyles(theme => ({
  evenlyWrapper: {
    justifyContent: 'space-evenly'
  }
}));

function EventEdit(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const selectedEventId = props.match.params.eventId;
  const EVENTS = useSelector(({ homePage }) => homePage.events);

  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const { form, handleChange, setForm } = useForm(null);

  useEffect(() => {
    dispatch(Actions.syncUploadedImages());
    dispatch(Actions.syncHomePageSpeakers());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!form) {
      if (selectedEventId === 'new') {
        setForm({
          _id: 'new',
          coverImageName: '',
          title: '',
          subTitle: '',
          tags: [],
          startDateTime: '',
          endDateTime: '',
          enrollDeadline: '',
          maximumOfApplicants: 30,
          location: '',
          content: '',
          speaker: '',
          preQuestionList: [],
          published: false
        });
      } else {
        if (EVENTS.docs.length) {
          const event = EVENTS.docs.find(item => item._id === selectedEventId);
          if (!event) {
            history.push({
              pathname: '/staff/events-list'
            });
          } else {
            // setForm(event);
            setForm({
              ...event,
              speaker: event.speaker._id || ''
            });
          }
        } else {
          history.push({
            pathname: '/staff/events-list'
          });
        }
      }
    }
  }, [EVENTS.docs, form, selectedEventId, setForm]);

  function setEventImageName(imageName) {
    setForm(form => _.setIn({ ...form }, 'coverImageName', imageName));
  }
  function setEventSpeakerId(speakerId) {
    setForm(form => _.setIn({ ...form }, 'speaker', speakerId));
  }
  function handleChangeTab(event, tabValue) {
    setTabValue(tabValue);
  }
  function handleDeleteEvent() {
    setIsLoadingDelete(true);
    dispatch(Actions.deleteEvent(selectedEventId));
  }
  function handleSaveEvent() {
    setIsLoading(true);
    dispatch(Actions.saveEvent(form));
  }

  function canBeSubmitted() {
    return (
      form.coverImageName &&
      form.title &&
      form.subTitle &&
      form.startDateTime &&
      form.endDateTime &&
      form.enrollDeadline &&
      form.maximumOfApplicants &&
      form.location &&
      form.speaker
    );
  }

  return (
    <FusePageCarded
      classes={{
        toolbar: 'p-0',
        header: 'min-h-160 h-160 sm:h-136 sm:min-h-136'
      }}
      header={
        form && (
          <div
            className={clsx(
              classes.evenlyWrapper,
              'flex flex-1 flex-col md:flex-row w-full items-center md:justify-between'
            )}
          >
            <div className="flex flex-col items-start max-w-full">
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Typography
                  className="normal-case flex items-center sm:mb-12"
                  component={Link}
                  role="button"
                  to="/staff/events-list"
                  color="inherit"
                >
                  <Icon className="mr-4 text-20">arrow_back</Icon>
                  返回 YS 活動列表
                </Typography>
              </FuseAnimate>

              <div className="flex items-center max-w-full">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                  {form.coverImageName ? (
                    <img
                      className="w-32 sm:w-48 mr-8 sm:mr-16 rounded"
                      src={imageNameToPathConverter(form.coverImageName)}
                      alt={form.title}
                    />
                  ) : (
                    <img
                      className="w-32 sm:w-48 mr-8 sm:mr-16 rounded"
                      src="assets/images/ecommerce/product-image-placeholder.png"
                      alt="預設圖片"
                    />
                  )}
                </FuseAnimate>
                <div className="flex flex-col min-w-0">
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="text-16 sm:text-20 truncate">
                      {form.title ? form.title : '新增 YS 活動'}
                    </Typography>
                  </FuseAnimate>
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography variant="caption">活動內容</Typography>
                  </FuseAnimate>
                </div>
              </div>
            </div>

            {selectedEventId === 'new' ? (
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Button
                  className="whitespace-no-wrap mx-12 rounded-full"
                  variant="contained"
                  color="secondary"
                  disabled={!canBeSubmitted()}
                  onClick={handleSaveEvent}
                >
                  {isLoading ? (
                    <span className="flex justify-center">
                      新增活動中 <LoadingSpinner width="2em" height="2em" />
                    </span>
                  ) : (
                    '新增活動'
                  )}
                </Button>
              </FuseAnimate>
            ) : (
              <FuseAnimateGroup
                enter={{
                  animation: 'transition.slideRightIn'
                }}
                className="flex flex-no-wrap"
              >
                {selectedEventId !== 'new' && (
                  <Button
                    className="whitespace-no-wrap mx-12 rounded-full"
                    variant="contained"
                    color="secondary"
                    onClick={() => props.setEditMode(false)}
                  >
                    <Icon className="mr-4 text-20">arrow_back</Icon> 分析資料
                  </Button>
                )}
                <Button
                  className="whitespace-no-wrap px-12 rounded-full bg-red text-white hover:bg-red-300"
                  variant="contained"
                  onClick={handleDeleteEvent}
                  disabled={EVENTS.docs.length < 2}
                >
                  {isLoadingDelete ? (
                    <span className="flex justify-center">
                      刪除活動中 <LoadingSpinner width="2em" height="2em" />
                    </span>
                  ) : (
                    '刪除活動'
                  )}
                </Button>
                <Button
                  className="whitespace-no-wrap mx-12 rounded-full"
                  variant="contained"
                  color="secondary"
                  disabled={!canBeSubmitted()}
                  onClick={handleSaveEvent}
                >
                  {isLoading ? (
                    <span className="flex justify-center">
                      更新活動中 <LoadingSpinner width="2em" height="2em" />
                    </span>
                  ) : (
                    '更新活動'
                  )}
                </Button>
              </FuseAnimateGroup>
            )}
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
          classes={{ root: 'w-full h-64' }}
        >
          <Tab className="h-64 normal-case" label="活動細節" />
          <Tab className="h-64 normal-case" label="活動問卷" />
          <Tab className="h-64 normal-case" label="活動講師" />
          <Tab className="h-64 normal-case" label="活動內容" />
          <Tab className="h-64 normal-case" label="活動封面" />
        </Tabs>
      }
      content={
        form && (
          <div className="p-16 sm:p-24 max-w-2xl max-h-screen">
            {tabValue === 0 && (
              <EventDetailEdit
                form={form}
                setForm={setForm}
                handleFormChange={handleChange}
              />
            )}
            {tabValue === 1 && (
              <QuestionnaireDetailEdit
                form={form}
                setForm={setForm}
                isNew={selectedEventId === 'new'}
              />
            )}
            {tabValue === 2 && (
              <SpeakerDetailEdit
                setEventSpeakerId={setEventSpeakerId}
                form={form}
              />
            )}
            {tabValue === 3 && form && (
              <ContentDetailEdit form={form} setForm={setForm} />
            )}
            {tabValue === 4 && (
              <CoverImageDetailEdit
                setEventImageName={setEventImageName}
                form={form}
              />
            )}
          </div>
        )
      }
    />
  );
}

export default EventEdit;
