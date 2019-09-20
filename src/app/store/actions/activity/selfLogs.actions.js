import axios from 'axios';
import history from '@history';

import { AUTH_REST_BASE_END_POINT } from 'app/fuse-configs/envsConfig';
import * as Actions from 'app/store/actions';
import eventBusService from 'app/services/eventBusService';

export const SET_SELF_ACTIVITY_LOGS_LIST_LOADING = '[HOMEPAGE] SET SELF ACTIVITY LOGS LOADING';
export const SYNC_SELF_ACTIVITY_LOGS_LIST = '[HOMEPAGE] SYNC SELF ACTIVITY LOGS';
export const SYNC_SELF_ACTIVITY_LOG_LIST_WITH_EVENT_ID = '[HOMEPAGE] SYNC SELF ACTIVITY LOG BY ID';
export const UPDATE_SELF_ACTIVITY_REGISTRATION_STATUS = '[HOMEPAGE] UPDATE SELF ACTIVITY REGISTRATION STATUS';

export function syncSelfActivityLogs() {
  const request = axios.get(`${AUTH_REST_BASE_END_POINT}/api/activityLog/self`);
  return (dispatch) => {
    dispatch({ type: SET_SELF_ACTIVITY_LOGS_LIST_LOADING })
    request.then((response) =>
      dispatch({
        type: SYNC_SELF_ACTIVITY_LOGS_LIST,
        payload: response.data,
      })
    );
  }
}

export function applyEvent(applyDetail) {
  return (dispatch) => {
    dispatch({ type: SET_SELF_ACTIVITY_LOGS_LIST_LOADING })
    eventBusService.applyEvent(applyDetail)
      .then(payload => {
        dispatch(Actions.showMessage({ message: '活動報名成功' }));
        dispatch({
          type: SYNC_SELF_ACTIVITY_LOGS_LIST,
          payload: {
            selfActivityLogs: payload
          }
        })
        dispatch({
          type: Actions.UPDATE_APPLICANT_PREQUESTION,
          payload: {
            eventId: payload.event._id,
            applicant: payload.applicant,
            checkinStatus: payload.checkinStatus,
            lunchType: payload.lunchType,
            participantExpectation: payload.participantExpectation,
            participantHeardFrom: payload.participantHeardFrom,
            participantID: payload.participantID,
            participantIsManager: payload.participantIsManager,
            participateLunch: payload.participateLunch,
            participateReason: payload.participateReason,
            _id: payload._id,
          }
        })

        history.push({
          pathname: '/user/dashboard/activity'
        });
      })
      .catch(error => {
        dispatch(Actions.showMessage({ message: '活動報名失敗QQ' }));
        history.push({
          pathname: '/events-list'
        });
      })
  }
}
