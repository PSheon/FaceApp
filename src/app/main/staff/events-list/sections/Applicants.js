import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  Tooltip,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  Avatar
} from '@material-ui/core';
import CsvDownload from 'react-json-to-csv';
import Rating from '@material-ui/lab/Rating';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import clsx from 'clsx';
import { FuseAnimate } from '@fuse';
import { makeStyles } from '@material-ui/styles';

import * as Actions from 'app/store/actions';
import { avatarNameToPathConverter, eventLogToCsvConverter } from 'app/utils';
import LoadingSpinner from 'app/main/shared/LoadingSpinner';
import LoadingSpinnerOverlay from 'app/main/shared/LoadingSpinnerOverlay';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.default
  },
  contactButton: {
    width: 70,
    minWidth: 70,
    flex: '0 0 auto',
    '&.active:after': {
      position: 'absolute',
      top: 8,
      right: 0,
      bottom: 8,
      content: "''",
      width: 4,
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      backgroundColor: theme.palette.primary.main
    }
  },
  status: {
    position: 'absolute',
    width: 12,
    height: 12,
    bottom: 4,
    left: 44,
    border: '2px solid ' + theme.palette.background.default,
    borderRadius: '50%',
    zIndex: 10,

    '&.succeeded': {
      backgroundColor: '#4CAF50'
    },

    '&.rejected': {
      backgroundColor: '#F44336'
    },

    '&.queueing': {
      backgroundColor: '#FFC107'
    },

    '&.canceled': {
      backgroundColor: '#F44336'
    },

    '&.pending': {
      backgroundColor: '#646464'
    }
  }
}));
function Applicants(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const EVENT_DETAIL = props.eventDetail;
  const EVENTS_ACTIVITY_LOGS = useSelector(
    ({ activity }) => activity.eventLogs
  );
  const eventLogs = EVENTS_ACTIVITY_LOGS.docs[EVENT_DETAIL._id];
  const eventQueueingInfos =
    EVENTS_ACTIVITY_LOGS.queueingInfos[EVENT_DETAIL._id];
  const isSyncing = EVENTS_ACTIVITY_LOGS.loading;

  const [isCheckinLoading, setIsCheckinLoading] = useState(false);

  useEffect(() => {
    setIsCheckinLoading(false);
  }, [eventLogs]);

  function tooltipTitle(logDetail) {
    const orderIndex = logDetail.queueOrder;
    const limit = EVENT_DETAIL.maximumOfApplicants;

    if (orderIndex === -1) {
      return logDetail.registrationStatus;
    } else if (orderIndex <= limit) {
      return '活動編號 ' + orderIndex;
    } else {
      return '候補編號 ' + orderIndex - limit;
    }
  }

  function handleCheckinSubmit(applicantInfos) {
    setIsCheckinLoading(true);
    dispatch(
      Actions.updateApplicantCheckinStatus({
        event: EVENT_DETAIL._id,
        applicant: applicantInfos._id,
        action: true
      })
    );
  }

  function renderCheckinCell(logDetail) {
    if (logDetail.queueOrder >= 0) {
      return (
        <div className="flex justify-center items-center">
          {logDetail.checkinStatus ? (
            <CheckCircleIcon className="text-green" />
          ) : isCheckinLoading ? (
            <LoadingSpinner width={32} height={32} />
          ) : (
            <Tooltip
              title={`簽到 ${logDetail.applicant.fullName}`}
              placement="top"
            >
              <RemoveCircleOutlineIcon
                className="text-gray-500"
                onClick={e => {
                  e.stopPropagation();
                  handleCheckinSubmit(logDetail.applicant);
                }}
              />
            </Tooltip>
          )}
        </div>
      );
    } else {
      return (
        <div className="flex justify-center items-center">
          <Tooltip
            title={`${logDetail.applicant.fullName} 尚未報名成功，請先同意活動申請`}
            placement="top"
          >
            <RemoveCircleOutlineIcon className="text-gray-500" />
          </Tooltip>
        </div>
      );
    }
  }
  if (isSyncing && !eventLogs.length) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <LoadingSpinner width="128" height="128" />
      </div>
    );
  }
  return (
    <FuseAnimate animation="transition.slideUpIn" delay={200}>
      <Paper className="w-full rounded-8 shadow-none border-1">
        <div className="flex items-center justify-between px-16 h-64 border-b-1">
          <Typography className="text-16">報名名單</Typography>
          <div className="flex justify-center items-center">
            <Typography className="text-11 font-500 rounded-4 text-white bg-red px-8 py-4 mx-4">
              {eventQueueingInfos &&
                eventQueueingInfos['canceledCount'] + ' 人已取消'}
            </Typography>
            <Typography className="text-11 font-500 rounded-4 text-white bg-orange px-8 py-4 mx-4">
              {eventQueueingInfos &&
                eventQueueingInfos['queueingCount'] + ' 人候補中'}
            </Typography>
            <Typography className="text-11 font-500 rounded-4 text-white bg-green px-8 py-4 mx-4">
              {eventQueueingInfos &&
                eventQueueingInfos['succeededCount'] + ' 人已報名'}
            </Typography>
            <CsvDownload
              data={eventLogToCsvConverter(eventLogs)}
              filename={`${EVENT_DETAIL.title}.csv`}
              style={{
                boxShadow: 'inset 0px 1px 0px 0px #e184f3',
                background:
                  'linear-gradient(to bottom, #c123de 5%, #a20dbd 100%)',
                backgroundColor: '#c123de',
                borderRadius: '6px',
                border: '1px solid #a511c0',
                display: 'inline-block',
                cursor: 'pointer',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: 'bold',
                padding: '6px 24px',
                textDecoration: 'none',
                textShadow: '0px 1px 0px #9b14b3'
              }}
            >
              匯出名單
            </CsvDownload>
          </div>
        </div>
        <div className="table-responsive">
          {isSyncing && <LoadingSpinnerOverlay width="64" height="64" />}
          <Table className="w-full min-w-full" size="small">
            <TableHead>
              <TableRow>
                <TableCell className="whitespace-no-wrap p-8 pl-16"></TableCell>
                <TableCell className="text-center whitespace-no-wrap">
                  全名
                </TableCell>
                <TableCell className="text-center whitespace-no-wrap">
                  信箱
                </TableCell>
                <TableCell className="text-center whitespace-no-wrap">
                  手機
                </TableCell>
                <TableCell className="text-center whitespace-no-wrap">
                  給予講師的評價
                </TableCell>
                <TableCell className="text-center whitespace-no-wrap">
                  給予活動的評價
                </TableCell>
                <TableCell className="text-center whitespace-no-wrap">
                  簽到狀況
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {eventLogs.map(logDetail => (
                <TableRow
                  key={logDetail._id}
                  hover
                  className="cursor-pointer relative"
                  onClick={(e, handleOriginal) => {
                    if (logDetail) {
                      dispatch(Actions.openEventActivityDialog(logDetail));
                    }
                  }}
                >
                  <TableCell component="th" scope="row" className="pl-16 pr-0">
                    <Tooltip title={tooltipTitle(logDetail)} placement="top">
                      <Button className={clsx(classes.contactButton)}>
                        <div
                          className={clsx(
                            logDetail.registrationStatus,
                            classes.status
                          )}
                        />
                        <Avatar
                          src={avatarNameToPathConverter(
                            logDetail.applicant.photoURL
                          )}
                        />
                      </Button>
                    </Tooltip>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className="truncate text-center font-600"
                  >
                    {logDetail.applicant.fullName}
                  </TableCell>

                  <TableCell
                    component="th"
                    scope="row"
                    className="truncate text-center"
                  >
                    {logDetail.applicant.email}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className="truncate text-center"
                  >
                    {logDetail.applicant.phone}
                  </TableCell>
                  <TableCell component="th" scope="row" className="truncate">
                    <div className="flex justify-center items-center">
                      {logDetail['eventStars'] ? (
                        <Rating
                          value={logDetail['eventStars']}
                          size="small"
                          readOnly
                        />
                      ) : (
                        <RemoveCircleOutlineIcon className="text-gray-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className="truncate text-center"
                  >
                    <div className="flex justify-center items-center">
                      {logDetail['speakerStars'] ? (
                        <Rating
                          value={logDetail['speakerStars']}
                          size="small"
                          readOnly
                        />
                      ) : (
                        <RemoveCircleOutlineIcon className="text-gray-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className="truncate text-center"
                  >
                    {renderCheckinCell(logDetail)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </FuseAnimate>
  );
}

export default Applicants;
