import axios from 'axios';
import history from '@history';

import { AUTH_REST_BASE_END_POINT } from 'app/fuse-configs/envsConfig';
import * as Actions from 'app/store/actions';
import eventBusService from 'app/services/eventBusService';

export const SET_EVENTS_LIST_LOADING = '[HOMEPAGE] SET EVENTS LIST LOADING';
export const SYNC_HOMEPAGE_EVENTS = '[HOMEPAGE] SYNC EVENTS';
export const APPEND_EVENTS_TO_HOMEPAGE_EVENTS_LIST = '[HOMEPAGE] APPEND EVENTS TO EVENTS LIST';
export const APPEND_NEXT_PAGE_EVENTS_LIST = '[HOMEPAGE] APPEND NEXT PAGE EVENTS';

export function syncHomePageEvents() {
  return dispatch => {
    dispatch({ type: SET_EVENTS_LIST_LOADING })
    eventBusService.getHomePageEvents()
      .then(response => {
        if (response.docs.length) {
          dispatch({
            type: SYNC_HOMEPAGE_EVENTS,
            payload: response,
          })
        }
      })
  }
}
export function syncHomePageEventById(eventId) {
  const request = axios.get(`${AUTH_REST_BASE_END_POINT}/api/event/${eventId}`);
  return (dispatch) => {
    dispatch({ type: SET_EVENTS_LIST_LOADING })
    request
      .then((response) => {
        dispatch({
          type: APPEND_EVENTS_TO_HOMEPAGE_EVENTS_LIST,
          payload: response.data,
        })
      })
      .catch(err => {
        history.push({
          pathname: '/events-list'
        })
      });
  }
}

export function saveEvent(eventDetail) {
  return dispatch => {
    dispatch({ type: SET_EVENTS_LIST_LOADING })
    eventBusService.createOrUpdateEvent(eventDetail)
      .then(payload => {

        dispatch(syncHomePageEvents())
        dispatch(Actions.showMessage({ message: 'YS 活動已更新' }));

        history.push({
          pathname: '/staff/events-list'
        });
      })
  }
}

export function deleteEvent(eventId) {
  return dispatch => {
    dispatch({ type: SET_EVENTS_LIST_LOADING })
    eventBusService.deleteEvent(eventId)
      .then(payload => {

        dispatch(syncHomePageEvents())
        dispatch(Actions.showMessage({ message: 'YS 活動已刪除' }));

        history.push({
          pathname: '/staff/events-list'
        });
      })
  }
}
