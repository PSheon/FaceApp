import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  TextField,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  Button,
  Icon
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FuseAnimateGroup } from '@fuse';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';

import * as Actions from 'app/store/actions';
import { spaceConverter } from 'app/utils';
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
  }
}));
function BorrowAppointmentTab() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const SELF_APPOINTMENT_LOGS = useSelector(
    ({ appointment }) => appointment.selfLogs
  );
  const isSyncingAppointmentLogs = SELF_APPOINTMENT_LOGS.loading;
  const spaceBorrowList = SELF_APPOINTMENT_LOGS['borrow'];

  const [expanded, setExpanded] = useState(null);
  const [isCanceling, setIsCanceling] = useState(false);

  const toggleExpansion = panel => (event, expanded) => {
    setExpanded(expanded ? panel : false);
  };

  useEffect(() => {
    if (!spaceBorrowList.length && !isSyncingAppointmentLogs) {
      dispatch(Actions.syncSelfBorrowSpaceAppointments());
    }
    // eslint-disable-next-line
  }, [dispatch, isSyncingAppointmentLogs]);
  useEffect(() => {
    setIsCanceling(false);
  }, [spaceBorrowList]);

  function handleCancelBorrowById(borrowId) {
    setIsCanceling(true);
    dispatch(Actions.selfCancelBorrow({ borrowId }));
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
          <Typography className="text-14 md:text-24 mx-12 px-12 whitespace-no-wrap rounded-full bg-amber-300">
            申請中
          </Typography>
        );
      case 'canceled':
        return (
          <Typography className="text-14 md:text-24 mx-12 px-12 whitespace-no-wrap rounded-full bg-red-300">
            已取消
          </Typography>
        );
      case 'queueing':
        return (
          <Typography className="text-14 md:text-24 mx-12 px-12 whitespace-no-wrap rounded-full bg-amber-600">
            申請排隊中
          </Typography>
        );
      case 'rejected':
        return (
          <Typography className="text-14 md:text-24 mx-12 px-12 whitespace-no-wrap rounded-full bg-red-300">
            已被拒絕
          </Typography>
        );
      case 'succeeded':
      default:
        return (
          <Typography className="text-14 md:text-24 mx-12 px-12 whitespace-no-wrap rounded-full bg-green-300">
            申請成功
          </Typography>
        );
    }
  }
  function renderCancelButton(borrowLog) {
    if (
      borrowLog.appointmentStatus === 'pending' ||
      borrowLog.appointmentStatus === 'queueing'
    ) {
      return (
        <div className="w-full flex justify-center py-12">
          <Button
            variant="contained"
            color="primary"
            className="w-200 rounded-full"
            aria-label="取消申請"
            disabled={isCanceling}
            onClick={() => handleCancelBorrowById(borrowLog._id)}
            value="legacy"
          >
            {isCanceling ? (
              <span className="flex justify-center">
                取消申請中 <LoadingSpinner width="2em" height="2em" />
              </span>
            ) : (
              '取消申請'
            )}
          </Button>
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
              還沒有借用任何空間
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

          <ExpansionPanelDetails className="flex flex-col sm:flex-row">
            <img
              src={spaceConverter(borrowLog.borrowingSpace)['coverImgUrl']}
              alt={spaceConverter(borrowLog.borrowingSpace)['title']}
              className="object-cover object-center w-full md:max-w-400 rounded-12 self-center mb-12 shadow-lg"
            />

            <div className="flex flex-col justify-center items-center w-full h-full">
              <table className="simple clickable p-12 pb-0">
                <tbody>
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
                        {borrowLog.checkinStatus ? '已簽到' : '未簽到'}
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

          {renderCancelButton(borrowLog)}
        </ExpansionPanel>
      ))}
    </FuseAnimateGroup>
  );
}

export default BorrowAppointmentTab;
