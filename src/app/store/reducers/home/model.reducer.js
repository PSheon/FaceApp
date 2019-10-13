import * as Actions from 'app/store/actions';

const initialState = {
  inited: false,
  progress: 0
};

const routes = function(state = initialState, action) {
  switch (action.type) {
    case Actions.LOAD_MODEL: {
      return {
        ...state,
        progress: action.payload.progress
      };
    }
    case Actions.MODEL_INIT_FINISHED: {
      return {
        ...state,
        inited: true,
        progress: 100
      };
    }
    default: {
      return state;
    }
  }
};

export default routes;
