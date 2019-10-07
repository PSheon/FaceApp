import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Badge, Tab, Tabs, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FusePageSimple, FuseAnimate } from '@fuse';

import { countingWaitingAppointmentLogs } from 'app/utils';
import DashboardBreadcrumbs from 'app/main/shared/DashboardBreadcrumbs';
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
  const CONSULTING_LOGS = useSelector(
    ({ appointment }) => appointment.consulting
  );
  const BORROW_LOGS = useSelector(({ appointment }) => appointment.borrow);
  const GUIDE_LOGS = useSelector(({ appointment }) => appointment.guide);

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
        <div className="flex flex-col flex-1">
          <DashboardBreadcrumbs className="pl-12" pageNames={['預約管理']} />
          <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
            <div className="flex flex-1 flex-col items-start justify-center self-center md:justify-start">
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Typography variant="h3" color="inherit">
                  預約管理
                </Typography>
              </FuseAnimate>
            </div>

            <div className="flex flex-col items-center py-12 md:py-0 md:justify-end">
              <Typography
                className="mb-12 md:mb-24"
                variant="h5"
                color="inherit"
              >
                未處理預約 ：
                {countingWaitingAppointmentLogs({
                  CONSULTING_LOGS,
                  BORROW_LOGS,
                  GUIDE_LOGS
                })}
              </Typography>
              <div className="flex justify-center items-center">
                <Button
                  className="normal-case rounded-full mx-12"
                  variant="contained"
                  color="secondary"
                  aria-label="YS 的最新消息"
                >
                  回到 最新消息
                </Button>
              </div>
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
            label={
              CONSULTING_LOGS.docs.length ? (
                <Badge
                  className={classes.badgePadding}
                  color="secondary"
                  badgeContent={CONSULTING_LOGS.docs.length}
                >
                  個人諮詢申請
                </Badge>
              ) : (
                '個人諮詢申請'
              )
            }
          />
          <Tab
            classes={{
              root: 'h-64 rounded-full'
            }}
            label={
              BORROW_LOGS.docs.length ? (
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Badge
                    className={classes.badgePadding}
                    color="secondary"
                    badgeContent={BORROW_LOGS.docs.length}
                  >
                    空間借用申請
                  </Badge>
                </FuseAnimate>
              ) : (
                '空間借用申請'
              )
            }
          />
          <Tab
            classes={{
              root: 'h-64 rounded-full'
            }}
            label={
              GUIDE_LOGS.docs.length ? (
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Badge
                    className={classes.badgePadding}
                    color="secondary"
                    badgeContent={GUIDE_LOGS.docs.length}
                  >
                    參訪導覽申請
                  </Badge>
                </FuseAnimate>
              ) : (
                '參訪導覽申請'
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
