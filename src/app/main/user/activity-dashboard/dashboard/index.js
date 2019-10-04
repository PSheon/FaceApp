import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Avatar, Tab, Tabs, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FusePageSimple, FuseAnimate } from '@fuse';
import QueueTab from './tabs/QueueTab';
// import HistoryTab from './tabs/HistoryTab';

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

function ActivityDashboard(props) {
  const classes = useStyles(props);
  const user = useSelector(({ auth }) => auth.user);

  const [selectedTab, setSelectedTab] = useState(0);

  function handleTabChange(event, value) {
    setSelectedTab(value);
  }

  return (
    <FusePageSimple
      classes={{
        header: classes.layoutHeader,
        toolbar: 'px-16 sm:px-24'
      }}
      header={
        <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
          <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
            <FuseAnimate animation="transition.expandIn" delay={300}>
              <Avatar className="w-96 h-96" src={user.data.photoURL} />
            </FuseAnimate>
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
              <Typography className="md:ml-24" variant="h3" color="inherit">
                {user.data.displayName}
              </Typography>
            </FuseAnimate>
          </div>

          <div className="flex flex-col-reverse items-center py-12 md:py-0 md:flex-row md:justify-end">
            {/* <Button className="mr-8 normal-case rounded-full" variant="contained" color="secondary" aria-label="Follow">Follow</Button> */}
            <Typography className="md:ml-24" variant="h5" color="inherit">
              半年間報名後未到次數 ： 0
            </Typography>
            <Link to="/events-list" role="button">
              <Button
                className="normal-case rounded-full mx-12"
                variant="contained"
                color="secondary"
                aria-label="活動列表"
              >
                看看其他活動
              </Button>
            </Link>
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
            root: 'h-64 w-full border-b-1'
          }}
        >
          <Tab
            classes={{
              root: 'h-64 rounded-full'
            }}
            label="參與的活動"
          />
          {/* <Tab
            classes={{
              root: "h-64 rounded-full"
            }} label="活動參與紀錄" /> */}
        </Tabs>
      }
      content={
        <div className="p-16 sm:p-24">
          {selectedTab === 0 && <QueueTab />}
          {/* {selectedTab === 1 && (
            <HistoryTab />
          )} */}
        </div>
      }
    />
  );
}

export default ActivityDashboard;
