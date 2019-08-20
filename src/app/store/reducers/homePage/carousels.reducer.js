// import _ from 'lodash';

import * as Actions from 'app/store/actions/homePage';

const initialState = {
  docs: [],
  selectedItemId: ''
};

const carousels = function (state = initialState, action) {
  switch (action.type) {
    case Actions.SYNC_HOMEPAGE_CAROUSELS:
      {
        return {
          ...state,
          docs: [...action.payload]
        };
      }
    case Actions.APPEND_CAROUSEL_TO_HOMEPAGE_CAROUSELS:
      {
        return {
          ...state,
          docs: [
            ...state.docs,
            action.ayload
          ]
        };
      }
    default:
      {
        return state;
      }
  }
};

export default carousels;
