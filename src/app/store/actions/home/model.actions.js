import * as faceapi from 'face-api.js';

const maxDescriptorDistance = 0.5;
export const LOAD_MODEL = '[MODEL] LOAD MODEL';
export const LOAD_MATCHER = '[MATCHER] LOAD MATCHER';
export const MODEL_INIT_FINISHED = '[MODEL] INITED';
export const MATCHER_INIT_FINISHED = '[MATCHER] INITED';

export const initFaceApiModels = () => async dispatch => {
  const MODEL_URL = process.env.PUBLIC_URL + '/models';

  await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
  dispatch({
    type: LOAD_MODEL,
    payload: {
      progress: 35
    }
  });

  await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);
  dispatch({
    type: LOAD_MODEL,
    payload: {
      progress: 70
    }
  });

  await faceapi.loadFaceRecognitionModel(MODEL_URL);
  dispatch({
    type: LOAD_MODEL,
    payload: {
      progress: 100
    }
  });
  dispatch({
    type: MODEL_INIT_FINISHED
  });
};

export const initFaceApiMatcher = faceProfile => async dispatch => {
  let members = Object.keys(faceProfile);
  let labeledDescriptors = members.map(
    member =>
      new faceapi.LabeledFaceDescriptors(
        faceProfile[member].name,
        faceProfile[member].descriptors.map(
          descriptor => new Float32Array(descriptor)
        )
      )
  );

  let faceMatcher = new faceapi.FaceMatcher(
    labeledDescriptors,
    maxDescriptorDistance
  );

  dispatch({
    type: LOAD_MATCHER,
    payload: {
      matcher: faceMatcher
    }
  });
};
