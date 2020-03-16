import * as Actions from "app/store/actions";

const initialState = {};

const descriptor = function(state = initialState, action) {
  switch (action.type) {
    case Actions.LOAD_DESCRIPTOR_FROM_LOCALSTORAGE: {
      return {
        ...action.payload.descriptor
      };
    }

    default: {
      return state;
    }
  }
};

export default descriptor;
