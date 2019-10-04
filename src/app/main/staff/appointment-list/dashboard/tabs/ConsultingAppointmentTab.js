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
import { avatarNameToPathConverter } from 'app/utils';
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
function ConsultingAppointmentTab() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const CONSULTING_APPOINTMENT_LOGS = useSelector(
    ({ appointment }) => appointment['consulting']
  );
  const isSyncingAppointmentLogs = CONSULTING_APPOINTMENT_LOGS.loading;
  const consultingAppointmentList = CONSULTING_APPOINTMENT_LOGS['docs'];

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
    if (!CONSULTING_APPOINTMENT_LOGS['hasNextPage']) return;
    setIsLoadingNextPage(true);

    const params = {
      page: CONSULTING_APPOINTMENT_LOGS['nextPage'],
      limit: 20,
      sort: 'updatedAt',
      order: -1
    };

    eventBusService.getSecretConsultingAppointments(params).then(response => {
      dispatch({
        type: Actions.APPEND_NEXT_PAGE_CONSULTING_APPOINTMENT_LOGS,
        payload: response
      });

      setIsLoadingNextPage(false);
    });
  }

  useEffect(() => {
    if (
      !isInitialized &&
      !consultingAppointmentList.length &&
      !isSyncingAppointmentLogs
    ) {
      dispatch(Actions.syncSecretConsultingAppointments());
      setIsInitialized(true);
    }
    // eslint-disable-next-line
  }, [isSyncingAppointmentLogs]);
  useEffect(() => {
    setIsRejecting(false);
    setIsAgreeing(false);
    setIsCheckinLoading(false);
  }, [consultingAppointmentList]);

  function handleCheckinSubmit(consultingId) {
    setIsCheckinLoading(true);
    dispatch(Actions.checkinConsulting({ consultingId }));
  }
  function handleRejectConsultingById(consultingId) {
    setIsRejecting(true);
    dispatch(Actions.rejectConsulting({ consultingId }));
  }
  function handleAgreeConsultingById(consultingId) {
    setIsAgreeing(true);
    dispatch(Actions.agreeConsulting({ consultingId }));
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
            自行取消
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
            已拒絕
          </Typography>
        );
      case 'succeeded':
      default:
        return (
          <Typography className="text-14 md:text-24 mx-12 px-12 whitespace-no-wrap rounded-full bg-green-300">
            同意申請
          </Typography>
        );
    }
  }
  function renderButtonSection(consultingLog) {
    if (consultingLog.appointmentStatus !== 'canceled') {
      return (
        <div className="w-full flex justify-around py-12">
          <Button
            variant="contained"
            className="md:w-200 rounded-full bg-red-300 text-white hover:bg-red-400 hover:shadow-lg"
            aria-label="拒絕申請"
            disabled={
              isRejecting || consultingLog.appointmentStatus === 'rejected'
            }
            onClick={() => handleRejectConsultingById(consultingLog._id)}
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
          {consultingLog.appointmentStatus === 'succeeded' ? (
            <Button
              variant="contained"
              className="md:w-200 rounded-full bg-green-300 text-white hover:bg-green-400 hover:shadow-lg"
              aria-label="簽到"
              disabled={isCheckinLoading || consultingLog.checkinStatus}
              onClick={() => handleCheckinSubmit(consultingLog._id)}
              value="legacy"
            >
              <CheckCircleOutlineIcon className={classes.extendedIcon} />
              {isCheckinLoading ? (
                <span className="flex justify-center">
                  簽到中 <LoadingSpinner width="2em" height="2em" />
                </span>
              ) : (
                `簽到 ${consultingLog.applicant.displayName}`
              )}
            </Button>
          ) : (
            <Button
              variant="contained"
              className="md:w-200 rounded-full bg-green-300 text-white hover:bg-green-400 hover:shadow-lg"
              aria-label="同意申請"
              disabled={isAgreeing}
              onClick={() => handleAgreeConsultingById(consultingLog._id)}
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
              還沒有任何諮詢預約
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

          <ExpansionPanelDetails className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <table className="simple clickable p-12 pb-0">
                <tbody>
                  <tr>
                    <td className="min-w-96">預約諮詢會員</td>
                    <td>
                      <Tooltip
                        title={
                          <>
                            <Typography color="inherit">
                              全名：{consultingLog.applicant.fullName}
                            </Typography>
                            <Typography color="inherit">
                              信箱：{consultingLog.applicant.email}
                            </Typography>
                            <Typography color="inherit">
                              手機：{consultingLog.applicant.phone}
                            </Typography>
                          </>
                        }
                      >
                        <div className="flex justify-start items-center">
                          <Avatar
                            alt="applicant photo"
                            src={avatarNameToPathConverter(
                              consultingLog.applicant.photoURL
                            )}
                          />

                          <Typography className="flex items-center font-semibold ml-12 md:ml-24">
                            {consultingLog.applicant.displayName}
                          </Typography>
                        </div>
                      </Tooltip>
                    </td>
                  </tr>
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
                        {consultingLog.checkinStatus ? (
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

          {renderButtonSection(consultingLog)}
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

export default ConsultingAppointmentTab;
