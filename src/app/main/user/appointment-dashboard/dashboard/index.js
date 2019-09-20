import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Avatar, Tab, Tabs, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FusePageSimple, FuseAnimate } from '@fuse';

import BorrowAppointmentTab from './tabs/BorrowAppointmentTab';
import GuideAppointmentTab from './tabs/GuideAppointmentTab';

const useStyles = makeStyles(theme => ({
  layoutHeader: {
    height: 180,
    minHeight: 180,
    [theme.breakpoints.down('md')]: {
      height: 200,
      minHeight: 200
    },
    [theme.breakpoints.down('sm')]: {
      height: 280,
      minHeight: 280
    }
  }
}));
function BorrowDashboard(props) {
  const classes = useStyles(props);
  const appointmentType = props.match.params.appointmentType;
  const user = useSelector(({ auth }) => auth.user);

  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    switch (appointmentType) {
      case 'borrow':
        setSelectedTab(1);
        break;
      case 'guide':
        setSelectedTab(2);
        break;
      case 'consulting':
      default:
        setSelectedTab(0);
        break;
    }
  }, [appointmentType])

  function handleTabChange(event, value) {
    setSelectedTab(value);
  }

  return (
    <FusePageSimple
      classes={{
        header: classes.layoutHeader,
        toolbar: "px-16 sm:px-24"
      }}
      header={
        <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
          <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
            <FuseAnimate animation="transition.expandIn" delay={300}>
              <Avatar className="w-96 h-96" src={user.data.photoURL} />
            </FuseAnimate>
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
              <Typography className="md:ml-24" variant="h3" color="inherit">{user.data.displayName}</Typography>
            </FuseAnimate>
          </div>

          <div className="flex flex-col items-center py-12 md:py-0 md:justify-end">
            <Typography className="mb-12 md:mb-24" variant="h5" color="inherit">半年間申請後未到次數 ： 0</Typography>
            <div className="flex justify-center items-center">
              <Link to="/ys-space" role="button">
                <Button className="normal-case rounded-full mx-12" variant="contained" color="secondary" aria-label="YS 的開放空間">看看 YS 的開放空間</Button>
              </Link>
              <Link to="/information-list" role="button">
                <Button className="normal-case rounded-full mx-12" variant="contained" color="secondary" aria-label="YS 的最新消息">看看 YS 的最新消息</Button>
              </Link>
            </div>
          </div>
        </div>
      }
      contentToolbar={
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="off"
          classes={{
            root: "h-64 w-full border-b-1"
          }}
        >
          <Tab
            classes={{
              root: "h-64 rounded-full"
            }}
            label="諮詢紀錄" />
          <Tab
            classes={{
              root: "h-64 rounded-full"
            }}
            label="空間借用紀錄" />
          <Tab
            classes={{
              root: "h-64 rounded-full"
            }}
            label="參訪紀錄" />
        </Tabs>
      }
      content={
        <div className="p-16 sm:p-24">
          {selectedTab === 0 && (
            <BorrowAppointmentTab />
          )}
          {selectedTab === 1 && (
            <BorrowAppointmentTab />
          )}
          {selectedTab === 2 && (
            <GuideAppointmentTab />
          )}
        </div>
      }
    />
  )
}

export default BorrowDashboard;
