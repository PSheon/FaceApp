import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import VisibilitySensor from 'react-visibility-sensor';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {
  TextField,
  Tooltip,
  Avatar,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  Button,
  Icon
} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { withStyles } from '@material-ui/core/styles';
import { FuseAnimateGroup } from '@fuse';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';

import * as Actions from 'app/store/actions';
import eventBusService from 'app/services/eventBusService';
import { spaceConverter, avatarNameToPathConverter } from 'app/utils';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#3e3e3e'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#fefefe'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#5e5e5e'
      },
      '&:hover fieldset': {
        borderColor: '#3e3e3e'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#3e3e3e'
      }
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '2.4rem'
    }
  }
})(TextField);
const useStyles = makeStyles(theme => ({
  panel: {
    margin: 0,
    borderWidth: '1px 1px 0 1px',
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    '&:first-child': {
      borderRadius: '16px 16px 0 0'
    },
    '&:last-child': {
      borderRadius: '0 0 16px 16px',
      borderWidth: '0 1px 1px 1px'
    },
    '&$expanded': {
      margin: 'auto'
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));
function BorrowAppointmentTab() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const BORROW_APPOINTMENT_LOGS = useSelector(
    ({ appointment }) => appointment.borrow
  );
  const isSyncingAppointmentLogs = BORROW_APPOINTMENT_LOGS.loading;
  const spaceBorrowList = BORROW_APPOINTMENT_LOGS['docs'];

  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);
  const [isCheckinLoading, setIsCheckinLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isAgreeing, setIsAgreeing] = useState(false);

  const toggleExpansion = panel => (event, expanded) => {
    setExpanded(expanded ? panel : false);
  };
  function handleOnPageBottom() {
    if (!BORROW_APPOINTMENT_LOGS['hasNextPage']) return;
    setIsLoadingNextPage(true);

    const params = {
      page: BORROW_APPOINTMENT_LOGS['nextPage'],
      limit: 20,
      sort: 'updatedAt',
      order: -1
    };

    eventBusService.getBorrowAppointments(params).then(response => {
      dispatch({
        type: Actions.APPEND_NEXT_PAGE_BORROW_APPOINTMENT_LOGS,
        payload: response
      });

      setIsLoadingNextPage(false);
    });
  }

  useEffect(() => {
    if (
      !isInitialized &&
      !spaceBorrowList.length &&
      !isSyncingAppointmentLogs
    ) {
      dispatch(Actions.syncBorrowSpaceAppointments());
      setIsInitialized(true);
    }
    // eslint-disable-next-line
  }, [dispatch, isSyncingAppointmentLogs]);
  useEffect(() => {
    setIsRejecting(false);
    setIsAgreeing(false);
    setIsCheckinLoading(false);
  }, [spaceBorrowList]);

  function handleCheckinSubmit(borrowId) {
    setIsCheckinLoading(true);
    dispatch(Actions.checkinBorrow({ borrowId }));
  }
  function handleRejectBorrowById(borrowId) {
    setIsRejecting(true);
    dispatch(Actions.rejectBorrow({ borrowId }));
  }
  function handleAgreeBorrowById(borrowId) {
    setIsAgreeing(true);
    dispatch(Actions.agreeBorrow({ borrowId }));
  }
  function panelTitleBuilder(borrowLog) {
    const date = moment(borrowLog.borrowingDate).format('LL');
    const space = spaceConverter(borrowLog.borrowingSpace)['title'];

    return `${date} - ${space}`;
  }
  function renderStatusBadge(borrowLog) {
    switch (borrowLog.appointmentStatus) {
      case 'pending':
        return (
          <Typography className="text-14 md:text-24 mx-12 px-12 whitespace-no-wrap rounded-full bg-amber-300 text-white">
            申請中
          </Typography>
        );
      case 'canceled':
        return (
          <Typography className="text-14 md:text-24 mx-12 px-12 whitespace-no-wrap rounded-full bg-red-300 text-white">
            自行取消
          </Typography>
        );
      case 'queueing':
        return (
          <Typography className="text-14 md:text-24 mx-12 px-12 whitespace-no-wrap rounded-full bg-amber-600 text-white">
            申請排隊中
          </Typography>
        );
      case 'rejected':
        return (
          <Typography className="text-14 md:text-24 mx-12 px-12 whitespace-no-wrap rounded-full bg-red-300 text-white">
            已拒絕
          </Typography>
        );
      case 'succeeded':
      default:
        return (
          <Typography className="text-14 md:text-24 mx-12 px-12 whitespace-no-wrap rounded-full bg-green-300 text-white">
            同意申請
          </Typography>
        );
    }
  }
  function renderButtonSection(borrowLog) {
    if (borrowLog.appointmentStatus !== 'canceled') {
      return (
        <div className="w-full flex justify-around py-12">
          <Button
            variant="contained"
            className="md:w-200 rounded-full bg-red-300 text-white hover:bg-red-400 hover:shadow-lg"
            aria-label="拒絕申請"
            disabled={isRejecting || borrowLog.appointmentStatus === 'rejected'}
            onClick={() => handleRejectBorrowById(borrowLog._id)}
            value="legacy"
          >
            <CancelOutlinedIcon className={classes.extendedIcon} />
            {isRejecting ? (
              <span className="flex justify-center">
                拒絕申請中 <LoadingSpinner width="2em" height="2em" />
              </span>
            ) : (
              '拒絕申請'
            )}
          </Button>
          {borrowLog.appointmentStatus === 'succeeded' ? (
            <Button
              variant="contained"
              className="md:w-200 rounded-full bg-green-300 text-white hover:bg-green-400 hover:shadow-lg"
              aria-label="簽到"
              disabled={isCheckinLoading || borrowLog.checkinStatus}
              onClick={() => handleCheckinSubmit(borrowLog._id)}
              value="legacy"
            >
              <CheckCircleOutlineIcon className={classes.extendedIcon} />
              {isCheckinLoading ? (
                <span className="flex justify-center">
                  簽到中 <LoadingSpinner width="2em" height="2em" />
                </span>
              ) : (
                `簽到 ${borrowLog.applicant.displayName}`
              )}
            </Button>
          ) : (
            <Button
              variant="contained"
              className="md:w-200 rounded-full bg-green-300 text-white hover:bg-green-400 hover:shadow-lg"
              aria-label="同意申請"
              disabled={isAgreeing}
              onClick={() => handleAgreeBorrowById(borrowLog._id)}
              value="legacy"
            >
              <CheckCircleOutlineIcon className={classes.extendedIcon} />
              {isAgreeing ? (
                <span className="flex justify-center">
                  同意申請中 <LoadingSpinner width="2em" height="2em" />
                </span>
              ) : (
                '同意申請'
              )}
            </Button>
          )}
        </div>
      );
    } else {
      return null;
    }
  }

  if (!spaceBorrowList.length) {
    if (isSyncingAppointmentLogs) {
      return (
        <div className="flex justify-center items-center w-full h-full">
          <LoadingSpinner width="128" height="128" />
        </div>
      );
    } else {
      return (
        <Link role="button" to="/ys-space">
          <div className="flex flex-col justify-center items-center w-full h-full">
            <Typography variant="h5" className="text-gray-800">
              還沒有任何空間借用
            </Typography>
          </div>
        </Link>
      );
    }
  }
  return (
    <FuseAnimateGroup
      className="flex flex-col flex-1 flex-shrink-0 max-w-2xl w-full mx-auto px-16 sm:px-24 pb-24 sm:pb-32"
      enter={{
        animation: 'transition.slideUpBigIn'
      }}
    >
      {spaceBorrowList.map(borrowLog => (
        <ExpansionPanel
          classes={{
            root: classes.panel,
            expanded: classes.expanded
          }}
          key={borrowLog._id}
          expanded={expanded === borrowLog._id}
          onChange={toggleExpansion(borrowLog._id)}
          elevation={0}
        >
          <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
            <div className="flex items-center">
              <Icon className="mr-8" color="action">
                location_on
              </Icon>
              {renderStatusBadge(borrowLog)}
              <Typography variant="subtitle1">
                {panelTitleBuilder(borrowLog)}
              </Typography>
            </div>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails className="flex flex-col sm:flex-row pb-0">
            <img
              src={spaceConverter(borrowLog.borrowingSpace)['coverImgUrl']}
              alt={spaceConverter(borrowLog.borrowingSpace)['title']}
              className="object-cover object-center w-full md:max-w-400 rounded-12 self-center mb-12 shadow-lg"
            />

            <div className="flex flex-col justify-center items-center w-full h-full">
              <table className="simple clickable p-12 pb-0">
                <tbody>
                  <tr>
                    <td className="min-w-96">借用會員</td>
                    <td>
                      <Tooltip
                        title={
                          <>
                            <Typography color="inherit">
                              全名：{borrowLog.applicant.fullName}
                            </Typography>
                            <Typography color="inherit">
                              信箱：{borrowLog.applicant.email}
                            </Typography>
                            <Typography color="inherit">
                              手機：{borrowLog.applicant.phone}
                            </Typography>
                          </>
                        }
                      >
                        <div className="flex justify-start items-center">
                          <Avatar
                            alt="applicant photo"
                            src={avatarNameToPathConverter(
                              borrowLog.applicant.photoURL
                            )}
                          />

                          <Typography className="flex items-center font-semibold ml-12 md:ml-24">
                            {borrowLog.applicant.displayName}
                          </Typography>
                        </div>
                      </Tooltip>
                    </td>
                  </tr>
                  <tr>
                    <td className="min-w-96">借用日期</td>
                    <td>
                      <Typography className="flex items-center font-semibold">
                        {moment(borrowLog.borrowingDate).format('LL')}
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>借用時間</td>
                    <td>
                      <Typography className="flex items-center font-semibold">
                        {borrowLog.borrowingTimeSlot === '上午'
                          ? '上午(09:30~12:30)'
                          : '下午(14:00~17:00)'}
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>借用機關</td>
                    <td>
                      <Typography className="flex items-center font-semibold">
                        {borrowLog.institutionName}
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>借用人數</td>
                    <td>
                      <Typography className="flex items-center font-semibold">
                        {borrowLog.borrowingNumber}
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>簽到狀況</td>
                    <td>
                      <Typography className="flex items-center font-semibold">
                        {borrowLog.checkinStatus ? (
                          <CheckCircleIcon className="text-green" />
                        ) : (
                          <RemoveCircleOutlineIcon className="text-gray-500" />
                        )}
                      </Typography>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="px-20 pt-12 w-full">
                <CssTextField
                  className="mb-24"
                  multiline
                  rows={3}
                  label="借用目的"
                  id="borrowingIntention"
                  name="borrowingIntention"
                  value={borrowLog.borrowingIntention}
                  variant="outlined"
                  required
                  InputProps={{
                    readOnly: true
                  }}
                  fullWidth
                />
              </div>
            </div>
          </ExpansionPanelDetails>

          {renderButtonSection(borrowLog)}
        </ExpansionPanel>
      ))}
      <VisibilitySensor>
        {({ isVisible }) => {
          return (
            <div className="flex justify-center items-center w-full min-h-10">
              {isLoadingNextPage && <LoadingSpinner width={200} height={200} />}
              {isVisible && !isLoadingNextPage && handleOnPageBottom()}
            </div>
          );
        }}
      </VisibilitySensor>
    </FuseAnimateGroup>
  );
}

export default BorrowAppointmentTab;
