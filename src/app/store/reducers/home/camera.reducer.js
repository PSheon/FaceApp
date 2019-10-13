import * as Actions from 'app/store/actions';

const initialState = {
  ready: false,
  cameraError: false,
  stream: null,
  video: null,
  ctx: null,
  canvas: null
};

const camera = function(state = initialState, action) {
  switch (action.type) {
    case Actions.CAMERA_ERROR: {
      return {
        ...state,
        ready: false,
        cameraError: true
      };
    }
    case Actions.CAMERA_SUCCESS: {
      return {
        ...state,
        ready: true,
        cameraError: false
      };
    }
    case Actions.SET_CAMERA_STREAM: {
      const { video, ctx, stream, canvas } = action.payload;

      return {
        ...state,
        video,
        ctx,
        stream,
        canvas
      };
    }
    default: {
      return state;
    }
  }
};

export default camera;
