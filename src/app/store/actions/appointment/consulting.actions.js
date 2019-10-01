import axios from 'axios';
import formurlencoded from 'form-urlencoded';
import history from '@history';

import * as Actions from 'app/store/actions';
import eventBusService from 'app/services/eventBusService';
import { AUTH_REST_BASE_END_POINT } from 'app/fuse-configs/envsConfig';
export const SET_CONSULTING_APPOINTMENT_LOADING =
  '[APPOINTMENT] SET CONSULTING APPOINTMENT LOADING';
export const SYNC_SELF_CONSULTING_APPOINTMENT =
  '[APPOINTMENT] SYNC SELF CONSULTING APPOINTMENT';
export const SYNC_CONSULTING_APPOINTMENT =
  '[APPOINTMENT] SYNC CONSULTING APPOINTMENT';
export const APPEND_NEXT_PAGE_CONSULTING_APPOINTMENT_LOGS =
  '[APPOINTMENT] APPEND NEXT PAGE CONSULTING APPOINTMENT LOGS';
export const CANCEL_SELF_CONSULTING_APPOINTMENT_BY_ID =
  '[APPOINTMENT] CANCEL CONSULTING APPOINTMENT BY ID';
export const REJECT_CONSULTING_APPOINTMENT_BY_ID =
  '[APPOINTMENT] REJECT CONSULTING APPOINTMENT BY ID';
export const AGREE_CONSULTING_APPOINTMENT_BY_ID =
  '[APPOINTMENT] AGREE CONSULTING APPOINTMENT BY ID';

export function syncPublicConsultingLogs() {
  return dispatch => {
    dispatch({ type: SET_CONSULTING_APPOINTMENT_LOADING });
    eventBusService.getPublicConsultingAppointments().then(response => {
      dispatch({
        type: SYNC_CONSULTING_APPOINTMENT,
        payload: response
      });
    });
  };
}
export function syncSecretConsultingLogs() {
  return dispatch => {
    dispatch({ type: SET_CONSULTING_APPOINTMENT_LOADING });
    eventBusService.getSecretConsultingAppointments().then(response => {
      dispatch({
        type: SYNC_CONSULTING_APPOINTMENT,
        payload: response
      });
    });
  };
}

export function appointmentConsulting(consultingDetail) {
  const request = axios.post(
    `${AUTH_REST_BASE_END_POINT}/api/consultingLog`,
    formurlencoded(consultingDetail)
  );
  return dispatch => {
    dispatch({ type: SET_CONSULTING_APPOINTMENT_LOADING });
    request.then(response => {
      dispatch({
        type: SYNC_CONSULTING_APPOINTMENT,
        payload: response.data
      });

      history.push({
        pathname: '/user/dashboard/consulting'
      });
    });
  };
}

export function selfCancelConsulting(consultingDetail) {
  const request = axios.post(
    `${AUTH_REST_BASE_END_POINT}/api/consultingLog/cancel`,
    formurlencoded(consultingDetail)
  );
  return dispatch => {
    dispatch({ type: SET_CONSULTING_APPOINTMENT_LOADING });
    request.then(response => {
      dispatch(Actions.showMessage({ message: '成功取消申請' }));
      dispatch({
        type: CANCEL_SELF_CONSULTING_APPOINTMENT_BY_ID,
        payload: {
          consultingId: consultingDetail.consultingId
        }
      });

      history.push({
        pathname: '/user/dashboard/consulting'
      });
    });
  };
}

export function rejectConsulting({ consultingId }) {
  const request = axios.post(
    `${AUTH_REST_BASE_END_POINT}/api/consultingLog/update`,
    formurlencoded({ consultingId, appointmentStatus: 'rejected' })
  );
  return dispatch => {
    dispatch({ type: SET_CONSULTING_APPOINTMENT_LOADING });
    request.then(response => {
      dispatch(Actions.showMessage({ message: '已拒絕申請' }));
      dispatch({
        type: REJECT_CONSULTING_APPOINTMENT_BY_ID,
        payload: {
          consultingId
        }
      });
    });
  };
}

export function agreeConsulting({ consultingId }) {
  const request = axios.post(
    `${AUTH_REST_BASE_END_POINT}/api/consultingLog/update`,
    formurlencoded({ consultingId, appointmentStatus: 'succeeded' })
  );
  return dispatch => {
    dispatch({ type: SET_CONSULTING_APPOINTMENT_LOADING });
    request.then(response => {
      dispatch(Actions.showMessage({ message: '已同意申請' }));
      dispatch({
        type: AGREE_CONSULTING_APPOINTMENT_BY_ID,
        payload: {
          consultingId
        }
      });
    });
  };
}

export function syncPublicConsultingAppointments(
  routeParams = {
    page: 1,
    limit: 20,
    sort: 'updatedAt',
    order: -1
  }
) {
  return dispatch => {
    dispatch({ type: SET_CONSULTING_APPOINTMENT_LOADING });
    eventBusService
      .getPublicConsultingAppointments(routeParams)
      .then(response => {
        dispatch({
          type: SYNC_CONSULTING_APPOINTMENT,
          payload: response
        });
      });
  };
}
export function syncSecretConsultingAppointments(
  routeParams = {
    page: 1,
    limit: 20,
    sort: 'updatedAt',
    order: -1
  }
) {
  return dispatch => {
    dispatch({ type: SET_CONSULTING_APPOINTMENT_LOADING });
    eventBusService
      .getSecretConsultingAppointments(routeParams)
      .then(response => {
        dispatch({
          type: SYNC_CONSULTING_APPOINTMENT,
          payload: response
        });
      });
  };
}

export function syncSelfConsultingAppointments() {
  const request = axios.get(
    `${AUTH_REST_BASE_END_POINT}/api/consultingLog/self`
  );
  return dispatch => {
    dispatch({ type: SET_CONSULTING_APPOINTMENT_LOADING });
    request.then(response => {
      dispatch({
        type: SYNC_SELF_CONSULTING_APPOINTMENT,
        payload: {
          selfConsultingLogs: response.data
        }
      });
    });
  };
}
