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
function ConsultingAppointmentTab() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const SELF_APPOINTMENT_LOGS = useSelector(
    ({ appointment }) => appointment.selfLogs
  );
  const isSyncingAppointmentLogs = SELF_APPOINTMENT_LOGS.loading;
  const consultingAppointmentList = SELF_APPOINTMENT_LOGS['consulting'];

  const [expanded, setExpanded] = useState(null);
  const [isCanceling, setIsCanceling] = useState(false);

  const toggleExpansion = panel => (event, expanded) => {
    setExpanded(expanded ? panel : false);
  };

  useEffect(() => {
    if (!consultingAppointmentList.length && !isSyncingAppointmentLogs) {
      dispatch(Actions.syncSelfConsultingAppointments());
    }
    // eslint-disable-next-line
  }, [dispatch, isSyncingAppointmentLogs]);
  useEffect(() => {
    setIsCanceling(false);
  }, [consultingAppointmentList]);

  function handleCancelConsultingById(consultingId) {
    setIsCanceling(true);
    dispatch(Actions.selfCancelConsulting({ consultingId }));
  }
  function panelTitleBuilder(consultingLog) {
    const date = moment(consultingLog.consultingDate).format('LL');
    const topic = consultingLog.consultingTopic;

    return `${date} - ${topic}`;
  }
  function renderStatusBadge(consultingLog) {
    switch (consultingLog.appointmentStatus) {
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
  function renderCancelButton(consultingLog) {
    if (
      consultingLog.appointmentStatus === 'pending' ||
      consultingLog.appointmentStatus === 'queueing'
    ) {
      return (
        <div className="w-full flex justify-center py-12">
          <Button
            variant="contained"
            color="primary"
            className="w-200 rounded-full"
            aria-label="取消預約"
            disabled={isCanceling}
            onClick={() => handleCancelConsultingById(consultingLog._id)}
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

  if (!consultingAppointmentList.length) {
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
              還沒有申請任何個人諮詢
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
      {consultingAppointmentList.map(consultingLog => (
        <ExpansionPanel
          classes={{
            root: classes.panel,
            expanded: classes.expanded
          }}
          key={consultingLog._id}
          expanded={expanded === consultingLog._id}
          onChange={toggleExpansion(consultingLog._id)}
          elevation={0}
        >
          <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
            <div className="flex items-center">
              <Icon className="mr-8" color="action">
                location_on
              </Icon>
              {renderStatusBadge(consultingLog)}
              <Typography variant="subtitle1">
                {panelTitleBuilder(consultingLog)}
              </Typography>
            </div>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails className="flex flex-col sm:flex-row">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <table className="simple clickable p-12 pb-0">
                <tbody>
                  <tr>
                    <td className="min-w-96">預約諮詢日期</td>
                    <td>
                      <Typography className="flex items-center font-semibold">
                        {moment(consultingLog.consultingDate).format('LL')}
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>預約諮詢時間</td>
                    <td>
                      <Typography className="flex items-center font-semibold">
                        {consultingLog.consultingTimeSlot}
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>預約諮詢主題</td>
                    <td>
                      <Typography className="flex items-center font-semibold">
                        {consultingLog.consultingTopic}
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>簽到狀況</td>
                    <td>
                      <Typography className="flex items-center font-semibold">
                        {consultingLog.checkinStatus ? '已簽到' : '未簽到'}
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
                  label="預約諮詢意圖"
                  id="consultingIntention"
                  name="consultingIntention"
                  value={consultingLog.consultingIntention}
                  variant="outlined"
                  required
                  InputProps={{
                    readOnly: true
                  }}
                  fullWidth
                />
              </div>

              <div className="px-20 pt-12 w-full">
                <CssTextField
                  className="mb-24"
                  multiline
                  rows={3}
                  label="預約諮詢期待"
                  id="consultingexpectation"
                  name="consultingexpectation"
                  value={consultingLog.consultingexpectation}
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

          {renderCancelButton(consultingLog)}
        </ExpansionPanel>
      ))}
    </FuseAnimateGroup>
  );
}

export default ConsultingAppointmentTab;
