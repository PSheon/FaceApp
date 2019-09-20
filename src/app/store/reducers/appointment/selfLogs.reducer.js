// import _ from 'lodash';

import * as Actions from 'app/store/actions/appointment';

const initialState = {
  loading: false,
  consulting: [],
  borrow: [],
  guide: [],
};

const selfLogs = function (state = initialState, action) {
  switch (action.type) {
    case Actions.SET_SELF_APPOINTMENT_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    case Actions.SYNC_SELF_CONSULTING_APPOINTMENT:
      {
        return {
          ...state,
          loading: false,
          consulting: action.payload.selfConsultingLogs,
        };
      }

    case Actions.SYNC_SELF_BORROW_APPOINTMENT:
      {
        return {
          ...state,
          loading: false,
          borrow: action.payload.selfBorrowLogs,
        };
      }
    case Actions.CANCEL_SELF_BORROW_APPOINTMENT_BY_ID:
      {
        const newBorrowAppointment = state.borrow.map(appointment => {
          if (appointment._id === action.payload.borrowId) {
            return {
              ...appointment,
              appointmentStatus: 'canceled',
            }
          } else {
            return appointment;
          }
        })

        return {
          ...state,
          loading: false,
          borrow: newBorrowAppointment,
        };
      }

    case Actions.SYNC_SELF_GUIDE_APPOINTMENT:
      {
        return {
          ...state,
          loading: false,
          guide: action.payload.selfGuideLogs,
        };
      }
    default:
      {
        return state;
      }
  }
};

export default selfLogs;
