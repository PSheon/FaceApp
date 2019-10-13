const { MediaStreamTrack } = window;
const { mediaDevices } = navigator;
const sourceEnumSupport = mediaDevices && mediaDevices.enumerateDevices;
const streamTrackSupport = MediaStreamTrack && MediaStreamTrack.getSources;
const sourceSupport = sourceEnumSupport || streamTrackSupport;

let attemptedTwice = false;

const getUserMedia = (() => {
  const fn =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;
  return fn ? fn.bind(navigator) : null;
})();

const findBestSource = sources => {
  let source = null;

  if (sourceSupport && sources && sources.length) {
    if (sourceEnumSupport) {
      for (let i = 0; i < sources.length; i++) {
        const candidate = sources[i];

        if (candidate.kind === 'videoinput') {
          if (typeof candidate.getCapabilities === 'function') {
            const capabilities = candidate.getCapabilities();

            if (capabilities && capabilities.facingMode === 'environment') {
              source = candidate;
              break;
            }
          }

          if (/facing back/i.test(candidate.label)) {
            source = candidate;
            break;
          }
        }
      }
    } else {
      source = sources.find(s => s.facing === 'environment');
      if (!source) {
        source = sources.find(s => s.kind === 'video');
      }
    }
  }

  return source;
};
const cameraSuccess = (stream, dispatch) => {
  const canvas = window.document.getElementById('canvas');
  const videoEl = window.document.getElementById('video');

  videoEl.srcObject = stream;

  dispatch({
    type: SET_CAMERA_STREAM,
    payload: {
      video: videoEl,
      ctx: canvas.getContext('2d'),
      stream,
      canvas
    }
  });
};
const activateCamera = (dispatch, noConstraint) => {
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: noConstraint || { facingMode: 'environment' }
    })
    .then(stream => cameraSuccess(stream, dispatch))
    .catch(err => {
      if (!noConstraint && err.name === 'ConstraintNotSatisfiedError') {
        return activateCamera(dispatch, true);
      }
      console.error(err);
      dispatch({ type: CAMERA_SUCCESS });
    });
};
const activateCameraLegacy = (sources, dispatch) => {
  const source = findBestSource(sources);

  getUserMedia(
    {
      audio: false,
      video: source
        ? {
            optional: [
              { sourceId: sourceEnumSupport ? source.deviceId : source.id }
            ]
          }
        : true
    },
    stream => {
      if (sourceEnumSupport && !source && !attemptedTwice) {
        attemptedTwice = true;
        setTimeout(() => {
          stream.getTracks().forEach(track => track.stop());
          enumerateDevices(dispatch);
        }, 1);
        return;
      }
      cameraSuccess(stream, dispatch);
    },
    err => {
      console.error(err);
      dispatch({ type: CAMERA_ERROR });
    }
  );
};

const enumerateDevices = dispatch =>
  mediaDevices
    .enumerateDevices()
    .then(sources => activateCameraLegacy(sources, dispatch))
    .catch(() => activateCameraLegacy(null, dispatch));

export const CAMERA_ERROR = '[CAMERA] ERROR';
export const CAMERA_SUCCESS = '[CAMERA] SUCCESS';
export const SET_CAMERA_STREAM = '[CAMERA] SET_STREAM';

export const initCamera = () => async (dispatch, getState) => {
  const CAMERA_STATUS = getState().home.camera;

  if (CAMERA_STATUS.ready) {
    return;
  }

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    return activateCamera(dispatch);
  }

  if (!getUserMedia) {
    return dispatch({ type: CAMERA_ERROR });
  }

  if (sourceEnumSupport) {
    enumerateDevices(dispatch);
  } else if (streamTrackSupport) {
    MediaStreamTrack.getSources(sources =>
      activateCameraLegacy(sources, dispatch)
    );
  } else {
    activateCameraLegacy(null, dispatch);
  }
};
