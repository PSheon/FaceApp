import axios from 'axios';
import formurlencoded from 'form-urlencoded';
// import history from '@history';

import * as Actions from 'app/store/actions';
import { permitToSelfCancel } from 'app/utils';
import { AUTH_REST_BASE_END_POINT } from 'app/fuse-configs/envsConfig';
import eventBusService from 'app/services/eventBusService';
// import * as Actions from 'app/store/actions';

export const SET_EVENT_ACTIVITY_LOGS_LIST_UPDATING = '[HOMEPAGE] SET EVENT ACTIVITY LOGS UPDATING';
export const SET_EVENT_ACTIVITY_LOGS_LIST_LOADING = '[HOMEPAGE] SET EVENT ACTIVITY LOGS LOADING';
export const SYNC_ACTIVITY_LOGS_WITH_EVENT_ID = '[HOMEPAGE] SYNC EVENT ACTIVITY LOGS';
export const OPEN_EVENT_ACTIVITY_INFO_DIALOG = '[HOMEPAGE] OPEN EVENT ACTIVITY INFO DIALOG';
export const CLOSE_EVENT_ACTIVITY_INFO_DIALOG = '[HOMEPAGE] CLOSE EVENT ACTIVITY INFO DIALOG';
export const UPDATE_APPLICANT_ACTIVITY_REGISTRATION_STATUS = '[HOMEPAGE] UPDATE APPLICANT ACTIVITY REGISTRATION STATUS';
export const UPDATE_APPLICANT_PREQUESTION = '[HOMEPAGE] UPDATE APPLICANT PREQUESTION';
export const UPDATE_APPLICANT_REVIEWS = '[HOMEPAGE] UPDATE APPLICANT REVIEWS';

export function syncEventActivityLogs(eventId) {
  const request = axios.get(`${AUTH_REST_BASE_END_POINT}/api/activityLog/event/${eventId}`);
  return (dispatch) => {
    dispatch({ type: SET_EVENT_ACTIVITY_LOGS_LIST_LOADING })
    request.then((response) => {

      dispatch({
        type: SYNC_ACTIVITY_LOGS_WITH_EVENT_ID,
        payload: {
          eventId,
          activityLogs: response.data
        },
      })
    });
  }
}

export function updateEventReview(reviewDetail) {
  return (dispatch) => {
    dispatch({ type: SET_EVENT_ACTIVITY_LOGS_LIST_UPDATING })
    eventBusService.updateEventReview(reviewDetail)
      .then(payload => {
        dispatch(Actions.showMessage({ message: '已更新活動評價' }));
        dispatch({
          type: UPDATE_APPLICANT_REVIEWS,
          payload: {
            eventId: payload.event,
            eventComments: payload.eventComments,
            eventStars: payload.eventStars,
            speakerContentStars: payload.speakerContentStars,
            speakerExpressionStars: payload.speakerExpressionStars,
            speakerStars: payload.speakerStars,
          }
        })
      })
      .catch(error => {
        dispatch(Actions.showMessage({ message: '活動評價失敗' }));
      })
  }
}


/* If before 3 days or longer, Applicant permit to cancel by self */
export function cancelApplicant({ event, applicant }) {
  const request = axios.post(`${AUTH_REST_BASE_END_POINT}/api/activityLog/event/cancel`, formurlencoded({ event, applicant }));
  return (dispatch) => {
    if (applicant.role === 'user') {
      if (permitToSelfCancel(event)) {
        dispatch({ type: SET_EVENT_ACTIVITY_LOGS_LIST_LOADING })
        request.then((response) => {
          /* 取消成功，更新selfLogs & eventLogs */
          dispatch({ type: Actions.UPDATE_SELF_ACTIVITY_REGISTRATION_STATUS, payload: { registrationStatus: 'canceled' } })
          dispatch({
            type: Actions.UPDATE_APPLICANT_ACTIVITY_REGISTRATION_STATUS,
            payload: { eventId: event, applicantId: applicant, registrationStatus: 'canceled' }
          })

          dispatch({
            type: Actions.SHOW_MESSAGE,
            options: { message: `已取消活動報名` },
          });
        });
      } else {
        dispatch({
          type: Actions.SHOW_MESSAGE,
          options: { message: `已超過手動取消期限，請來電取消活動` },
        });
      }
    } else {
      request.then((response) => {
        /* 取消成功，更新 eventLogs */
        dispatch({
          type: Actions.UPDATE_APPLICANT_ACTIVITY_REGISTRATION_STATUS,
          payload: { eventId: event, applicantId: applicant, registrationStatus: 'canceled' }
        })

        dispatch({
          type: Actions.SHOW_MESSAGE,
          options: { message: `已取消申請人報名` },
        });
      });
    }
  }
}

export function openEventActivityDialog(data) {
  return {
    type: OPEN_EVENT_ACTIVITY_INFO_DIALOG,
    payload: {
      data
    }
  }
}

export function closeEventActivityDialog() {
  return {
    type: CLOSE_EVENT_ACTIVITY_INFO_DIALOG
  }
}

/* Call from Staff above */
export function updateApplicantRegistrationStatus({ event, applicant, action = 'queueing' }) {
  const request = axios.post(`${AUTH_REST_BASE_END_POINT}/api/activityLog/event/registration/${action}`, formurlencoded({ event, applicant }));
  return (dispatch) => {
    dispatch({ type: SET_EVENT_ACTIVITY_LOGS_LIST_LOADING })
    request.then((response) => {
      /* 同意成功，更新 eventLogs */
      dispatch({
        type: Actions.UPDATE_APPLICANT_ACTIVITY_REGISTRATION_STATUS,
        payload: { eventId: event, applicantId: applicant, registrationStatus: action }
      })

      switch (action) {
        case 'queueing':
          dispatch({
            type: Actions.SHOW_MESSAGE,
            options: { message: `已同意申請人候補` },
          });
          break;
        case 'rejected':
          dispatch({
            type: Actions.SHOW_MESSAGE,
            options: { message: `已拒絕申請人報名` },
          });
          break;
        case 'succeeded':
        default:
          dispatch({
            type: Actions.SHOW_MESSAGE,
            options: { message: `已同意申請人報名` },
          });
          break;
      }
    })
  }
}
