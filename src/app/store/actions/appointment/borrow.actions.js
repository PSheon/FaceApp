import axios from 'axios';
import formurlencoded from 'form-urlencoded';
import history from '@history';

import * as Actions from 'app/store/actions';
import { AUTH_REST_BASE_END_POINT } from 'app/fuse-configs/envsConfig';
export const SET_BORROW_APPOINTMENT_LOADING = '[APPOINTMENT] SET BORROW APPOINTMENT LOADING';
export const SYNC_SELF_BORROW_APPOINTMENT = '[APPOINTMENT] SYNC SELF BORROW APPOINTMENT';
export const SYNC_BORROW_APPOINTMENT = '[APPOINTMENT] SYNC BORROW APPOINTMENT';
export const CANCEL_SELF_BORROW_APPOINTMENT_BY_ID = '[APPOINTMENT] cancel BORROW APPOINTMENT BY ID';

export function borrowSpace(borrowDetail) {
  const request = axios.post(`${AUTH_REST_BASE_END_POINT}/api/borrowLog`, formurlencoded(borrowDetail));
  return (dispatch) => {
    dispatch({ type: SET_BORROW_APPOINTMENT_LOADING });
    request.then((response) => {
      dispatch(Actions.showMessage({ message: '成功借用場地' }));
      dispatch({
        type: SYNC_SELF_BORROW_APPOINTMENT,
        payload: {
          selfBorrowLogs: response.data
        },
      })

      history.push({
        pathname: '/user/dashboard/borrow'
      });
    })
  }
}

export function selfCancelBorrow(borrowDetail) {
  const request = axios.post(`${AUTH_REST_BASE_END_POINT}/api/borrowLog/cancel`, formurlencoded(borrowDetail));
  return (dispatch) => {
    dispatch({ type: SET_BORROW_APPOINTMENT_LOADING });
    request.then((response) => {
      dispatch(Actions.showMessage({ message: '成功取消申請' }));
      dispatch({
        type: CANCEL_SELF_BORROW_APPOINTMENT_BY_ID,
        payload: {
          borrowId: borrowDetail.borrowId
        },
      })

      history.push({
        pathname: '/user/dashboard/borrow'
      });
    })
  }
}

// export function syncBorrowSpaceAppointments() {
//   const request = axios.get(`${AUTH_REST_BASE_END_POINT}/api/borrowLog`);
//   return (dispatch) => {
//     dispatch({ type: SET_BORROW_APPOINTMENT_LOADING });
//     request.then((response) => {

//       dispatch({
//         type: SYNC_SELF_BORROW_APPOINTMENT,
//         payload: {
//           selfBorrowLogs: response.data
//         },
//       })
//     })
//   }
// }

export function syncSelfBorrowSpaceAppointments() {
  const request = axios.get(`${AUTH_REST_BASE_END_POINT}/api/borrowLog/self`);
  return (dispatch) => {
    dispatch({ type: SET_BORROW_APPOINTMENT_LOADING });
    request.then((response) => {

      dispatch({
        type: SYNC_SELF_BORROW_APPOINTMENT,
        payload: {
          selfBorrowLogs: response.data
        },
      })
    })
  }
}
