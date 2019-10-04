import axios from 'axios';
import formurlencoded from 'form-urlencoded';
import history from '@history';

import * as Actions from 'app/store/actions';
import eventBusService from 'app/services/eventBusService';
import { AUTH_REST_BASE_END_POINT } from 'app/fuse-configs/envsConfig';
export const SET_BORROW_APPOINTMENT_LOADING =
  '[APPOINTMENT] SET BORROW APPOINTMENT LOADING';
export const SYNC_SELF_BORROW_APPOINTMENT =
  '[APPOINTMENT] SYNC SELF BORROW APPOINTMENT';
export const SYNC_BORROW_APPOINTMENT = '[APPOINTMENT] SYNC BORROW APPOINTMENT';
export const APPEND_NEXT_PAGE_BORROW_APPOINTMENT_LOGS =
  '[APPOINTMENT] APPEND NEXT PAGE BORROW APPOINTMENT LOGS';
export const CANCEL_SELF_BORROW_APPOINTMENT_BY_ID =
  '[APPOINTMENT] CANCEL BORROW APPOINTMENT BY ID';
export const CHECKIN_BORROW_APPOINTMENT_BY_ID =
  '[APPOINTMENT] CHECKIN BORROW APPOINTMENT BY ID';
export const REJECT_BORROW_APPOINTMENT_BY_ID =
  '[APPOINTMENT] REJECT BORROW APPOINTMENT BY ID';
export const AGREE_BORROW_APPOINTMENT_BY_ID =
  '[APPOINTMENT] AGREE BORROW APPOINTMENT BY ID';

export function borrowSpace(borrowDetail) {
  const request = axios.post(
    `${AUTH_REST_BASE_END_POINT}/api/borrowLog`,
    formurlencoded(borrowDetail)
  );
  return dispatch => {
    dispatch({ type: SET_BORROW_APPOINTMENT_LOADING });
    request.then(response => {
      dispatch(Actions.showMessage({ message: '成功借用場地' }));
      dispatch({
        type: SYNC_SELF_BORROW_APPOINTMENT,
        payload: {
          selfBorrowLogs: response.data
        }
      });

      history.push({
        pathname: '/user/dashboard/borrow'
      });
    });
  };
}

export function selfCancelBorrow(borrowDetail) {
  const request = axios.post(
    `${AUTH_REST_BASE_END_POINT}/api/borrowLog/cancel`,
    formurlencoded(borrowDetail)
  );
  return dispatch => {
    dispatch({ type: SET_BORROW_APPOINTMENT_LOADING });
    request.then(response => {
      dispatch(Actions.showMessage({ message: '成功取消申請' }));
      dispatch({
        type: CANCEL_SELF_BORROW_APPOINTMENT_BY_ID,
        payload: {
          borrowId: borrowDetail.borrowId
        }
      });

      history.push({
        pathname: '/user/dashboard/borrow'
      });
    });
  };
}

export function checkinBorrow({ borrowId }) {
  const request = axios.post(
    `${AUTH_REST_BASE_END_POINT}/api/borrowLog/checkin`,
    formurlencoded({ borrowId })
  );
  return dispatch => {
    dispatch({ type: SET_BORROW_APPOINTMENT_LOADING });
    request.then(response => {
      dispatch(Actions.showMessage({ message: '已簽到' }));
      dispatch({
        type: CHECKIN_BORROW_APPOINTMENT_BY_ID,
        payload: {
          borrowId
        }
      });
    });
  };
}

export function rejectBorrow({ borrowId }) {
  const request = axios.post(
    `${AUTH_REST_BASE_END_POINT}/api/borrowLog/update`,
    formurlencoded({ borrowId, appointmentStatus: 'rejected' })
  );
  return dispatch => {
    dispatch({ type: SET_BORROW_APPOINTMENT_LOADING });
    request.then(response => {
      dispatch(Actions.showMessage({ message: '已拒絕申請' }));
      dispatch({
        type: REJECT_BORROW_APPOINTMENT_BY_ID,
        payload: {
          borrowId
        }
      });
    });
  };
}

export function agreeBorrow({ borrowId }) {
  const request = axios.post(
    `${AUTH_REST_BASE_END_POINT}/api/borrowLog/update`,
    formurlencoded({ borrowId, appointmentStatus: 'succeeded' })
  );
  return dispatch => {
    dispatch({ type: SET_BORROW_APPOINTMENT_LOADING });
    request.then(response => {
      dispatch(Actions.showMessage({ message: '已同意申請' }));
      dispatch({
        type: AGREE_BORROW_APPOINTMENT_BY_ID,
        payload: {
          borrowId
        }
      });
    });
  };
}

export function syncBorrowSpaceAppointments(
  routeParams = {
    page: 1,
    limit: 20,
    sort: 'updatedAt',
    order: -1
  }
) {
  return dispatch => {
    dispatch({ type: SET_BORROW_APPOINTMENT_LOADING });
    eventBusService.getBorrowAppointments(routeParams).then(response => {
      dispatch({
        type: SYNC_BORROW_APPOINTMENT,
        payload: response
      });
    });
  };
}

export function syncSelfBorrowSpaceAppointments() {
  const request = axios.get(`${AUTH_REST_BASE_END_POINT}/api/borrowLog/self`);
  return dispatch => {
    dispatch({ type: SET_BORROW_APPOINTMENT_LOADING });
    request.then(response => {
      dispatch({
        type: SYNC_SELF_BORROW_APPOINTMENT,
        payload: {
          selfBorrowLogs: response.data
        }
      });
    });
  };
}
