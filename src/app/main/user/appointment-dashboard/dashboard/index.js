import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Avatar,
  Badge,
  Tab,
  Tabs,
  Typography,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FusePageSimple, FuseAnimate } from '@fuse';

import ConsultingAppointmentTab from './tabs/ConsultingAppointmentTab';
import BorrowAppointmentTab from './tabs/BorrowAppointmentTab';
import GuideAppointmentTab from './tabs/GuideAppointmentTab';

const useStyles = makeStyles(theme => ({
  badgePadding: {
    padding: theme.spacing(0, 2)
  },
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
  const SELF_LOGS = useSelector(({ appointment }) => appointment.selfLogs);
  const CONSULTING_LOGS = SELF_LOGS['consulting'];
  const BORROW_LOGS = SELF_LOGS['borrow'];
  const GUIDE_LOGS = SELF_LOGS['guide'];

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
  }, [appointmentType]);

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

          <div className="flex flex-col items-center py-12 md:py-0 md:justify-end">
            <Typography className="mb-12 md:mb-24" variant="h5" color="inherit">
              {false && '半年間申請後未到次數 ： 0'}
            </Typography>
            <div className="flex justify-center items-center">
              <Link to="/ys-services/appointment/consulting" role="button">
                <Button
                  className="normal-case rounded-full mx-12"
                  variant="contained"
                  color="secondary"
                  aria-label="預約 YS 個人諮詢"
                >
                  預約 個人諮詢
                </Button>
              </Link>
              <Link to="/ys-space" role="button">
                <Button
                  className="normal-case rounded-full mx-12"
                  variant="contained"
                  color="secondary"
                  aria-label="預約 YS 開放空間"
                >
                  預約 開放空間
                </Button>
              </Link>
              <Link to="/information-list" role="button">
                <Button
                  className="normal-case rounded-full mx-12"
                  variant="contained"
                  color="secondary"
                  aria-label="預約 YS 空間導覽"
                >
                  預約 空間導覽
                </Button>
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
            root: 'h-64 w-full border-b-1'
          }}
        >
          <Tab
            classes={{
              root: 'h-64 rounded-full'
            }}
            // label="諮詢紀錄"
            label={
              CONSULTING_LOGS.length ? (
                <Badge
                  className={classes.badgePadding}
                  color="secondary"
                  badgeContent={CONSULTING_LOGS.length}
                >
                  諮詢紀錄
                </Badge>
              ) : (
                '諮詢紀錄'
              )
            }
          />
          <Tab
            classes={{
              root: 'h-64 rounded-full'
            }}
            // label="空間借用紀錄"
            label={
              BORROW_LOGS.length ? (
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Badge
                    className={classes.badgePadding}
                    color="secondary"
                    badgeContent={BORROW_LOGS.length}
                  >
                    空間借用紀錄
                  </Badge>
                </FuseAnimate>
              ) : (
                '空間借用紀錄'
              )
            }
          />
          <Tab
            classes={{
              root: 'h-64 rounded-full'
            }}
            // label="參訪紀錄"
            label={
              GUIDE_LOGS.length ? (
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Badge
                    className={classes.badgePadding}
                    color="secondary"
                    badgeContent={GUIDE_LOGS.length}
                  >
                    參訪紀錄
                  </Badge>
                </FuseAnimate>
              ) : (
                '參訪紀錄'
              )
            }
          />
        </Tabs>
      }
      content={
        <div className="p-16 sm:p-24">
          {selectedTab === 0 && <ConsultingAppointmentTab />}
          {selectedTab === 1 && <BorrowAppointmentTab />}
          {selectedTab === 2 && <GuideAppointmentTab />}
        </div>
      }
    />
  );
}

export default BorrowDashboard;
