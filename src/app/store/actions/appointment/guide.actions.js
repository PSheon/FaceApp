import axios from 'axios';

// import * as Actions from 'app/store/actions';
import { AUTH_REST_BASE_END_POINT } from 'app/fuse-configs/envsConfig';
export const SET_GUIDE_APPOINTMENT_LOADING = '[APPOINTMENT] SET GUIDE APPOINTMENT LOADING';
export const SYNC_SELF_GUIDE_APPOINTMENT = '[APPOINTMENT] SYNC SELF GUIDE APPOINTMENT';
export const SYNC_GUIDE_APPOINTMENT = '[APPOINTMENT] SYNC GUIDE APPOINTMENT';

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