import React, { useState, useEffect, useRef, useCallback } from "react";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ActionsButton from "./ActionsButton";
// import Webcam from "react-webcam";
import Webcam from "app/utils/react-webcam.tsx";

import LoadingSpinner from "app/main/shared/LoadingSpinner";
import FaceLogo from "./FaceLogo";
import { loadModels, getFullFaceDescription, createMatcher } from "app/utils";
import Descriptor from "app/utils/descriptor";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  faceLogo: {
    position: "relative",
    width: "12.8rem",
    height: "12.8rem",
    marginBottom: "3.2rem",
    zIndex: 1
  },
  hintFrame: {
    position: "absolute",
    height: "80vh",
    width: "50vw",
    transform: `translate(25vw, 10vh)`,

    "& .topLeft": {
      width: "15%",
      height: "15%",
      position: "absolute",
      top: 0,
      left: 0,
      borderTopLeftRadius: "15%",
      borderTop: "15px solid #3182ce",
      borderLeft: "15px solid #3182ce"
    },
    "& .topRight": {
      width: "15%",
      height: "15%",
      position: "absolute",
      top: 0,
      right: 0,
      borderTopRightRadius: "15%",
      borderTop: "15px solid #3182ce",
      borderRight: "15px solid #3182ce"
    },
    "& .bottomLeft": {
      width: "15%",
      height: "15%",
      position: "absolute",
      bottom: 0,
      left: 0,
      borderBottomLeftRadius: "15%",
      borderBottom: "15px solid #3182ce",
      borderLeft: "15px solid #3182ce"
    },
    "& .bottomRight": {
      width: "15%",
      height: "15%",
      position: "absolute",
      bottom: 0,
      right: 0,
      borderBottomRightRadius: "15%",
      borderBottom: "15px solid #3182ce",
      borderRight: "15px solid #3182ce"
    }
  },
  faceFrame: {
    "& .topLeft": {
      width: "5%",
      height: "5%",
      position: "absolute",
      top: 0,
      left: 0,
      borderTopLeftRadius: "15%",
      borderTop: "10px solid #3182ce",
      borderLeft: "10px solid #3182ce"
    },
    "& .topRight": {
      width: "5%",
      height: "5%",
      position: "absolute",
      top: 0,
      right: 0,
      borderTopRightRadius: "15%",
      borderTop: "10px solid #3182ce",
      borderRight: "10px solid #3182ce"
    },
    "& .bottomLeft": {
      width: "5%",
      height: "5%",
      position: "absolute",
      bottom: 0,
      left: 0,
      borderBottomLeftRadius: "15%",
      borderBottom: "10px solid #3182ce",
      borderLeft: "10px solid #3182ce"
    },
    "& .bottomRight": {
      width: "5%",
      height: "5%",
      position: "absolute",
      bottom: 0,
      right: 0,
      borderBottomRightRadius: "15%",
      borderBottom: "10px solid #3182ce",
      borderRight: "10px solid #3182ce"
    }
  }
}));

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
  const isClient = typeof window === "object";

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

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    /* eslint-disable-next-line */
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}
function TestPage() {
  const webcam = useRef(null);
  const size = useWindowSize();
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width: 600px)");

  const WIDTH = size.width;
  const HEIGHT = size.height;

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
            <>
              <div
                className={classes.faceFrame}
                style={{
                  height: _H,
                  width: _W,
                  transform: `translate(${_X}px,${_Y}px)`
                }}
              >
                <div className="topLeft" />
                <div className="topRight" />
                <div className="bottomLeft" />
                <div className="bottomRight" />
              </div>

              {/* Name */}
              <div
                className="flex justify-center items-center relative w-128 absolute"
                style={{
                  transform: `translate(${_X - 0.3 * _W}px, ${_Y - _H}px)`
                }}
              >
                <Typography
                  variant="h3"
                  className="h1 text-center bg-blue-300 min-h-64 w-128 text-white leading-loose rounded-8"
                >
                  {match[i]._label}
                </Typography>
              </div>

              {/* Title */}
              <div
                className="flex justify-center items-center relative w-200 absolute"
                style={{
                  transform: `translate(${_X + _W}px, ${_Y - _H - 64}px)`
                }}
              >
                <Typography
                  variant="h3"
                  className="h1 text-center bg-blue-300 min-h-64 w-128 text-white leading-loose rounded-8"
                >
                  這邊可以顯示貴賓介紹(或圖片)
                </Typography>
              </div>
            </>
          ) : null}
        </div>
      );
    });
  }

  const getScreenShot = async () => {
    const screenShot = await webcam.current.getScreenshot();

    return screenShot;
  };

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
        device => device.kind === "videoinput"
      );
      if (inputDevice.length < 2) {
        await set_facingMode("user");
      } else {
        await set_facingMode({ exact: "environment" });
      }
      setShouldStartCapture(true);
    });
  }, []);

  useEffect(() => {
    async function initModel() {
      await loadModels();
      if (Descriptor.hasDescriptor()) {
        const JSON_PROFILE = Descriptor.getDescriptor();

        const matcher = await createMatcher(JSON_PROFILE);
        set_faceMatcher(matcher);
      } else {
        const JSON_PROFILE = Descriptor.getInitDescriptor();

        const matcher = await createMatcher(JSON_PROFILE);
        set_faceMatcher(matcher);
      }
      setInputDevice();
      setIsModelLoading(false);
    }

    if (!facingMode) {
      initModel();
    }
  }, [facingMode, isModelLoading, setInputDevice]);

  useInterval(async () => {
    if (shouldStartCapture) {
      // TODO
      // console.time("capture");
      await capture();
      // console.timeEnd("capture");
    }
  }, 500);

  if (!isDesktop) {
    return (
      <div className="flex flex-col justify-center items-center bg-blue-300 absolute h-full w-full">
        <img
          className="w-128 h-128 mb-32"
          src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjMzE4MmNlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwYXRoIGQ9Ik05Mi43LDY4LjhjLTEuMiwwLTIuMiwxLTIuMiwyLjJ2OS4yYzAsNS43LTQuNiwxMC4zLTEwLjMsMTAuM2gtMTBjLTEuMiwwLTIuMiwxLTIuMiwyLjJzMSwyLjIsMi4yLDIuMmgxMCAgIGM4LjEsMCwxNC43LTYuNiwxNC43LTE0LjdWNzFDOTQuOSw2OS44LDkzLjksNjguOCw5Mi43LDY4Ljh6Ij48L3BhdGg+PHBhdGggZD0iTTgwLjIsNS4xaC0xMGMtMS4yLDAtMi4yLDEtMi4yLDIuMnMxLDIuMiwyLjIsMi4yaDEwYzUuNywwLDEwLjMsNC42LDEwLjMsMTAuM3YxMC43YzAsMS4yLDEsMi4yLDIuMiwyLjJzMi4yLTEsMi4yLTIuMiAgIFYxOS44Qzk0LjksMTEuNyw4OC4zLDUuMSw4MC4yLDUuMXoiPjwvcGF0aD48cGF0aCBkPSJNNjguOSw0OC45YzEuNSwwLDIuNy0xLjIsMi44LTIuN1YzOWMwLTEuNi0xLjItMi44LTIuOC0yLjhjLTEuNiwwLTIuOCwxLjMtMi44LDIuOHY3LjFDNjYuMSw0Ny43LDY3LjQsNDguOSw2OC45LDQ4Ljl6Ij48L3BhdGg+PHBhdGggZD0iTTYzLjcsNjguM2MtMy42LDMuNi04LjQsNS42LTEzLjMsNS42aC0wLjhjLTUsMC05LjctMi0xMy4zLTUuNmMtMC44LTAuOS0yLjItMC45LTMuMSwwYy0wLjksMC44LTAuOSwyLjIsMCwzLjEgICBjNC41LDQuNSwxMC4zLDYuOSwxNi40LDYuOWgwLjhjNi4xLDAsMTItMi40LDE2LjQtNi45YzAuOS0wLjgsMC45LTIuMiwwLTMuMUM2Niw2Ny40LDY0LjYsNjcuNCw2My43LDY4LjN6Ij48L3BhdGg+PHBhdGggZD0iTTQ0LjUsNjIuMkg0NWM0LjUsMCw4LjEtMy42LDguMS04VjM5YzAtMS4yLTEtMi4yLTIuMi0yLjJzLTIuMiwxLTIuMiwyLjJ2MTUuMWMwLDIuMS0xLjcsMy43LTMuNywzLjdoLTAuNSAgIGMtMS4yLDAtMi4yLDEtMi4yLDIuMlM0My4zLDYyLjIsNDQuNSw2Mi4yeiI+PC9wYXRoPjxwYXRoIGQ9Ik0yOS43LDM2LjJjLTEuNiwwLTIuOCwxLjMtMi44LDIuOHY3LjFjMCwxLjYsMS4zLDIuOCwyLjgsMi44YzEuNiwwLDIuOC0xLjIsMi44LTIuN1YzOUMzMi41LDM3LjQsMzEuMiwzNi4yLDI5LjcsMzYuMnoiPjwvcGF0aD48cGF0aCBkPSJNNy4zLDMyLjdjMS4yLDAsMi4yLTEsMi4yLTIuMlYxOS44YzAtNS43LDQuNi0xMC4zLDEwLjMtMTAuM2gxMGMxLjIsMCwyLjItMSwyLjItMi4ycy0xLTIuMi0yLjItMi4yaC0xMCAgIGMtOC4xLDAtMTQuNyw2LjYtMTQuNywxNC43djEwLjdDNS4xLDMxLjcsNi4xLDMyLjcsNy4zLDMyLjd6Ij48L3BhdGg+PHBhdGggZD0iTTI5LjcsOTAuNWgtMTBjLTUuNywwLTEwLjMtNC42LTEwLjMtMTAuM1Y3MWMwLTEuMi0xLTIuMi0yLjItMi4yUzUsNjkuOCw1LDcxdjkuMmMwLDguMSw2LjYsMTQuNywxNC43LDE0LjdoMTAgICBjMS4zLDAsMi4yLTEsMi4yLTIuMlMzMC45LDkwLjUsMjkuNyw5MC41eiI+PC9wYXRoPjwvZz48L3N2Zz4="
          alt="face logo"
        />
        <Typography variant="h6" className="h3 text-white text-center">
          此 APP 不支援您的裝置，請使用個人電腦再次開啟
        </Typography>
      </div>
    );
  }
  return (
    <>
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
          <div className="w-full h-full absolute flex flex-col justify-center items-center z-10 bottom-0">
            <FaceLogo className={classes.faceLogo} />
            <Typography variant="h6" className="text-white flex justify-center">
              <span>尋找貴賓 </span>
              <LoadingSpinner width={32} height={32} />
            </Typography>
          </div>
        ) : null}
        {!!videoConstraints ? (
          <Webcam
            mirrored
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
      <div className={classes.hintFrame}>
        <div className="topLeft" />
        <div className="topRight" />
        <div className="bottomLeft" />
        <div className="bottomRight" />
      </div>

      {!!videoConstraints && !faceFound ? null : (
        <ActionsButton getScreenShot={getScreenShot} />
      )}
    </>
  );
}

export default TestPage;
