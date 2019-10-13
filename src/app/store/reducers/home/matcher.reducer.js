import * as Actions from 'app/store/actions';

const initialState = {
  inited: false,
  matcher: null
};

const matcher = function(state = initialState, action) {
  switch (action.type) {
    case Actions.LOAD_MATCHER: {
      return {
        ...state,
        matcher: action.payload.matcher
      };
    }
    case Actions.MATCHER_INIT_FINISHED: {
      return {
        ...state,
        inited: true
      };
    }
    default: {
      return state;
    }
  }
};

export default matcher;
