import axios from 'axios';

// import * as Actions from 'app/store/actions';
import { AUTH_REST_BASE_END_POINT } from 'app/fuse-configs/envsConfig';
export const SET_CONSULTING_APPOINTMENT_LOADING = '[APPOINTMENT] SET CONSULTING APPOINTMENT LOADING';
export const SYNC_SELF_CONSULTING_APPOINTMENT = '[APPOINTMENT] SYNC SELF CONSULTING APPOINTMENT';
export const SYNC_CONSULTING_APPOINTMENT = '[APPOINTMENT] SYNC CONSULTING APPOINTMENT';

// export function syncAdminDashboardNewRegisteredUser() {
//   const request = axios.post(`${AUTH_REST_BASE_END_POINT}/api/statistics/newUserNumberPerMonth`);
//   return (dispatch) => {
//     dispatch({ type: SET_REGISTERED_USER_LOADING });
//     request.then((response) => {

//       dispatch({
//         type: SYNC_DASHBOARD_REGISTERED_USER,
//         payload: {
//           registeredUserData: response.data
//         },
//       })
//     })
//   }
// }
