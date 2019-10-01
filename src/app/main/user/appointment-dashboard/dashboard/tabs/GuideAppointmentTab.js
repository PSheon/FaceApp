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
function GuideAppointmentTab() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const SELF_APPOINTMENT_LOGS = useSelector(
    ({ appointment }) => appointment.selfLogs
  );
  const isSyncingAppointmentLogs = SELF_APPOINTMENT_LOGS.loading;
  const guideAppointmentList = SELF_APPOINTMENT_LOGS['guide'];

  const [expanded, setExpanded] = useState(null);
  const [isCanceling, setIsCanceling] = useState(false);

  const toggleExpansion = panel => (event, expanded) => {
    setExpanded(expanded ? panel : false);
  };

  useEffect(() => {
    if (!guideAppointmentList.length && !isSyncingAppointmentLogs) {
      dispatch(Actions.syncSelfGuideAppointments());
    }
    // eslint-disable-next-line
  }, [dispatch, isSyncingAppointmentLogs]);
  useEffect(() => {
    setIsCanceling(false);
  }, [guideAppointmentList]);

  function handleCancelGuideById(guideId) {
    setIsCanceling(true);
    dispatch(Actions.selfCancelGuide({ guideId }));
  }
  function panelTitleBuilder(guideLog) {
    const date = moment(guideLog.guideDate).format('LL');
    const time = guideLog.guideTimeSlot;

    return `${date} - ${time}`;
  }
  function renderStatusBadge(guideLog) {
    switch (guideLog.appointmentStatus) {
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
  function renderCancelButton(guideLog) {
    if (
      guideLog.appointmentStatus === 'pending' ||
      guideLog.appointmentStatus === 'queueing'
    ) {
      return (
        <div className="w-full flex justify-center py-12">
          <Button
            variant="contained"
            color="primary"
            className="w-200 rounded-full"
            aria-label="取消預約"
            disabled={isCanceling}
            onClick={() => handleCancelGuideById(guideLog._id)}
            value="legacy"
          >
            {isCanceling ? (
              <span className="flex justify-center">
                取消預約中 <LoadingSpinner width="2em" height="2em" />
              </span>
            ) : (
              '取消預約'
            )}
          </Button>
        </div>
      );
    } else {
      return null;
    }
  }

  if (!guideAppointmentList.length) {
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
              還沒有申請任何導覽
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
      {guideAppointmentList.map(guideLog => (
        <ExpansionPanel
          classes={{
            root: classes.panel,
            expanded: classes.expanded
          }}
          key={guideLog._id}
          expanded={expanded === guideLog._id}
          onChange={toggleExpansion(guideLog._id)}
          elevation={0}
        >
          <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
            <div className="flex items-center">
              <Icon className="mr-8" color="action">
                location_on
              </Icon>
              {renderStatusBadge(guideLog)}
              <Typography variant="subtitle1">
                {panelTitleBuilder(guideLog)}
              </Typography>
            </div>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails className="flex flex-col sm:flex-row">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <table className="simple clickable p-12 pb-0">
                <tbody>
                  <tr>
                    <td className="min-w-96">預約導覽日期</td>
                    <td>
                      <Typography className="flex items-center font-semibold">
                        {moment(guideLog.guideDate).format('LL')}
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>預約導覽時間</td>
                    <td>
                      <Typography className="flex items-center font-semibold">
                        {guideLog.guideTimeSlot === '上午'
                          ? '上午(09:30~12:30)'
                          : '下午(14:00~17:00)'}
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>預約導覽機關</td>
                    <td>
                      <Typography className="flex items-center font-semibold">
                        {guideLog.institutionName}
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>預約導覽人數</td>
                    <td>
                      <Typography className="flex items-center font-semibold">
                        {guideLog.guideNumber}
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>簽到狀況</td>
                    <td>
                      <Typography className="flex items-center font-semibold">
                        {guideLog.checkinStatus ? '已簽到' : '未簽到'}
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
                  label="預約導覽目的"
                  id="guideIntention"
                  name="guideIntention"
                  value={guideLog.guideIntention}
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

          {renderCancelButton(guideLog)}
        </ExpansionPanel>
      ))}
    </FuseAnimateGroup>
  );
}

export default GuideAppointmentTab;
