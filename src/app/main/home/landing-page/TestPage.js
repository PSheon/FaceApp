import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as Actions from 'app/store/actions';

function TestPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.initCamera());
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <video autoPlay muted playsInline id="video"></video>
      <canvas id="canvas" width="640" height="640"></canvas>
    </div>
  );
}

export default TestPage;
