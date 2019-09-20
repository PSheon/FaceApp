// import _ from 'lodash';

import * as Actions from 'app/store/actions/appointment';

const initialState = {
  loading: false,
  docs: [],
};

const consulting = function (state = initialState, action) {
  switch (action.type) {
    case Actions.SET_CONSULTING_APPOINTMENT_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    case Actions.SYNC_CONSULTING_APPOINTMENT:
      {
        return {
          ...state,
          loading: false,
          docs: [
            ...state.docs,

          ],
        };
      }
    default:
      {
        return state;
      }
  }
};

export default consulting;
