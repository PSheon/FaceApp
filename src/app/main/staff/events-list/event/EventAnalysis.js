import React, { useEffect, useState } from 'react';
import { Button, Tab, Tabs, Icon, Typography } from '@material-ui/core';
import history from '@history';
import { makeStyles } from '@material-ui/core/styles';
import { FuseAnimate, FusePageCarded } from '@fuse';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import { imageNameToPathConverter, eventDateStatus } from 'app/utils';
import AnalysisSection from '../sections/Analysis';
import ApplicantsSection from '../sections/Applicants';
import * as Actions from 'app/store/actions';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';
import EventActivityDialog from './EventActivityDialog';

const useStyles = makeStyles(theme => ({
  evenlyWrapper: {
    justifyContent: 'space-evenly',
  },
}));

function EventAnalysis(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const selectedEventId = props.match.params.eventId;
  const EVENTS = useSelector(({ homePage }) => homePage.events);

  const [eventDetail, setEventDetil] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  function handleChangeTab(event, tabValue) {
    setTabValue(tabValue);
  }

  useEffect(() => {
    if (EVENTS.docs.length) {
      const event = EVENTS.docs.find(item => item._id === selectedEventId)
      if (!event) {
        history.push({
          pathname: '/staff/events-list'
        })
      } else {
        setEventDetil(event);
        setIsLoading(false);
      }
    } else {
      dispatch(Actions.syncHomePageEventById(selectedEventId));
    }
  }, [EVENTS.docs, dispatch, selectedEventId]);
  useEffect(() => {
    dispatch(Actions.syncEventActivityLogs(selectedEventId));
  }, [dispatch, selectedEventId])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner width={128} height={128} />
      </div>
    )
  }

  return (
    <FusePageCarded
      classes={{
        toolbar: "p-0",
        header: "min-h-160 h-160 sm:h-136 sm:min-h-136"
      }}
      header={
        <div className={clsx(classes.evenlyWrapper, "flex flex-1 flex-col md:flex-row w-full items-center md:justify-between")}>
          <div className="flex flex-col items-start max-w-full">
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
              <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/staff/events-list" color="inherit">
                <Icon className="mr-4 text-20">arrow_back</Icon>
                返回 YS 活動列表
                </Typography>
            </FuseAnimate>

            <div className="flex items-center max-w-full">
              <FuseAnimate animation="transition.expandIn" delay={300}>
                {eventDetail.coverImageName ? (
                  <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src={imageNameToPathConverter(eventDetail.coverImageName)} alt={eventDetail.title} />
                ) : (
                    <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt='預設圖片' />
                  )}
              </FuseAnimate>
              <div className="flex flex-col min-w-0">
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography className="text-16 sm:text-20 truncate">
                    {eventDetail.title ? eventDetail.title : '新增 YS 活動'}
                  </Typography>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography variant="caption">{eventDateStatus(eventDetail.enrollDeadline, eventDetail.startDateTime, eventDetail.endDateTime)['humanize']}</Typography>
                </FuseAnimate>
              </div>
            </div>
          </div>
          {/* If event not finished */}
          {eventDateStatus(eventDetail.enrollDeadline, eventDetail.startDateTime, eventDetail.endDateTime)['statusCode'] !== 3 && (
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
              <Button
                className="whitespace-no-wrap mx-12 rounded-full"
                variant="contained"
                color="secondary"
                onClick={() => props.setEditMode(true)}
              >
                更新活動資料
              </Button>
            </FuseAnimate>
          )}
        </div>
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
          <Tab className="h-64 normal-case" label="活動統計" />
          <Tab className="h-64 normal-case" label="人員名單" />
        </Tabs>
      }
      content={
        <div className="max-h-screen">
          {tabValue === 0 && eventDetail && (
            <div className="px-16 sm:px-24">
              <AnalysisSection
                eventDetail={eventDetail}
              />
            </div>
          )}
          {tabValue === 1 && eventDetail && (
            <ApplicantsSection eventDetail={eventDetail} />
          )}

          {/* Dialog */}
          <EventActivityDialog EVENT_DETAIL={eventDetail} />
        </div>
      }
      innerScroll
    />
  )
}

export default EventAnalysis;
