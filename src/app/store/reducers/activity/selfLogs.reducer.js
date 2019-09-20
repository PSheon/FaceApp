// import _ from 'lodash';

import * as Actions from 'app/store/actions/activity';

const initialState = {
  loading: false,
  /* User self activity logs ref by applicantId */
  docs: [],
};

const SelfLogs = function (state = initialState, action) {
  switch (action.type) {
    case Actions.SET_SELF_ACTIVITY_LOGS_LIST_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    case Actions.SYNC_SELF_ACTIVITY_LOGS_LIST:
      {
        return {
          ...state,
          loading: false,
          docs: action.payload,
        };
      }
    case Actions.UPDATE_SELF_ACTIVITY_REGISTRATION_STATUS:
      {
        return {
          ...state,
          loading: false,
          docs: {
            ...state.docs,
            registrationStatus: action.payload.registrationStatus
          }
        };
      }
    default:
      {
        return state;
      }
  }
};

export default SelfLogs;
