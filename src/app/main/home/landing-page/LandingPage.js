import React, { useState, useEffect, useRef, useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import Webcam from 'react-webcam';

import LoadingSpinner from 'app/main/shared/LoadingSpinner';
import { loadModels, getFullFaceDescription, createMatcher } from 'app/utils';
// Import face profile
/* TODO */
const JSON_PROFILE = require('../../../../descriptors/main.json');

const inputSize = 160;

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    /* eslint-disable-next-line */
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}
function TestPage() {
  const webcam = useRef(null);
  const size = useWindowSize();

  const WIDTH = size.width;
  const HEIGHT = size.height;
  // const [WIDTH, SET_WIDTH] = useState(0);
  // const [HEIGHT, SET_HEIGHT] = useState(0);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [shouldStartCapture, setShouldStartCapture] = useState(false);
  const [faceFound, setFaceFound] = useState(false);
  const [detections, set_detections] = useState(null);
  const [descriptors, set_descriptors] = useState(null);
  const [faceMatcher, set_faceMatcher] = useState(null);
  const [match, set_match] = useState(null);
  const [facingMode, set_facingMode] = useState(null);

  let videoConstraints = null;
  if (!!facingMode) {
    videoConstraints = {
      width: WIDTH,
      height: HEIGHT,
      facingMode: facingMode
    };
  }

  let drawBox = null;
  if (!!detections) {
    drawBox = detections.map((detection, i) => {
      let _H = detection.box.height;
      let _W = detection.box.width;
      let _X = detection.box._x;
      let _Y = detection.box._y;
      return (
        <div key={i} className="absolute top-0 left-0">
          {!!match && !!match[i] ? (
            <Typography
              variant="subtitle1"
              className="absolute text-center bg-green-300 mt-0 text-white"
              style={{
                border: 'solid',
                borderColor: 'green',
                width: _W,
                transform: `translate(${_X}px,${_Y - 30}px)`
              }}
            >
              {match[i]._label}
            </Typography>
          ) : null}
          <div
            className="absolute"
            style={{
              border: 'solid',
              borderColor: 'green',
              height: _H,
              width: _W,
              transform: `translate(${_X}px,${_Y}px)`
            }}
          />
        </div>
      );
    });
  }

  const capture = useCallback(async () => {
    if (!!webcam.current) {
      await getFullFaceDescription(
        webcam.current.getScreenshot(),
        inputSize
      ).then(fullDesc => {
        if (!!fullDesc) {
          setFaceFound(true);
          set_detections(fullDesc.map(fd => fd.detection));
          set_descriptors(fullDesc.map(fd => fd.descriptor));
        } else {
          setFaceFound(false);
        }
      });

      if (!!descriptors && !!faceMatcher) {
        let match = await descriptors.map(descriptor =>
          faceMatcher.findBestMatch(descriptor)
        );
        set_match(match);
      } else {
        setFaceFound(false);
      }
    }
  }, [descriptors, faceMatcher]);
  const setInputDevice = useCallback(() => {
    navigator.mediaDevices.enumerateDevices().then(async devices => {
      let inputDevice = await devices.filter(
        device => device.kind === 'videoinput'
      );
      if (inputDevice.length < 2) {
        await set_facingMode('user');
      } else {
        await set_facingMode({ exact: 'environment' });
      }
      setShouldStartCapture(true);
    });
  }, []);

  // useEffect(() => {
  //   SET_WIDTH(window.innerWidth);
  //   SET_HEIGHT(window.innerHeight);

  // }, []);
  useEffect(() => {
    async function initModel() {
      await loadModels();
      const matcher = await createMatcher(JSON_PROFILE);
      set_faceMatcher(matcher);
      setInputDevice();
      setIsModelLoading(false);
    }

    if (!facingMode) {
      initModel();
    }
  }, [facingMode, isModelLoading, setInputDevice]);

  useInterval(() => {
    // if (0 && shouldStartCapture) {
    if (shouldStartCapture) {
      capture();
    }
  }, 1000);
  return (
    <div
      className="Camera flex flex-col justify-center items-center"
      style={{
        width: WIDTH,
        height: HEIGHT
      }}
    >
      {isModelLoading && (
        <div className="w-full h-640 absolute flex flex-col justify-center items-center z-10">
          <Typography variant="h6" className="text-gray-600">
            載入模型中
          </Typography>
          <LoadingSpinner width="128" height="128" />
        </div>
      )}
      {!!videoConstraints && !faceFound ? (
        <div className="w-full h-640 absolute flex flex-col justify-center items-center z-10 bottom-0">
          <Typography variant="h6" className="text-white flex justify-center">
            <span>比對臉孔 </span>
            <LoadingSpinner width={32} height={32} />
          </Typography>
        </div>
      ) : null}
      {!!videoConstraints ? (
        <Webcam
          audio={false}
          width={WIDTH}
          height={HEIGHT}
          ref={webcam}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
      ) : null}
      {!!drawBox ? drawBox : null}
    </div>
  );
}

export default TestPage;
