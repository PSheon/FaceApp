import axios from 'axios';
import history from '@history';

import { AUTH_REST_BASE_END_POINT } from 'app/fuse-configs/envsConfig';
import * as Actions from 'app/store/actions';
import eventBusService from 'app/services/eventBusService';

export const SET_SPEAKERS_LIST_LOADING = '[HOMEPAGE] SET SPEAKERS LIST LOADING';
export const SYNC_HOMEPAGE_SPEAKERS = '[HOMEPAGE] SYNC SPEAKERS';
export const APPEND_SPEAKER_TO_HOMEPAGE_SPEAKERS_LIST =
  '[HOMEPAGE] APPEND SPEAKER TO SPEAKERS LIST';
export const APPEND_NEXT_PAGE_SPEAKERS_LIST =
  '[HOMEPAGE] APPEND NEXT PAGE SPEAKERS';
export const REMOVE_SPEAKER_FROM_LIST = '[HOMEPAGE] REMOVE SPEAKER FROM LIST';

export function syncHomePageSpeakers() {
  return dispatch => {
    dispatch({ type: SET_SPEAKERS_LIST_LOADING });
    eventBusService.getHomePageSpeakers().then(response => {
      if (response.docs.length) {
        dispatch({
          type: SYNC_HOMEPAGE_SPEAKERS,
          payload: response
        });
      }
    });
  };
}
export function syncHomePageSpeakerById(speakerId) {
  const request = axios.get(
    `${AUTH_REST_BASE_END_POINT}/api/speaker/${speakerId}`
  );
  return dispatch => {
    dispatch({ type: SET_SPEAKERS_LIST_LOADING });
    request
      .then(response => {
        dispatch({
          type: APPEND_SPEAKER_TO_HOMEPAGE_SPEAKERS_LIST,
          payload: { speakerDetail: response.data }
        });
      })
      .catch(err => {
        history.push({
          pathname: '/speakers-list'
        });
      });
  };
}

export function saveSpeaker(speakerDetail) {
  return dispatch => {
    dispatch({ type: SET_SPEAKERS_LIST_LOADING });
    eventBusService.createOrUpdateSpeaker(speakerDetail).then(payload => {
      dispatch({
        type: APPEND_SPEAKER_TO_HOMEPAGE_SPEAKERS_LIST,
        payload: { speakerDetail: payload }
      });
      dispatch(Actions.showMessage({ message: 'YS 講師已更新' }));

      history.push({
        pathname: '/staff/speakers-list'
      });
    });
  };
}

export function deleteSpeaker(speakerId) {
  return dispatch => {
    dispatch({ type: SET_SPEAKERS_LIST_LOADING });
    eventBusService.deleteSpeaker(speakerId).then(payload => {
      dispatch({
        type: REMOVE_SPEAKER_FROM_LIST,
        payload: { speakerId }
      });
      dispatch(Actions.showMessage({ message: 'YS 講師已刪除' }));

      history.push({
        pathname: '/staff/speakers-list'
      });
    });
  };
}
