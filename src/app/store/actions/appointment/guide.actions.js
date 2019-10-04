import axios from 'axios';
import formurlencoded from 'form-urlencoded';
import history from '@history';

import * as Actions from 'app/store/actions';
import eventBusService from 'app/services/eventBusService';
import { AUTH_REST_BASE_END_POINT } from 'app/fuse-configs/envsConfig';
export const SET_GUIDE_APPOINTMENT_LOADING =
  '[APPOINTMENT] SET GUIDE APPOINTMENT LOADING';
export const SYNC_SELF_GUIDE_APPOINTMENT =
  '[APPOINTMENT] SYNC SELF GUIDE APPOINTMENT';
export const SYNC_GUIDE_APPOINTMENT = '[APPOINTMENT] SYNC GUIDE APPOINTMENT';
export const APPEND_NEXT_PAGE_GUIDE_APPOINTMENT_LOGS =
  '[APPOINTMENT] APPEND NEXT PAGE GUIDE APPOINTMENT LOGS';
export const CANCEL_SELF_GUIDE_APPOINTMENT_BY_ID =
  '[APPOINTMENT] CANCEL GUIDE APPOINTMENT BY ID';
export const CHECKIN_GUIDE_APPOINTMENT_BY_ID =
  '[APPOINTMENT] CHECKIN GUIDE APPOINTMENT BY ID';
export const REJECT_GUIDE_APPOINTMENT_BY_ID =
  '[APPOINTMENT] REJECT GUIDE APPOINTMENT BY ID';
export const AGREE_GUIDE_APPOINTMENT_BY_ID =
  '[APPOINTMENT] AGREE GUIDE APPOINTMENT BY ID';

export function appointmentGuide(appointmentDetail) {
  const request = axios.post(
    `${AUTH_REST_BASE_END_POINT}/api/guideLog/`,
    formurlencoded(appointmentDetail)
  );
  return dispatch => {
    dispatch({ type: SET_GUIDE_APPOINTMENT_LOADING });
    request.then(response => {
      dispatch({
        type: SYNC_SELF_GUIDE_APPOINTMENT,
        payload: {
          selfGuideLogs: response.data
        }
      });
    });
  };
}

export function selfCancelGuide(guideDetail) {
  const request = axios.post(
    `${AUTH_REST_BASE_END_POINT}/api/guideLog/cancel`,
    formurlencoded(guideDetail)
  );
  return dispatch => {
    dispatch({ type: SET_GUIDE_APPOINTMENT_LOADING });
    request.then(response => {
      dispatch(Actions.showMessage({ message: '成功取消申請' }));
      dispatch({
        type: CANCEL_SELF_GUIDE_APPOINTMENT_BY_ID,
        payload: {
          guideId: guideDetail.guideId
        }
      });

      history.push({
        pathname: '/user/dashboard/guide'
      });
    });
  };
}

export function checkinGuide({ guideId }) {
  const request = axios.post(
    `${AUTH_REST_BASE_END_POINT}/api/guideLog/checkin`,
    formurlencoded({ guideId })
  );
  return dispatch => {
    dispatch({ type: SET_GUIDE_APPOINTMENT_LOADING });
    request.then(response => {
      dispatch(Actions.showMessage({ message: '已簽到' }));
      dispatch({
        type: CHECKIN_GUIDE_APPOINTMENT_BY_ID,
        payload: {
          guideId
        }
      });
    });
  };
}

export function rejectGuide({ guideId }) {
  const request = axios.post(
    `${AUTH_REST_BASE_END_POINT}/api/guideLog/update`,
    formurlencoded({ guideId, appointmentStatus: 'rejected' })
  );
  return dispatch => {
    dispatch({ type: SET_GUIDE_APPOINTMENT_LOADING });
    request.then(response => {
      dispatch(Actions.showMessage({ message: '已拒絕申請' }));
      dispatch({
        type: REJECT_GUIDE_APPOINTMENT_BY_ID,
        payload: {
          guideId
        }
      });
    });
  };
}

export function agreeGuide({ guideId }) {
  const request = axios.post(
    `${AUTH_REST_BASE_END_POINT}/api/guideLog/update`,
    formurlencoded({ guideId, appointmentStatus: 'succeeded' })
  );
  return dispatch => {
    dispatch({ type: SET_GUIDE_APPOINTMENT_LOADING });
    request.then(response => {
      dispatch(Actions.showMessage({ message: '已同意申請' }));
      dispatch({
        type: AGREE_GUIDE_APPOINTMENT_BY_ID,
        payload: {
          guideId
        }
      });
    });
  };
}

export function syncGuideAppointments(
  routeParams = {
    page: 1,
    limit: 20,
    sort: 'updatedAt',
    order: -1
  }
) {
  return dispatch => {
    dispatch({ type: SET_GUIDE_APPOINTMENT_LOADING });
    eventBusService.getGuideAppointments(routeParams).then(response => {
      dispatch({
        type: SYNC_GUIDE_APPOINTMENT,
        payload: response
      });
    });
  };
}

export function syncSelfGuideAppointments() {
  const request = axios.get(`${AUTH_REST_BASE_END_POINT}/api/guideLog/self`);
  return dispatch => {
    dispatch({ type: SET_GUIDE_APPOINTMENT_LOADING });
    request.then(response => {
      dispatch({
        type: SYNC_SELF_GUIDE_APPOINTMENT,
        payload: {
          selfGuideLogs: response.data
        }
      });
    });
  };
}
