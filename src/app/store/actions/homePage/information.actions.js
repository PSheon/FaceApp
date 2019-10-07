import axios from 'axios';
import history from '@history';

import { AUTH_REST_BASE_END_POINT } from 'app/fuse-configs/envsConfig';
import * as Actions from 'app/store/actions';
import eventBusService from 'app/services/eventBusService';

export const SET_INFORMATION_LIST_LOADING =
  '[HOMEPAGE] SET INFORMATION LIST LOADING';
export const SYNC_HOMEPAGE_INFORMATION = '[HOMEPAGE] SYNC INFORMATION';
export const APPEND_INFORMATION_TO_HOMEPAGE_INFORMATION_LIST =
  '[HOMEPAGE] APPEND INFORMATION TO INFORMATION LIST';
export const APPEND_NEXT_PAGE_INFORMATION_LIST =
  '[HOMEPAGE] APPEND NEXT PAGE INFORMATION';
export const REMOVE_INFORMATION_FROM_LIST =
  '[HOMEPAGE] REMOVE INFORMATION FROM LIST';

export function syncHomePageInformation() {
  return dispatch => {
    dispatch({ type: SET_INFORMATION_LIST_LOADING });
    eventBusService.getHomePageInformation().then(response => {
      if (response.docs.length) {
        dispatch({
          type: SYNC_HOMEPAGE_INFORMATION,
          payload: response
        });
      }
    });
  };
}
export function syncHomePageInformationById(informationId) {
  const request = axios.get(
    `${AUTH_REST_BASE_END_POINT}/api/information/${informationId}`
  );
  return dispatch => {
    dispatch({ type: SET_INFORMATION_LIST_LOADING });
    request
      .then(response => {
        dispatch({
          type: APPEND_INFORMATION_TO_HOMEPAGE_INFORMATION_LIST,
          payload: { informationDetail: response.data }
        });
      })
      .catch(err => {
        history.push({
          pathname: '/information-list'
        });
      });
  };
}

export function saveInformation(informationDetail) {
  return dispatch => {
    dispatch({ type: SET_INFORMATION_LIST_LOADING });
    eventBusService
      .createOrUpdateInformation(informationDetail)
      .then(payload => {
        dispatch({
          type: APPEND_INFORMATION_TO_HOMEPAGE_INFORMATION_LIST,
          payload: { informationDetail: payload }
        });
        dispatch(Actions.showMessage({ message: 'YS 情報已更新' }));

        history.push({
          pathname: '/staff/information-list'
        });
      });
  };
}

export function deleteInformation(informationId) {
  return dispatch => {
    dispatch({ type: SET_INFORMATION_LIST_LOADING });
    eventBusService.deleteInformation(informationId).then(payload => {
      dispatch({
        type: REMOVE_INFORMATION_FROM_LIST,
        payload: { informationId }
      });
      dispatch(Actions.showMessage({ message: 'YS 情報已刪除' }));

      history.push({
        pathname: '/staff/information-list'
      });
    });
  };
}
